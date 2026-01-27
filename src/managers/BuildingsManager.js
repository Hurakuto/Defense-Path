import { Mage } from "../models/Buildings/Mage.js";
import { Summoner } from "../models/Buildings/Summoner.js";

export class BuildingsManager {
    #buildings

    constructor() {
        this.#buildings = []
    }

    get buildings() {
        return this.#buildings
    }

    add(enemies, pos, type = "mage", waypoints = []) {
        let building;
        switch (type) {
            case "summoner":
                building = new Summoner(enemies, pos, waypoints);
                break;
            case "mage":
            default:
                building = new Mage(enemies, pos);
                break;
        }

        this.#buildings.push(building);
        this.#buildings.sort((a, b) => {
            return a.position.y - b.position.y
        })
    }

    remove(id) {
        this.#buildings = this.#buildings.filter((building) => building.id !== id);
    }
}