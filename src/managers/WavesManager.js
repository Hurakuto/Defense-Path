import { Wave } from "../models/Wave.js";
import * as wavesData from "../data/MapsWaves.js"

export class WavesManager {
    #waves
    #mapId
    #wavesData

    constructor(mapId) {
        this.#waves = []
        this.#mapId = mapId
        this.#wavesData = wavesData.mapsWaves
    }

    get waves() {
        return this.#waves
    }

    add(waypoints) {
        for (const wave of this.#wavesData[this.#mapId]) {
            this.#waves.push(new Wave(wave, waypoints));
        }
    }

    remove(id) {
        this.#waves = this.#waves.filter((wave) => wave.id !== id);
    }
}