import { EnemiesManager } from "../managers/EnemiesManager.js"
import { MapWaypoints } from "../models/MapWaypoints.js"
import { MapsView } from "../views/MapsView.js"

export class MapsController {
    #manager
    #view
    #mapId;
    #mapWaypoints

    #currency

    constructor(mapId) {
        this.#manager = new EnemiesManager()
        this.#view = new MapsView("canvas", mapId, () => this.update())
        this.#mapWaypoints = new MapWaypoints(mapId - 1);

        // this.#currency
    }

    addEnemy({ position = { x: 0, y: 0 } } = {}) {
        this.#manager.add(this.#mapWaypoints.waypoints, {});
    }

    allEnemies() {
        return this.#manager.enemies;
    }

    init() {
        this.#view.renderMap()
        this.addEnemy()
    }

    update() {
        for (const enemy of this.allEnemies()) {
            enemy.update();
            if (enemy.center.x === enemy.waypoints[enemy.waypoints.length - 1].x && enemy.center.y === enemy.waypoints[enemy.waypoints.length - 1].y) {
                this.#manager.remove(enemy.id)
            }
        }
    }
}