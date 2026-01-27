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

    constructor(containerSelector, mapId, onUpdate, onAddBuilding) {
        const container = document.querySelector(containerSelector);

        if (!container) {
            throw new Error(`Container ${containerSelector} not found`);
        }

        // Clear container
        container.textContent = "";

        // Create game UI structure using DOM methods
        const h1 = document.createElement("h1");
        h1.textContent = "Defense Path";

        const h2 = document.createElement("h2");
        h2.id = "coins";
        h2.textContent = `Coins : ${this.#coins} 🪙`;

        const gameDiv = document.createElement("div");
        gameDiv.id = "game";

        const canvas = document.createElement("canvas");
        canvas.width = 1280;
        canvas.height = 768;

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

        const archerTower = document.createElement("div");
        archerTower.classList.add("tower-select");
        archerTower.dataset.type = "other";
        archerTower.textContent = "Archer";

        sidebar.append(mageTower, summonerTower, archerTower);
        gameDiv.append(canvas, sidebar);
        container.append(h1, h2, gameDiv);

        this.#canva = canvas;
        this.#ctx = this.#canva.getContext("2d");
        this.#mapId = mapId;
        this.#onUpdate = onUpdate;
        this.#onAddBuilding = onAddBuilding;

        this.#placementTilesData = getMapsPlacementTilesData(this.#canva, mapId - 1);

        this.#img = new Image();

        this.#canva.width = 16 * 32;
        this.#canva.height = 16 * 32;

        this.#mouse = { x: undefined, y: undefined };

        this.#activeTile = undefined;

        this.#coins = 100;

        this.#setupEventListeners();

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
        document.body.append(debugMouseView);

        window.addEventListener("mousemove", (event) => {
            const canvaBounds = this.#canva.getBoundingClientRect();
            this.#mouse.x = event.clientX;
            this.#mouse.y = event.clientY;
            debugMouseView.innerHTML = `<p>X: ${this.#mouse.x} | Y: ${this.#mouse.y}<br>(X: ${this.#mouse.x - canvaBounds.left} | Y: ${this.#mouse.y - canvaBounds.top})</p>`;

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
                    break;
                }
            }
        });

        this.#canva.addEventListener("click", (event) => {
            if (
                this.#activeTile &&
                !this.#activeTile.occupied &&
                typeof this.#onAddBuilding === "function" &&
                this.#coins >= 50
            ) {
                this.#coins -= 50;
                // document.getElementById("coins").textContent = this.#coins;
                this.#onAddBuilding(this.#activeTile.position);
                this.#activeTile.occupied = true;
                console.log("Tour placée");
            }
        });
    }

    renderMap() {
        this.#img.onload = () => {
            this.animate();
        };

        this.#img.src = this.chosenMap();
        this.#img.onerror = () => {
            console.log("❌ Image introuvable");
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

        document.getElementById("coins").textContent = `Coins : ${this.#coins} 🪙`

        this.#onUpdate();
    }

    chosenMap() {
        if (this.#mapId === 1) {
            return "src/assets/maps/map1.png";
        } else if (this.#mapId === 2) {
            return "src/assets/maps/map2.png";
        } else if (this.#mapId === 3) {
            return "src/assets/maps/map3.png";
        } else if (this.#mapId === 4) {
            return "src/assets/maps/map4.png";
        } else {
            throw new Error("Map inconnu");
        }
    }

    get animationId() {
        return this.#animationId;
    }

    get coins() {
        return this.#coins
    }

    set coins(c) {
        this.#coins = c
    }
}
