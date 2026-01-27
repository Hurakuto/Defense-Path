import { Sprite } from "./Sprite.js";

export class Projectile extends Sprite {
    #id;
    #velocity;
    #radius;
    #speed;
    #ctx;
    #enemy;
    #image;

    constructor(enemy, pos = { x: 0, y: 0 }, sprite, speed = 1, offset = { x: -8, y: -20 }) {
        super(pos, sprite, { max: 5, }, 16, offset);

        this.#id = crypto.randomUUID();

        this.#velocity = {
            x: 0,
            y: 0,
        };

        this.#radius = 2.5;

        this.#speed = speed;

        this.#enemy = enemy;

        const canva = document.querySelector("canvas");
        this.#ctx = canva.getContext("2d");
    }

    get id() {
        return this.#id;
    }

    get radius() {
        return this.#radius;
    }

    set enemy(e) {
        this.#enemy = e;
    }

    get enemy() {
        return this.#enemy;
    }

    // draw() {

    //      this.#ctx.beginPath();
    //      this.#ctx.arc(
    //      this.position.x,
    //      this.position.y,
    //      this.#radius,
    //      0,
    //      Math.PI * 2,
    //      );
    //      this.#ctx.fillStyle = "orange";
    //      this.#ctx.fill();
    // }

    isAtDestination(destination = {}, tolerance = 8) {
        const isXValid =
            this.position.x - tolerance / 2 <= destination.x &&
            this.position.x + tolerance / 2 >= destination.x;

        const isYValid =
            this.position.y - tolerance / 2 <= destination.y &&
            this.position.y + tolerance / 2 >= destination.y;

        return isXValid && isYValid;
    }

    update() {
        this.draw();

        const enemy = this.#enemy;

        if (!enemy) return;

        const angle = Math.atan2(
            enemy.center.y - this.position.y,
            enemy.center.x - this.position.x,
        );

        this.#velocity.x = Math.cos(angle) * this.#speed;
        this.#velocity.y = Math.sin(angle) * this.#speed;

        this.position.x += this.#velocity.x;
        this.position.y += this.#velocity.y;
    }
}
