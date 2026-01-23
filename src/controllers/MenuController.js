import { MenuView } from "../views/MenuView.js";
import { MenuManager } from "../managers/MenuManager.js"

export class MenuController {
    #manager;
    #view;

    constructor() {
        this.#manager = new MenuManager();
        this.#view = new MenuView("#app");

        this.#init();
    }

    #init(){
        // this.#view.createStartMenu();
    }
}
