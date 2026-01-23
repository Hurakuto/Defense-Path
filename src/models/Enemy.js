import { MapWaypoints } from "./MapWaypoints";

export class Enemy{
    #id;
    #position;
    #ctx;
    #waypointIndex;
    #width;
    #height;
    #center;
    #speed;
    #waypoints

    constructor(waypoints, { position = { x: -100, y: 541 } } = {}) {
        // super({position})

        this.#id = crypto.randomUUID();
        this.#position = position;
        this.#waypointIndex = 0;
        this.#speed = 1.5;

        this.#width = 50;
        this.#height = 50;

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
        const image = new Image()
        image.src = "src/assets/sprites/enemies/pouleto.png";
        this.#ctx.fillRect(
            this.#position.x,
            this.#position.y,
            this.#width,
            this.#height,
        );
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
        console.log(this.#center.x, this.#center.y)

        if (
            Math.round(this.#center.x) === Math.round(waypoint.x) &&
            Math.round(this.#center.y) === Math.round(waypoint.y) &&
            this.#waypointIndex < this.#waypoints.length - 1
        ) {
            this.#waypointIndex++;
        }
    }

    get id() {
        return this.#id;
    }

    set position(pos){
        this.#position = pos
    }

    get position(){
        return this.#position;
    }

    set center(c){
        this.#center = c
    }

    get center(){
        return this.#center
    }

    set waypointIndex(i){
        this.#waypointIndex = i
    }

    get waypointIndex(){
        return this.#waypointIndex
    }

    get waypoints(){
        return this.#waypoints
    }
}
