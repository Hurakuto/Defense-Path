import { Enemy } from "../Enemy.js"
import redPouletoSprite from "../../assets/sprites/enemies/pouleto-red.png"

export class Speedy extends Enemy {
    constructor(waypoints, position = {}){
        super(redPouletoSprite, waypoints, position);
        this.speed = 1;
        this.health = 75
        this.maxHealth = 75
        this.color = "orange";
    }
}