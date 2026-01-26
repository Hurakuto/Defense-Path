export class MenuView {
    #containerElement;
    #startButton;
    #currentMenu;
    #imgMapOne
    #imgMapTwo
    #imgMapThree
    #playButton
    #mapId
    #playButtonCallback
    #warning


    constructor(containerElement) {
        this.#containerElement = document.querySelector(containerElement);

        if (!this.#containerElement) {
            throw new Error("Element de conteneur non trouvé");
        }

        this.#currentMenu = "startMenu";

        this.#startButton = document.createElement("span");
        this.#imgMapOne = document.createElement("img");
        this.#imgMapTwo = document.createElement("img");
        this.#imgMapThree = document.createElement("img");
        this.#playButton = document.createElement('button')
        this.#warning = document.createElement('p');

        this.#mapId = undefined;

        this.#setupEventListeners();
        this.render();
    }

    get currentMenu(){
        return this.#currentMenu;
    }

    onPlayButtonClick(callback) {
        this.#playButtonCallback = callback;
    }

    clear() {
        this.#containerElement.innerHTML = "";
    }

    #setupEventListeners() {

        this.#playButton.addEventListener("click", () => {
            if (typeof this.#playButtonCallback === "function") {
                if(this.#mapId===undefined){
                    this.#warning.setAttribute("display", "block")
                }
                else {
                    this.#playButtonCallback(this.#mapId);
                }
            }
        })

        this.#startButton.addEventListener("click", () => {
            this.#startButton.textContent = "loading [|||||-------]";
            setTimeout(() => {
                this.#currentMenu = "mainMenu";
                this.render();
            }, 2000);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                this.#startButton.textContent = "loading [|||||-------]";
                setTimeout(() => {
                    this.#currentMenu = "mainMenu";
                    this.render();
                }, 2000);
            }
        });

        this.#imgMapOne.addEventListener("click", () => {
            this.#imgMapTwo.classList.remove("selected");
            this.#imgMapThree.classList.remove("selected");
            this.#imgMapOne.classList.toggle("selected");
            this.#mapId = 1;
        })
        this.#imgMapTwo.addEventListener("click", () => {
            this.#imgMapOne.classList.remove("selected");
            this.#imgMapThree.classList.remove("selected");
            this.#imgMapTwo.classList.toggle("selected");
            this.#mapId = 2;
        })
        this.#imgMapThree.addEventListener("click", () => {
            this.#imgMapOne.classList.remove("selected");
            this.#imgMapTwo.classList.remove("selected");
            this.#imgMapThree.classList.toggle("selected");
            this.#mapId = 3;
        })
    }

    render() {
        this.#containerElement.textContent = "";

        switch (this.#currentMenu) {
            case "startMenu":
                this.createStartMenu();
                break;

            case "mainMenu":
                this.createMapsMenu();
                break;
        }
    }

    createStartMenu() {
        const h1 = document.createElement("h1");
        h1.textContent = "Defense Path 🛤️🛣️";
        h1.classList.add("no-select");

        const h2 = document.createElement("h2");
        h2.textContent =
            'Clique gauche sur "start", appuyer sur Entrer ou Espace';
        h2.classList.add("no-select");

        this.#startButton.textContent = "[START]";
        this.#startButton.classList.add("no-select");

        this.#containerElement.append(h1, h2, this.#startButton);
    }

    createMapsMenu() {
        const titleSelectMap = document.createElement("h2");
        
        this.#warning.textContent = "Veuillez bien selectionner une map avant !";
        this.#warning.setAttribute("display", "none");

        const label1 = document.createElement('label');
        label1.classList.add("labels");
        label1.textContent = "Land";
        const label2 = document.createElement('label');
        label2.classList.add("labels");
        label2.textContent = "Desert";
        const label3 = document.createElement('label');
        label3.classList.add("labels");
        label3.textContent = "River";

        titleSelectMap.classList.add("titleMaps");
        titleSelectMap.textContent = "Veuillez selectionnez une map";
        const presentationMap = document.createElement("div");
        presentationMap.classList.add("mapselector");
        this.#imgMapOne.setAttribute("src", "src/assets/maps/map1.png");
        this.#imgMapOne.setAttribute("alt", "Map 1");
        this.#imgMapOne.classList.add("mapOne", "maps");
        this.#imgMapTwo.setAttribute("src", "src/assets/maps/map2.png");
        this.#imgMapTwo.setAttribute("alt", "Map 2");
        this.#imgMapTwo.classList.add("mapTwo", "maps");
        this.#imgMapThree.setAttribute("src", "src/assets/maps/map3.png");
        this.#imgMapThree.setAttribute("alt", "Map 3");
        this.#imgMapThree.classList.add("mapThree", "maps");

        const divMapOne = document.createElement('div');
        const divMapTwo = document.createElement('div');
        const divMapThree = document.createElement('div');

        this.#playButton.textContent = "JOUER";
        this.#playButton.classList.add('play-button');

        divMapOne.append(this.#imgMapOne, label1);
        divMapTwo.append(this.#imgMapTwo, label2);
        divMapThree.append(this.#imgMapThree, label3);

        presentationMap.append(divMapOne, divMapTwo, divMapThree);
        this.#containerElement.append(titleSelectMap, presentationMap, this.#playButton, this.#warning);
    }

    EndMenu() {
        const titleEnd = document.createElement("h2");
        titleEnd.textContent = "Fin De Partie";

        const divMapOne = document.createElement('div');
        const divMapTwo = document.createElement('div');
        const divMapThree = document.createElement('div');

        this.#playButton.textContent = "JOUER";
        this.#playButton.classList.add('play-button');

        // divMapOne.append(this.#imgMapOne, label1);
        // divMapTwo.append(this.#imgMapTwo, label2);
        // divMapThree.append(this.#imgMapThree, label3);

        // presentationMap.append(divMapOne, divMapTwo, divMapThree);
        // this.#containerElement.append(titleSelectMap, presentationMap, this.#playButton);
    }
}
