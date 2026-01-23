export class MenuView {
    #containerElement;
    #startButton;
    #currentMenu;

    constructor(containerElement){
        this.#containerElement = document.querySelector(containerElement);

        if(!this.#containerElement){
            throw new Error("Element de conteneur non trouvé");
        }

        this.#currentMenu = "startMenu"
        
        this.#startButton = document.createElement("span");

        this.#setupEventListeners();
        this.render();
    }

    #setupEventListeners(){
        this.#startButton.addEventListener("click", () => {
            this.#startButton.textContent = "loading [|||||-------]";
            setTimeout(() => {
                this.#currentMenu = "mainMenu"
                this.render();
            }, 2000);
        })

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' '){
                this.#startButton.textContent = "loading [|||||-------]";
                setTimeout(() => {
                    this.#currentMenu = "mainMenu"
                    this.render();
                }, 2000);
            }
        })
    }

    render(){
        this.#containerElement.textContent = "";

        switch(this.#currentMenu)
        {   case "startMenu" :
                this.createStartMenu();
                break;

            case "mainMenu" :
                this.createMapsMenu();
                break;
        }
    }

    createStartMenu(){
        const h1 = document.createElement("h1");
        h1.textContent = "Defense Path 🛤️🛣️";
        h1.classList.add('no-select');

        const h2 = document.createElement("h2");
        h2.textContent = 'Clique gauche sur "start", appuyer sur Entrer ou Espace';
        h2.classList.add('no-select');


        this.#startButton.textContent = "[START]";
        this.#startButton.classList.add('no-select');

        this.#containerElement.append(h1, h2, this.#startButton);
    }

    createMapsMenu(){
        const app = document.getElementById('app');
        const presentationMap = document.createElement('div');
        const imgMapOne = document.createElement('img');
        imgMapOne.setAttribute("src", "./../assets/map1.png");
        imgMapOne.setAttribute("alt", "Map 1");
        
        presentationMap.append(imgMapOne);
        app.appendChild(presentationMap);
    }
}