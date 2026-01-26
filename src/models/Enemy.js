import { MapWaypoints } from "./MapWaypoints";
import pouletoSprite from "../assets/sprites/enemies/pouleto.png";

export class Enemy {
    #id;
    #position;
    #ctx;
    #waypointIndex;
    #width;
    #height;
    #center;
    #speed;
    #waypoints;

    constructor(waypoints, position = {}) {
        // super({position})

        this.#id = crypto.randomUUID();
        this.#position = {
            x: 0,
            y: 0,
            ...position,
        };
        this.#waypointIndex = 0;
        this.#speed = 1.5;

        this.#width = 16;
        this.#height = 16;

        this.#center = {
            x: this.#position.x + this.#width / 2,
            y: this.#position.y + this.#height / 2,
        };

        const canva = document.querySelector("canvas");

        this.#ctx = canva.getContext("2d");
        this.#waypoints = waypoints;

        console.log(`Enemy ${this.#id} initiated with waypoints:`, waypoints);
    }

    draw() {
        const image = new Image();
        image.src = pouletoSprite;

        // this.#ctx.fillStyle = "red"
        // this.#ctx.fillRect(
        //     this.#position.x,
        //     this.#position.y,
        //     this.#width,
        //     this.#height,
        // );

        this.#ctx.drawImage(image, this.#position.x, this.#position.y);
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
        this.#position.x += Math.cos(angle) * this.#speed;
        this.#position.y += Math.sin(angle) * this.#speed;
        this.#center = {
            x: Math.round(this.#position.x) + this.#width / 2,
            y: Math.round(this.#position.y) + this.#height / 2,
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

    set position(pos) {
        this.#position = pos;
    }

    get position() {
        return this.#position;
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
}
