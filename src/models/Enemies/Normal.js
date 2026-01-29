import { Enemy } from "../Enemy.js"
import pouletoSprite from "../../assets/sprites/enemies/pouleto.webp"

export class Normal extends Enemy {
    constructor(waypoints, position = {}){
        super(pouletoSprite, waypoints, position);
    }
}