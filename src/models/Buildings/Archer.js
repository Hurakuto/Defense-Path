import { Building } from "../Building.js";
import archerSprite from "../../assets/sprites/towers/archer.webp"
import { Arrow } from "../Projectiles/Arrow.js"

export class Archer extends Building{
    #ctx

    constructor(enemies, position){
        super(enemies, position, archerSprite, Arrow, { x: -0.5, y: -3 }, 40)
        
        const canva = document.querySelector("canvas");
        this.#ctx = canva.getContext("2d");
        this.radius = 112
    }

    draw() {
        super.draw()

        // ? Hitbox
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = `rgba(0,0,255,${this.a})`; // Range debug
        this.#ctx.arc(
            this.center.x,
            this.center.y,
            this.radius,
            0,
            Math.PI * 2,
        );
        this.#ctx.stroke();
    }
}