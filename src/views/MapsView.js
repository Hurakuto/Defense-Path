export class MapsView {
    #canva;
    #ctx;
    #mapId;
    #img;
    #onUpdate;
    #onAddBuilding
    #placementTilesData;
    #mouse;
    #activeTile;

    constructor(canvas, mapId, onUpdate, onAddBuilding, placementTilesData) {
        this.#canva = document.querySelector(canvas);
        this.#ctx = this.#canva.getContext("2d");
        this.#mapId = mapId;
        this.#onUpdate = onUpdate;
        this.#onAddBuilding = onAddBuilding;
        this.#placementTilesData = placementTilesData;

        this.#img = new Image();

        this.#canva.width = 16 * 32;
        this.#canva.height = 16 * 32;

        this.#mouse = { x: undefined, y: undefined };

        this.#activeTile = undefined;

        this.#setupEventListeners();
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
            // console.log(canvaBounds)
            this.#mouse.x = event.clientX;
            this.#mouse.y = event.clientY;
            // console.log(this.#mouse);
            debugMouseView.innerHTML = `<p>X: ${this.#mouse.x} | Y: ${this.#mouse.y}<br>(X: ${this.#mouse.x - canvaBounds.left} | Y: ${this.#mouse.y - canvaBounds.top})</p>`;

            this.#activeTile = null
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
            console.log(this.#activeTile)
        });

        this.#canva.addEventListener("click", (event) => {
            if(this.#activeTile && typeof this.#onAddBuilding === "function"){
                this.#onAddBuilding(this.#activeTile.position);
            }
        })
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
        requestAnimationFrame(this.animate.bind(this));
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

        this.#onUpdate();
    }

    chosenMap() {
        if (this.#mapId === 1) {
            return "src/assets/maps/map1.png";
        } else if (this.#mapId === 2) {
            return "src/assets/maps/map2.png";
        } else if (this.#mapId === 3) {
            return "src/assets/maps/map3.png";
        } else {
            throw new Error("Map inconnu");
        }
    }
}
