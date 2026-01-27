import { Building } from "../Building.js";
import mageSprite from "../../assets/sprites/towers/mage.png"
import { Fireball } from "../Projectiles/Fireball.js"

export class Mage extends Building {
    #ctx

    constructor(enemies, position) {
        super(enemies, position, mageSprite, Fireball, { x: 0.5, y: -3 })

        const canva = document.querySelector("canvas");
        this.#ctx = canva.getContext("2d");
    }

    draw() {
        super.draw()

        // ? Hitbox
        this.#ctx.beginPath();
        this.#ctx.fillStyle = "rgba(0,0,255,0.2)"; // Range debug
        this.#ctx.arc(
            this.center.x,
            this.center.y,
            this.radius,
            0,
            Math.PI * 2,
        );
        this.#ctx.fill();
    }
}