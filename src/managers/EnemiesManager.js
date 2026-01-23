import { EventEmitter } from "../utils/EventEmitter.js";
import { Enemy } from "../models/Enemy.js";
export class EnemiesManager extends EventEmitter {
    #enemies;

    constructor(){
        super();
        this.#enemies = [];
    }

    get enemies(){
        return this.#enemies
    }

    add(waypoints, pos){
        this.#enemies.push(new Enemy(waypoints, pos));
    }

    remove(id){
        this.#enemies = this.#enemies.filter((enemy) => enemy.id !== id);
    }
}