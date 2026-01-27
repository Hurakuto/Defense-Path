import * as Data from "../data/MapsPlacementTiles.js";

class PlacementTile {
    #position;
    #canva;
    #ctx;
    #size;
    #color;
    #color2;
    #occupied;

    constructor(canvas, size = {}, position = {}) {
        this.#position = {
            x: position.x ?? 0,
            y: position.y ?? 0,
        };
        this.#size = {
            width: size.width ?? 0,
            height: size.height ?? 0,
        };

        this.#canva = canvas;
        this.#ctx = this.#canva.getContext("2d");

        this.#color = "rgba(255, 255, 255, 1)";
        this.#color2 = "rgba(255, 255, 255, 0.15)";

        this.#occupied = false;
    }

    set occupied(bool) {
        this.#occupied = bool;
    }

    get occupied() {
        return this.#occupied;
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
            mouse.x - this.#canva.getBoundingClientRect().left >
            this.#position.x &&
            mouse.x - this.#canva.getBoundingClientRect().left <
            this.#position.x + this.#size.width &&
            mouse.y - this.#canva.getBoundingClientRect().top >
            this.#position.y &&
            mouse.y - this.#canva.getBoundingClientRect().top <
            this.#position.y + this.#size.height
        ) {
            // console.log("colliding")
            this.#color2 = "white";
        } else {
            this.#color2 = "rgba(255, 255, 255, 0.15)";
        }
    }

    get position() {
        return this.#position;
    }

    get size() {
        return this.#size;
    }
}


function createPlacementTiles(canvas, mapData) {
    const tiles = [];
    mapData.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === 14) {
                tiles.push(
                    new PlacementTile(
                        canvas,
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
    return tiles;
}

export function getMapsPlacementTilesData(canvas, mapId) {
    const mapDataArray = [
        Data.map1PlacementTilesData,
        Data.map2PlacementTilesData,
        Data.map3PlacementTilesData,
        Data.map4PlacementTilesData,
    ];

    return createPlacementTiles(canvas, mapDataArray[mapId]);
}

