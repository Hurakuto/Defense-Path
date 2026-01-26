import { MapsController } from "./MapsController.js";
import { MenuController } from "./MenuController.js";

export class AppController {
    #mapsController;
    #menuController;

    constructor(){
        this.#menuController = new MenuController(this.#startGame.bind(this)); //this du appController

        this.init();
    }

    init(){
        this.#menuController.init()
    }

    #startGame(mapId) {
        // console.log({mapId});

        this.#menuController.remove();
        this.#mapsController = new MapsController(mapId);
    }
}