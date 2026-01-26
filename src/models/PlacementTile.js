import * as Data from "../data/MapsPlacementTiles.js";

class PlacementTile {
    #position;
    #canva
    #ctx;
    #size;
    #color;
    #color2;

    constructor(canvas, size = {}, position = {}) {
        this.#position = {
            x: position.x ?? 0,
            y: position.y ?? 0,
        };
        this.#size = {
            width: size.width ?? 0,
            height: size.height ?? 0,
        };

        this.#canva = document.querySelector(canvas);
        this.#ctx = this.#canva.getContext("2d");

        this.#color = "rgba(255, 255, 255, 1)";
        this.#color2 = "rgba(255, 255, 255, 0.15)";
    }

    draw() {
        // this.#ctx.fillStyle = this.#color
        // this.#ctx.fillRect(
        //     this.#position.x,
        //     this.#position.y,
        //     this.#size.width,
        //     this.#size.height,
        // );
        this.#ctx.fillStyle = this.#color2;
        this.#ctx.fillRect(
            this.#position.x,
            this.#position.y,
            this.#size.width * 0.9,
            this.#size.height * 0.9,
        );
    }

    update(mouse) {
        this.draw();

        if (
            mouse.x - this.#canva.getBoundingClientRect().left > this.#position.x &&
            mouse.x - this.#canva.getBoundingClientRect().left < this.#position.x + this.#size.width &&
            mouse.y - this.#canva.getBoundingClientRect().top > this.#position.y &&
            mouse.y - this.#canva.getBoundingClientRect().top < this.#position.y + this.#size.height
        ) {
            // console.log("colliding")
            this.#color2 = "white"
        } else {
            this.#color2 = "rgba(255, 255, 255, 0.15)"
        }
    }

    get position(){
        return this.#position
    }

    get size(){
        return this.#size
    }
}

const map1PlacementTiles = [];
Data.map1PlacementTilesData.forEach((row, y) => {
    row.forEach((tile, x) => {
        if (tile === 14) {
            // add building placement tile here
            map1PlacementTiles.push(
                new PlacementTile(
                    "canvas",
                    {
                        width: 16,
                        height: 16,
                    },
                    {
                        x: x * 16,
                        y: y * 16,
                    },
                ),
            );
        }
    });
});

const map2PlacementTiles = [];
Data.map2PlacementTilesData.forEach((row, y) => {
    row.forEach((tile, x) => {
        if (tile === 14) {
            // add building placement tile here
            map2PlacementTiles.push(
                new PlacementTile(
                    "canvas",
                    {
                        width: 16,
                        height: 16,
                    },
                    {
                        x: x * 16,
                        y: y * 16,
                    },
                ),
            );
        }
    });
});

const map3PlacementTiles = [];
Data.map3PlacementTilesData.forEach((row, y) => {
    row.forEach((tile, x) => {
        if (tile === 14) {
            // add building placement tile here
            map3PlacementTiles.push(
                new PlacementTile(
                    "canvas",
                    {
                        width: 16,
                        height: 16,
                    },
                    {
                        x: x * 16,
                        y: y * 16,
                    },
                ),
            );
        }
    });
});

export const mapsPlacementTilesData = [
    map1PlacementTiles,
    map2PlacementTiles,
    map3PlacementTiles,
];