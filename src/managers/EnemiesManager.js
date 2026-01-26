import { Enemy } from "../models/Enemy.js";
export class EnemiesManager {
    #enemies;

    constructor(){
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