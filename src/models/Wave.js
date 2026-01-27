export class Wave {
    #id;
    #enemies
    #mapWaypoints

    constructor(enemies, waypoints){
        this.#id = crypto.randomUUID();
        this.#enemies = enemies
        this.#mapWaypoints = waypoints
    }

    spawnEnemies(){

        for (let i = 100; i < 10 * 100; i += 50) {
            this.addEnemy({
                x: this.#mapWaypoints.waypoints[0].x - i,
                y: this.#mapWaypoints.waypoints[0].y,
            });
        }
    }

    get enemies(){
        return this.#enemies
    }
}