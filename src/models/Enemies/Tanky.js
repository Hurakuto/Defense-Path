import { Enemy } from "../Enemy.js"

export class Tanky extends Enemy {
    constructor(waypoints, position = {}){
        super(waypoints, position);
        this.health = 250;
        this.maxHealth = this.health
        this.color = "black";
        this.speed = 0.3
    }
}