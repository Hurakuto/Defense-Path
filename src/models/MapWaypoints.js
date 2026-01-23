export class MapWaypoints {
    #mapId;
    #waypoints;

    constructor(id) {
        this.#mapId = id;
        this.#waypoints = 
        [
            [
                {
                    x: -32,
                    y: 541,
                },
                {
                    x: 544,
                    y: -33,
                },
            ],
            []
        ];
    }

    get waypoints() {
        return this.#waypoints[this.#mapId]
    }

    set waypoints(waypoints) {
        this.#waypoints = waypoints;
    }
}

const waypointsMap1 = new MapWaypoints(1);
