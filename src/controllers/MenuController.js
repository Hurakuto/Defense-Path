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
        this.getLocalStorage();
        this.#view.onPlayButtonClick(this.#handlePlay);
    }

    remove() {
        this.#view.clear();
    }

    getLocalStorage(){
        if(!localStorage.getItem("username")){
            this.#view.Login()
        }
        else{
            this.#view.init()
        }
    }
}
