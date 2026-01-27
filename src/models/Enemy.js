import pouletoSprite from "../assets/sprites/enemies/pouleto.png";
import { Sprite } from "./Sprite";

export class Enemy extends Sprite {
    #id;
    #ctx;
    #waypointIndex;
    #width;
    #height;
    #center;
    speed;
    color;
    #radius;
    #waypoints;
    health;

    constructor(waypoints, position = {}, offset = { x: 0, y: 0 }) {
        super(position, pouletoSprite, { max: 4 }, 16, offset)

        this.#id = crypto.randomUUID();
        this.position = {
            x: (position.x ?? 0) - 8,
            y: (position.y ?? 0) - 8,
        };
        this.#waypointIndex = 0;
        this.speed = 0.5;

        this.#width = 16;
        this.#height = 16;

        this.#radius = 8;
        this.color = "red";

        this.#center = {
            x: this.position.x + this.#width / 2,
            y: this.position.y + this.#height / 2,
        };

        const canva = document.querySelector("canvas");

        this.#ctx = canva.getContext("2d");
        this.#waypoints = waypoints;

        this.health = 100;
        this.maxHealth = 100

        console.log(`Enemy ${this.#id} initiated with waypoints:`, waypoints);
    }

    draw() {
        super.draw()

        this.#ctx.fillStyle = "rgba(0,0,255,0.5)" // ? Hitbox
        this.#ctx.beginPath();
        this.#ctx.arc(
            this.#center.x,
            this.#center.y,
            this.#radius,
            0,
            Math.PI * 2,
        );
        this.#ctx.fill();

        // ? Health Bar
        this.#ctx.fillStyle = "red";
        this.#ctx.fillRect(
            this.position.x,
            this.position.y - 8,
            this.#width,
            this.#height / 4,
        );
        this.#ctx.fillStyle = "green";
        this.#ctx.fillRect(
            this.position.x - 2,
            this.position.y - 8 - 0.25,
            ((this.health / this.maxHealth)) * (this.#width + 4),
            this.#height / 4 + 0.5,
        );
    }

    isAtDestination(destination = {}, tolerance = 8) {
        const isXValid =
            this.#center.x - tolerance / 2 <= destination.x &&
            this.#center.x + tolerance / 2 >= destination.x;

        const isYValid =
            this.#center.y - tolerance / 2 <= destination.y &&
            this.#center.y + tolerance / 2 >= destination.y;

        return isXValid && isYValid;
    }

    update() {
        this.draw();

        const waypoint = this.#waypoints[this.#waypointIndex];
        const yDistance = waypoint.y - this.#center.y;
        const xDistance = waypoint.x - this.#center.x;
        const angle = Math.atan2(yDistance, xDistance);
        this.position.x += Math.cos(angle) * this.speed;
        this.position.y += Math.sin(angle) * this.speed;
        this.#center = {
            x: Math.round(this.position.x) + this.#width / 2,
            y: Math.round(this.position.y) + this.#height / 2,
        };
        // console.log(this.#center)

        if (
            // Math.round(this.#center.x) === Math.round(waypoint.x) &&
            // Math.round(this.#center.y) === Math.round(waypoint.y) &&
            this.isAtDestination({ x: waypoint.x, y: waypoint.y }) &&
            this.#waypointIndex < this.#waypoints.length - 1
        ) {
            this.#waypointIndex++;
        }
    }

    get id() {
        return this.#id;
    }

    set center(c) {
        this.#center = c;
    }

    get center() {
        return this.#center;
    }

    set waypointIndex(i) {
        this.#waypointIndex = i;
    }

    get waypointIndex() {
        return this.#waypointIndex;
    }

    get waypoints() {
        return this.#waypoints;
    }

    get radius() {
        return this.#radius;
    }

    set health(h) {
        this.health = h;
    }

    get health() {
        return this.health;
    }
}
