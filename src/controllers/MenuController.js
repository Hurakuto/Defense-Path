import { MenuView } from "../views/MenuView.js";

export class MenuController {
    #manager;
    #view;
    #handlePlay;

    constructor(handlePlay) {
        this.#view = new MenuView("#app");
        this.#handlePlay = handlePlay;
    }

    init(){
        this.#view.render();
        this.#view.onPlayButtonClick(this.#handlePlay);
    }

    remove() {
        this.#view.clear();
    }
}
