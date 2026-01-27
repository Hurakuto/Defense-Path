import { Projectile } from "../models/Projectile";
export class ProjectilesManager {
    #projectiles

    constructor() {
        this.#projectiles = []
    }

    get projectiles() {
        return this.#projectiles
    }

    remove(building, projectileId) {
        this.#projectiles = this.#projectiles.filter((projectile) => projectile.id !== projectileId);

        building.projectiles = building.projectiles.filter((projectile) => projectile.id !== projectileId)
    }
}