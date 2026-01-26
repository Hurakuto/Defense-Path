import { Building } from "../models/Building";
export class BuildingsManager {
    #buildings

    constructor(){
        this.#buildings = []
    }

    get buildings(){
            return this.#buildings
    }

    add(pos){
        this.#buildings.push(new Building(pos));
    }

    remove(id){
        this.#buildings = this.#buildings.filter((building) => building.id !== id);
    }
}