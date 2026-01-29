export class MenuView {
    #containerElement;
    #startButton;
    #currentMenu;
    #imgMapOne
    #imgMapTwo
    #imgMapThree
    #imgMapFour
    #playButton
    #mapId
    #playButtonCallback
    #warning
    #buttonEntrer
    #titleLogin
    #pseudop
    #isAtStartMenu


    constructor(containerElement) {
        this.#containerElement = document.querySelector(containerElement);

        this.#isAtStartMenu = true

        if (!this.#containerElement) {
            throw new Error("Element de conteneur non trouvé");
        }

        this.#currentMenu = "startMenu";

        this.#startButton = document.createElement("span");
        this.#imgMapOne = document.createElement("img");
        this.#imgMapTwo = document.createElement("img");
        this.#imgMapThree = document.createElement("img");
        this.#imgMapFour = document.createElement("img");
        this.#playButton = document.createElement('button')
        this.#warning = document.createElement('p');
        this.#pseudop = document.createElement('p');
        this.#buttonEntrer = document.createElement('button');
        this.#titleLogin = document.createElement("input");

        this.#mapId = undefined;
    }

    init(){
        this.#setupEventListeners()
        this.render()
    }

    get currentMenu() {
        return this.#currentMenu;
    }

    onPlayButtonClick(callback) {
        this.#playButtonCallback = callback;
    }

    clear() {
        this.#containerElement.innerHTML = "";
    }

    #setupEventListeners() {

        this.#buttonEntrer.addEventListener("click", () => {
            if(this.#titleLogin.value.trim().length>0){
                localStorage.setItem("username", this.#titleLogin.value.trim())
                this.init()
            }
            else{
                this.#pseudop.textContent = "Le nom d'utilisateur ne peut pas être vide !"
            }
        })

        this.#playButton.addEventListener("click", () => {
            if (typeof this.#playButtonCallback === "function") {
                if (this.#mapId === undefined) {
                    this.#warning.setAttribute("display", "block")
                }
                else {
                    this.#playButtonCallback(this.#mapId);
                }
            }
        })

        this.#startButton.addEventListener("click", () => {
            this.#isAtStartMenu = false
            this.#startButton.textContent = "loading [|||||-------]";
            setTimeout(() => {
                this.#currentMenu = "mainMenu";
                this.render();
            }, 2000);
        });

        document.addEventListener("keydown", (event) => {
            if ((event.key === "Enter" || event.key === " ") && this.#isAtStartMenu) {
                this.#isAtStartMenu = false
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
            this.#imgMapFour.classList.remove("selected");
            this.#imgMapOne.classList.toggle("selected");
            this.#mapId = 1;
        })
        this.#imgMapTwo.addEventListener("click", () => {
            this.#imgMapOne.classList.remove("selected");
            this.#imgMapThree.classList.remove("selected");
            this.#imgMapFour.classList.remove("selected");
            this.#imgMapTwo.classList.toggle("selected");
            this.#mapId = 2;
        })
        this.#imgMapThree.addEventListener("click", () => {
            this.#imgMapOne.classList.remove("selected");
            this.#imgMapTwo.classList.remove("selected");
            this.#imgMapFour.classList.remove("selected");
            this.#imgMapThree.classList.toggle("selected");
            this.#mapId = 3;
        })
        this.#imgMapFour.addEventListener("click", () => {
            this.#imgMapOne.classList.remove("selected");
            this.#imgMapTwo.classList.remove("selected");
            this.#imgMapThree.classList.remove("selected");
            this.#imgMapFour.classList.toggle("selected");
            this.#mapId = 4;
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

        const pseudo = document.createElement("h3");
        pseudo.textContent = localStorage.getItem('username');
        pseudo.classList.add("pseudo");

        const divPseudo = document.createElement('div');
        divPseudo.classList.add('div-pseudo');

        const divStats = document.createElement('div');
        divStats.classList.add('div-stats');

        const party = document.createElement("span");
        if(Number(localStorage.getItem('wins'))+Number(localStorage.getItem('loses')) === 0 && typeof (Number(localStorage.getItem('wins'))+Number(localStorage.getItem('loses'))) === "number"){
            party.textContent = "Win Rate : Aucune donnée";
        } else if(typeof Number(localStorage.getItem('wins'))==="number" && Number(localStorage.getItem('wins'))===0){
            "Win Rate : 0%"
        } else {
            if(typeof Number(localStorage.getItem('loses')) !== "number"){
                localStorage.setItem('loses', String(0))
            }
            if(typeof Number(localStorage.getItem('wins')) !== "number"){
                localStorage.setItem('wins', String(0))
            }
            localStorage.setItem("winRate", Math.round(Number(localStorage.getItem("wins"))/(Number(localStorage.getItem('wins'))+Number(localStorage.getItem('loses')))*100))
            party.textContent = "Win Rate : " + Math.round(localStorage.getItem('winRate')) + "%";
        }
        const win = document.createElement('span');
        win.textContent = "Wins : " + new Number(localStorage.getItem('wins'));
        const lose = document.createElement('span');
        lose.textContent = "Loses : " + new Number(localStorage.getItem('loses'));
        const kills = document.createElement('span');
        if(!(typeof Number(localStorage.getItem("kills"))==="number")){
            localStorage.setItem("kills", String(0))
        }
        kills.textContent = "Kills : " + new Number(localStorage.getItem('kills'))

        party.classList.add("stats");
        win.classList.add("stats");
        lose.classList.add("stats");
        kills.classList.add("stats");

        const h1 = document.createElement("h1");
        h1.textContent = "Les Poulets Contre-Attaquent 🐥🐤🐣🥚";

        const h2 = document.createElement("h2");
        h2.textContent = 'Clique gauche sur "start", appuyer sur Entrer ou Espace';

        this.#startButton.textContent = "[START]";
        this.#startButton.classList.add("play");

        divPseudo.appendChild(pseudo);
        divStats.append(win, lose, party, kills);

        this.#containerElement.append(divPseudo, divStats, h1, h2, this.#startButton);
    }

    createMapsMenu() {
        const titleSelectMap = document.createElement("h2");

        this.#warning.textContent = "Veuillez selectionner une map !";
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
        const label4 = document.createElement('label');
        label4.classList.add("labels");
        label4.textContent = "Castle";

        titleSelectMap.classList.add("titleMaps");
        titleSelectMap.textContent = "Veuillez selectionnez une map";
        const presentationMap = document.createElement("div");
        presentationMap.classList.add("mapselector");
        this.#imgMapOne.setAttribute("src", "src/assets/maps/map1.webp");
        this.#imgMapOne.setAttribute("alt", "Map 1");
        this.#imgMapOne.classList.add("mapOne", "maps");
        this.#imgMapTwo.setAttribute("src", "src/assets/maps/map2.webp");
        this.#imgMapTwo.setAttribute("alt", "Map 2");
        this.#imgMapTwo.classList.add("mapTwo", "maps");
        this.#imgMapThree.setAttribute("src", "src/assets/maps/map3.webp");
        this.#imgMapThree.setAttribute("alt", "Map 3");
        this.#imgMapThree.classList.add("mapThree", "maps");
        this.#imgMapFour.setAttribute("src", "src/assets/maps/map4.webp");
        this.#imgMapFour.setAttribute("alt", "Map 4");
        this.#imgMapFour.classList.add("mapFour", "maps");

        const divMapOne = document.createElement('div');
        const divMapTwo = document.createElement('div');
        const divMapThree = document.createElement('div');
        const divMapFour = document.createElement('div');

        this.#playButton.textContent = "JOUER";
        this.#playButton.classList.add('play-button', 'play');

        divMapOne.append(this.#imgMapOne, label1);
        divMapTwo.append(this.#imgMapTwo, label2);
        divMapThree.append(this.#imgMapThree, label3);
        divMapFour.append(this.#imgMapFour, label4);

        presentationMap.append(divMapOne, divMapTwo, divMapThree, divMapFour);
        this.#containerElement.append(titleSelectMap, presentationMap, this.#playButton, this.#warning);
    }

    
    Login() {
        this.#setupEventListeners()
        this.#containerElement.textContent = "";
        this.#titleLogin.placeholder = "Entrez votre pseudo";
        this.#titleLogin.classList.add("entry");


        this.#buttonEntrer.textContent = "Entrer";
        this.#buttonEntrer.setAttribute('type', 'submit');
        this.#buttonEntrer.classList.add('entrer');
        this.#containerElement.append(this.#titleLogin, this.#buttonEntrer, this.#pseudop);
    }
}
