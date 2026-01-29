import { Enemy } from "../Enemy.js";
import lavaPouletoSprite from "../../assets/sprites/enemies/pouleto-lava.webp";

export class Lava extends Enemy {
    constructor(waypoints, position = {}) {
        super(lavaPouletoSprite, waypoints, position);

        this.health = 1000
        this.maxHealth = 1000
        this.speed = 0.4
    }
}
