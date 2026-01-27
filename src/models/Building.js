
import { Sprite } from "./Sprite.js";

export class Building extends Sprite {
    #id;
    #ctx;
    center;
    width;
    height;
    radius;
    #projectiles;
    #enemies;
    #target;
    #frames;
    #ProjectileClass;

    constructor(enemies, position = {}, sprite, ProjectileClass, offset = { x: 0, y: 0 }) {
        super(position, sprite, { max: 1 }, 16, offset)
        this.#id = crypto.randomUUID();

        const canva = document.querySelector("canvas");
        this.#ctx = canva.getContext("2d");

        this.#enemies = enemies;

        this.position = position;
        this.width = 16;
        this.height = 16;

        this.radius = 128;
        this.#target;
        this.#ProjectileClass = ProjectileClass;

        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };

        this.#projectiles = [];

        this.#frames = 0;
    }

    get center() {
        return this.center;
    }

    get projectiles() {
        return this.#projectiles;
    }

    set projectiles(p) {
        this.#projectiles = p;
    }

    get radius() {
        return this.radius;
    }

    set target(t) {
        this.#target = t;
    }

    get target() {
        return this.#target;
    }

    draw() {
        super.draw()
    }

    update() {
        this.draw();

        if (this.#frames % 100 === 0 && this.#target) {
            this.projectiles.push(
                new this.#ProjectileClass(this.#target, {
                    x: this.center.x,
                    y: this.center.y,
                }),
            );
        }
        this.#frames++;
    }
}
