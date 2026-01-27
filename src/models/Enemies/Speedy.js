import { Enemy } from "../Enemy.js"

export class Speedy extends Enemy {
    constructor(waypoints, position = {}){
        super(waypoints, position);
        this.speed = 1;
        this.color = "orange";
    }
}