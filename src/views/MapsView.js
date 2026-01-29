import { getMapsPlacementTilesData } from "../models/PlacementTile.js";

export class MapsView {
    #canva;
    #ctx;
    #mapId;
    #img;
    #onUpdate;
    #onAddBuilding;
    #placementTilesData;
    #mouse;
    #activeTile;
    #animationId;
    #coins;
    #health;

    constructor(containerSelector, mapId, onUpdate, onAddBuilding) {
        const container = document.querySelector(containerSelector);

        if (!container) {
            throw new Error(`Element de conteneur non trouvé`);
        }

        const canvas = document.createElement("canvas");

        this.#canva = canvas;
        this.#ctx = this.#canva.getContext("2d");
        this.#mapId = mapId;
        this.#onUpdate = onUpdate;
        this.#onAddBuilding = onAddBuilding;

        this.#placementTilesData = getMapsPlacementTilesData(
            this.#canva,
            mapId - 1,
        );

        this.#img = new Image();

        this.#canva.width = 16 * 32;
        this.#canva.height = 16 * 32;

        this.#mouse = { x: undefined, y: undefined };

        this.#activeTile = undefined;

        this.#coins = 150;

        this.#setupEventListeners();

        this.gameMenu(container);

        // this.#debugMode();
    }

    #debugMode() {
        for (const tile of this.#placementTilesData) {
            this.#onAddBuilding(tile.position);
            tile.occupied = true;
        }
    }

    get mouse() {
        return this.#mouse;
    }

    #setupEventListeners() {
        const debugMouseView = document.createElement("div");
        debugMouseView.style =
            "position: fixed; z-index: 999; right: 1rem; bottom: 1rem;";
        // document.body.append(debugMouseView);

        window.addEventListener("mousemove", (event) => {
            const canvaBounds = this.#canva.getBoundingClientRect();
            this.#mouse.x = event.clientX;
            this.#mouse.y = event.clientY;
            // debugMouseView.innerHTML = `<p>X: ${this.#mouse.x} | Y: ${this.#mouse.y}<br>(X: ${this.#mouse.x - canvaBounds.left} | Y: ${this.#mouse.y - canvaBounds.top})</p>`;

            this.#activeTile = null;
            for (let i = 0; i < this.#placementTilesData.length; i++) {
                const tile = this.#placementTilesData[i];
                if (
                    this.#mouse.x - this.#canva.getBoundingClientRect().left >
                    tile.position.x &&
                    this.#mouse.x - this.#canva.getBoundingClientRect().left <
                    tile.position.x + tile.size.width &&
                    this.#mouse.y - this.#canva.getBoundingClientRect().top >
                    tile.position.y &&
                    this.#mouse.y - this.#canva.getBoundingClientRect().top <
                    tile.position.y + tile.size.height
                ) {
                    this.#activeTile = tile;

                    // TODO: Add the range of a tower if something is here
                    break;
                }
            }
        });

        this.#canva.addEventListener("click", (event) => {
            if (
                this.#activeTile &&
                !this.#activeTile.occupied &&
                typeof this.#onAddBuilding === "function" &&
                this.#coins >= 100
            ) {
                this.#coins -= 100;
                // document.getElementById("coins").textContent = this.#coins;
                this.#onAddBuilding(this.#activeTile.position);
                this.#activeTile.occupied = true;
                // console.log("Tour placée");
            }
        });
    }

    gameMenu(container) {
        // Clear container
        container.textContent = "";

        // Create game UI
        const h1 = document.createElement("h1");
        h1.textContent = "Les Poulets Contre-Attaquent 🐥🐤🐣🥚";

        const h2 = document.createElement("h2");
        h2.id = "coins";
        h2.textContent = `Coins : ${this.#coins} 🪙`;

        const h2Health = document.createElement("h2");
        h2Health.id = "health";
        // console.log(this, this.#health)
        h2Health.textContent = `Health : ${this.#health}`;

        const gameDiv = document.createElement("div");
        gameDiv.id = "game";

        this.#canva.width = 16*32;
        this.#canva.height = 16*32;

        const sidebar = document.createElement("div");
        sidebar.classList.add("sidebar");

        const mageTower = document.createElement("div");
        mageTower.classList.add("tower-select", "selected-tower");
        mageTower.dataset.type = "mage";
        mageTower.textContent = "Mage";

        const summonerTower = document.createElement("div");
        summonerTower.classList.add("tower-select");
        summonerTower.dataset.type = "summoner";
        summonerTower.textContent = "Summoner";

        const prices = document.createElement("div")
        prices.textContent = "100 Coins each"

        const archerTower = document.createElement("div");
        archerTower.classList.add("tower-select");
        archerTower.dataset.type = "archer";
        archerTower.textContent = "Archer";

        const divStat = document.createElement('div');
        divStat.classList.add('div-stat-game');
        divStat.append(h2Health, h2);

        sidebar.append(prices, mageTower, summonerTower, archerTower);
        gameDiv.append(this.#canva, sidebar);
        container.append(h1, divStat, gameDiv);

        this.renderMap()
    }

    renderMap() {
        this.#img.onload = () => {
            this.animate();
        };

        this.#img.src = this.chosenMap();
        this.#img.onerror = () => {
            throw new Error("❌ Image introuvable");
        };
    }

    animate() {
        this.#animationId = requestAnimationFrame(this.animate.bind(this));
        this.#ctx.clearRect(
            0,
            0,
            this.#ctx.canvas.width,
            this.#ctx.canvas.height,
        );
        this.#ctx.drawImage(this.#img, 0, 0);

        this.#placementTilesData.forEach((tile) => {
            tile.update(this.mouse);
        });

        const coinsElement = document.getElementById("coins");
        if (coinsElement) {
            coinsElement.textContent = `Coins : ${this.#coins} 🪙`;
        }

        const healthElement = document.getElementById("health")
        if(healthElement){
            healthElement.textContent = `Health : ${this.health}` 
        }

        this.#onUpdate();
    }

    chosenMap() {
        if (this.#mapId === 1) {
            return "src/assets/maps/map1.webp";
        } else if (this.#mapId === 2) {
            return "src/assets/maps/map2.webp";
        } else if (this.#mapId === 3) {
            return "src/assets/maps/map3.webp";
        } else if (this.#mapId === 4) {
            return "src/assets/maps/map4.webp";
        } else {
            throw new Error("Map inconnu");
        }
    }

    EndWin() {
        const app = document.querySelector('#app')
        app.textContent = "";

        const body = document.querySelector('body');

        const titleEnd = document.createElement("h2");
        titleEnd.setAttribute("id", "end")
        titleEnd.textContent = "Victoire";
        titleEnd.classList.add('end');
        body.appendChild(titleEnd);
    }
    EndDefeat() {
        const app = document.querySelector('#app')
        app.textContent = "";

        const body = document.querySelector('body');

        const titleEnd = document.createElement("h2");
        titleEnd.setAttribute("id", "end")
        titleEnd.classList.add('end');
        titleEnd.textContent = "Défaite";
        body.appendChild(titleEnd);
    }

    get animationId() {
        return this.#animationId;
    }

    get coins() {
        return this.#coins;
    }

    set coins(c) {
        this.#coins = c;
    }

    get health() {
        return this.#health;
    }

    set health(c) {
        this.#health = c;
    }
}
