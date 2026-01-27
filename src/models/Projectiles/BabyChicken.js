import { Sprite } from "../Sprite.js";
import babyChickenSprite from "../../assets/sprites/projectiles/Baby_Chicken.png";

export class BabyChicken extends Sprite {
    #waypoints;
    #currentWaypointIndex;
    #speed;
    #health;
    #velocity;
    #id;

    constructor(waypoints, offset = { x: 0, y: 0 }) {
        const startPos = { ...waypoints[waypoints.length - 1] };
        super(startPos, babyChickenSprite, { max: 4 }, 16, offset);

        this.#waypoints = [...waypoints];
        this.#currentWaypointIndex = this.#waypoints.length - 2;
        this.#speed = 0.2
        this.#health = 50;
        this.#velocity = { x: 0, y: 0 };
        this.#id = crypto.randomUUID();
        this.radius = 10;

        const canva = document.querySelector("canvas");
        this.ctx = canva.getContext("2d");
    }

    get id() {
        return this.#id;
    }

    get health() {
        return this.#health;
    }

    set health(h) {
        this.#health = h;
    }

    update() {
        super.draw();

        // ? Hitbox
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        this.ctx.fill();
        this.ctx.closePath();

        if (this.#currentWaypointIndex < 0) {
            this.#health = 0;
            return;
        }

        const target = this.#waypoints[this.#currentWaypointIndex];
        const angle = Math.atan2(target.y - this.position.y, target.x - this.position.x);

        this.#velocity.x = Math.cos(angle) * this.#speed;
        this.#velocity.y = Math.sin(angle) * this.#speed;

        this.position.x += this.#velocity.x;
        this.position.y += this.#velocity.y;

        if (
            Math.abs(this.position.x - target.x) < 5 &&
            Math.abs(this.position.y - target.y) < 5
        ) {
            this.#currentWaypointIndex--;
        }
    }
}
