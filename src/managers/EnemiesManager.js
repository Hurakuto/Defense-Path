import { Speedy } from "../models/Enemies/Speedy.js";
import { Tanky } from "../models/Enemies/Tanky.js";
import { Enemy } from "../models/Enemy.js";
export class EnemiesManager {
    #enemies;

    constructor(){
        this.#enemies = [];
    }

    get enemies(){
        return this.#enemies
    }

    #getEnemyClass(type) {
        switch (type) {
            case "speedy":
                return Speedy;

            case "tanky":
                return Tanky;

            case "normal":
            default:
                return Enemy;
        }
    }

    add(waypoints, pos, type = "normal"){
        const EnemyClass = this.#getEnemyClass(type);
        this.#enemies.push(new EnemyClass(waypoints, pos));
    }

    remove(id){
        this.#enemies = this.#enemies.filter((enemy) => enemy.id !== id);
    }
}