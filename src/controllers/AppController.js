import { MapsController } from "./MapsController.js";
import { MenuController } from "./MenuController.js";

export class AppController {
    #mapsController;
    #menuController;

    constructor() {
        this.#menuController = new MenuController(this.#startGame.bind(this)); //this du appController

        this.init();
    }

    init() {
        this.#menuController.init();
    }

    #startGame(mapId) {
        if (!localStorage.getItem("wins")) {
            localStorage.setItem("wins", new String(0));
        }

        if (!localStorage.getItem("loses")) {
            localStorage.setItem("loses", new String(0));
        }

        if (!localStorage.getItem("kills")) {
            localStorage.setItem("kills", new String(0));
        }

        if (!localStorage.getItem("winRate")) {
            localStorage.setItem("winRate", "Aucune donnée");
        } else {
            String(localStorage.setItem(
                "winRate",
                new String(
                    (Number(localStorage.getItem("wins")) /
                        (Number(localStorage.getItem("wins")) +
                            Number(localStorage.getItem("loses")))) *
                        100,
                ),
            )
            );
        }

        this.#menuController.remove();
        this.#mapsController = new MapsController(
            mapId,
            this.endgame.bind(this),
        );
    }

    endgame() {
        const end = document.getElementById("end")

        setTimeout(() => {
            end.remove();
            this.init();
        }, 3000);
    }
}
