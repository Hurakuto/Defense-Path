import { EnemiesManager } from "../managers/EnemiesManager.js";
import { MenuView } from "../views/MenuView.js";

export class MenuController {
    #manager;
    #view;

    constructor() {
        this.#view = new MenuView("#app");

        this.#init();
    }

    #init(){
        this.#view.render();
    }
}
