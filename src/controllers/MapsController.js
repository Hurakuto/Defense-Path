import { EnemiesManager } from "../managers/EnemiesManager.js";
import { MapWaypoints } from "../models/MapWaypoints.js";
import { MapsView } from "../views/MapsView.js";
import { mapsPlacementTilesData } from "../models/PlacementTile.js";
import { BuildingsManager } from "../managers/BuildingsManager.js";

export class MapsController {
    #Emanager;
    #Bmanager
    #view;
    #mapWaypoints;

    #currency;

    constructor(mapId) {
        this.#Emanager = new EnemiesManager();
        this.#Bmanager = new BuildingsManager()
        this.#view = new MapsView(
            "canvas",
            mapId,
            this.update.bind(this),
            this.addBuilding.bind(this),
            mapsPlacementTilesData[mapId - 1],
        );
        this.#mapWaypoints = new MapWaypoints(mapId - 1);

        // this.#currency

        this.#init();
    }

    addEnemy(position = {}) {
        this.#Emanager.add(this.#mapWaypoints.waypoints, position);
    }

    allEnemies() {
        return this.#Emanager.enemies;
    }

    addBuilding(position = {}) {
        this.#Bmanager.add(position);
    }

    allBuildings() {
        return this.#Bmanager.buildings;
    }

    #init() {
        this.#view.renderMap();

        for (let i = 100; i < 10 * 100; i += 50) {
            this.addEnemy({
                x: this.#mapWaypoints.waypoints[0].x - i,
                y: this.#mapWaypoints.waypoints[0].y,
            });
        }
    }

    update() {
        for (const enemy of this.allEnemies()) {
            enemy.update();
            if (
                enemy.center.x ===
                    enemy.waypoints[enemy.waypoints.length - 1].x &&
                enemy.center.y === enemy.waypoints[enemy.waypoints.length - 1].y
            ) {
                this.#Emanager.remove(enemy.id);
            }
        }
    }
}
