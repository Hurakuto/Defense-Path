import { Building } from "../Building.js";
import summonerSprite from "../../assets/sprites/towers/summoner.png"
import { BabyChicken } from "../Projectiles/BabyChicken.js";

export class Summoner extends Building {
    #ctx
    #waypoints
    #frames = 0

    constructor(enemies, position, waypoints) {
        super(enemies, position, summonerSprite, BabyChicken, { x: 0.5, y: -3 }) // Same offset as Mage for now
        this.#waypoints = waypoints;

        const canva = document.querySelector("canvas");
        this.#ctx = canva.getContext("2d");
    }

    update() {
        this.draw();

        // ? Hitbox
        this.#ctx.beginPath();
        this.#ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        this.#ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
        this.#ctx.fill();
        this.#ctx.closePath();

        if (this.#frames % 200 === 0 && this.#waypoints && this.projectiles.length < 3) {
            this.projectiles.push(
                new BabyChicken(this.#waypoints)
            );
        }
        this.#frames++;

        this.projectiles.forEach((chicken, i) => {
            chicken.update();
            if (chicken.health <= 0) {
                this.projectiles.splice(i, 1);
            }
        });
    }
}
