export class Building {
    #id;
    #ctx;
    #position;
    #width
    #height

    constructor(position = {}) {
        const canva = document.querySelector("canvas");
        this.#ctx = canva.getContext("2d");

        this.#position = position
        this.#width = 16
        this.#height = 16
    }

    draw() {
        this.#ctx.fillStyle = "blue";
        this.#ctx.fillRect(this.#position.x, this.#position.y, this.#width, this.#height);
    }
}
