import { Enemy } from "../Enemy.js"
import tankPouletoSprite from "../../assets/sprites/enemies/pouleto-iron.png"

export class Tanky extends Enemy {
    constructor(waypoints, position = {}){
        super(tankPouletoSprite, waypoints, position);
        this.health = 250;
        this.maxHealth = 250
        this.color = "black";
        this.speed = 0.3
    }
}