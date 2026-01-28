import { Speedy } from "../models/Enemies/Speedy.js";
import { Tanky } from "../models/Enemies/Tanky.js";
import { Normal } from "../models/Enemies/Normal.js";
import { Lava } from "../models/Enemies/Lava.js";
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
            
            case "lava":
                console.log('Lava spawned')
                return Lava;

            case "normal":
            default:
                return Normal;
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