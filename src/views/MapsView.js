export class MapsView {
    #ctx
    #mapId
    #img
    #onUpdate

    constructor(canvas, mapId, onUpdate) {
        const canva = document.querySelector(canvas)
        this.#ctx = canva.getContext("2d");
        this.#mapId = mapId
        this.#onUpdate = onUpdate

        this.#img = new Image()

        canva.width = 20 * 32;
        canva.height = 20 * 32;
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
        this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
        this.#ctx.drawImage(this.#img, 0, 0);

        this.#onUpdate();
    }

    chosenMap() {
        if (this.#mapId === 1) {
            return "src/assets/maps/map1.png"
        } else if (this.#mapId === 2) {
            return "src/assets/maps/map2.png"
        } else if (this.#mapId === 3) {
            return "src/assets/maps/map3.png"
        } else {
            throw new Error("Map inconnu");
        }
    }
}