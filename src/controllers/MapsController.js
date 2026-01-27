import { EnemiesManager } from "../managers/EnemiesManager.js";
import { MapWaypoints } from "../models/MapWaypoints.js";
import { MapsView } from "../views/MapsView.js";
import { BuildingsManager } from "../managers/BuildingsManager.js";
import { ProjectilesManager } from "../managers/ProjectilesManager.js";
import { WavesManager } from "../managers/WavesManager.js";

export class MapsController {
    #Emanager;
    #Bmanager;
    #Pmanager;
    #Wmanager;
    #view;
    #mapWaypoints;
    #waveNumber
    #hearts
    #gameState
    #selectedTowerType = "mage";

    constructor(mapId) {
        this.#Emanager = new EnemiesManager();
        this.#Bmanager = new BuildingsManager();
        this.#Pmanager = new ProjectilesManager();
        this.#Wmanager = new WavesManager(mapId - 1);
        this.#view = new MapsView(
            "#app",
            mapId,
            this.update.bind(this),
            this.addBuilding.bind(this),
        );
        this.#mapWaypoints = new MapWaypoints(mapId - 1);

        this.#waveNumber = 0
        this.#hearts = 10
        this.#gameState = undefined

        // Wave management
        this.spawnQueue = [];
        this.spawnTimer = 0;
        this.waveDelayTimer = 0;
        this.isWaveInProgress = false;


        // TODO: add currency and localStorage

        this.#init();
        this.#initUI();
    }

    #initUI() {
        const towers = document.querySelectorAll(".tower-select");
        towers.forEach(tower => {
            tower.addEventListener("click", (e) => {
                // Remove selected class from all
                towers.forEach(t => t.classList.remove("selected-tower"));
                // Add to clicked
                e.currentTarget.classList.add("selected-tower");
                // Update selected type
                this.#selectedTowerType = e.currentTarget.dataset.type;
            });
        });
    }

    endGame() {
        cancelAnimationFrame(this.#view.animationId)

        // ? Delete everything
        // this.allEnemies().forEach((enemy) => {
        //     this.#Emanager.remove(enemy.id)
        // })
        // this.allBuildings().forEach((building) => {
        //     building.projectiles.forEach((projectile) => {
        //         this.#Pmanager.remove(building, projectile.id)
        //     })

        //     this.#Bmanager.remove(building.id)
        // })
        // this.allWaves().forEach((wave) => {
        //     this.#Wmanager.remove(wave.id)
        // })
        // this.#waveNumber = undefined
        // this.#hearts = undefined


        console.log(this.#gameState, this.#hearts, this.#waveNumber)
    }

    addEnemy(position = {}, type = "normal") {
        this.#Emanager.add(this.#mapWaypoints.waypoints, position, type);
    }

    allEnemies() {
        return this.#Emanager.enemies;
    }

    addWave() {
        return this.#Wmanager.add(
            this.#mapWaypoints.waypoints,
        );
    }

    allWaves() {
        return this.#Wmanager.waves;
    }

    addBuilding(position = {}) {
        this.#Bmanager.add(this.allEnemies(), position, this.#selectedTowerType, this.#mapWaypoints.waypoints);
    }

    allBuildings() {
        return this.#Bmanager.buildings;
    }

    #init() {
        this.#view.renderMap();

        this.addWave();
    }

    update() {

        if (typeof this.#hearts === "number" && this.#hearts <= 0) {
            this.#gameState = "Lose"
            this.endGame()
        }

        // ? Waves system
        const waves = this.allWaves();
        // Start Wave if needed
        if (typeof this.#waveNumber === "number" && !this.isWaveInProgress && this.spawnQueue.length === 0) {

            if (this.#waveNumber < waves.length) {
                // Initialize Queue for new wave
                const currentWaveData = waves[this.#waveNumber];
                const waveData = currentWaveData.enemies;

                // Fill Queue
                for (let i = 0; i < waveData.normal; i++) this.spawnQueue.push("normal");
                for (let i = 0; i < waveData.speedy; i++) this.spawnQueue.push("speedy");
                for (let i = 0; i < waveData.tanky; i++) this.spawnQueue.push("tanky");

                this.spawnInterval = waveData.spawnInterval || 60; // Default 1s
                this.spawnTimer = this.spawnInterval;
                this.waveDelayTimer = waveData.waveDelay || 300; // Default 5s

                this.isWaveInProgress = true;
                console.log(`Starting Wave ${this.#waveNumber + 1}`);
            } else if (this.allEnemies().length === 0) {
                this.#gameState = "Win"
                this.endGame()
            }
        }


        // Process Queue
        if (this.isWaveInProgress) {
            if (this.spawnQueue.length > 0) {
                this.spawnTimer--;
                if (this.spawnTimer <= 0) {
                    const type = this.spawnQueue.shift();
                    this.addEnemy({ x: this.#mapWaypoints.waypoints[0].x, y: this.#mapWaypoints.waypoints[0].y }, type);
                    this.spawnTimer = this.spawnInterval;
                }
            } else {
                // Spawn Queue Empty -> Wait for next wave delay
                this.waveDelayTimer--;
                if (this.waveDelayTimer <= 0) {
                    this.isWaveInProgress = false;
                    this.#waveNumber++;
                    console.log("Wave Delay Finished. Next Wave Incoming.");
                }
            }
        }

        // ? Enemy system
        this.allEnemies().forEach((enemy) => {
            enemy.update();
            if (
                enemy.isAtDestination(
                    enemy.waypoints[enemy.waypoints.length - 1],
                )
            ) {
                this.#hearts--
                // ! Enemy removed
                // console.log("Enemie removed");
                this.#Emanager.remove(enemy.id);

                // ? Changement de cible automatique (non fonctionnel, enemies -> tableau d'enemy, alors que maintenant : enemy -> new Enemy)
                // this.allBuildings().forEach(building => {
                //     building.projectiles.forEach(projectile => {
                //         projectile.enemies.forEach(projectileEnemy => {
                //             if (projectileEnemy.id === enemy.id) {
                //                 projectile.enemies = projectile.enemies.filter((projectileEnemy) => projectileEnemy.id !== enemy.id)
                //                 console.log("Changement de cible")
                //             }
                //         })
                //     })
                // })
            }

            if (enemy.health <= 0) {
                this.#Emanager.remove(enemy.id);
                this.#view.coins += 25
                // ! Enemy removed
                // console.log("Enemie removed");
            }

            // ! Enemies position -> !!! Mal de crâne !!!
            // console.log(enemy.position);
        });

        // ? Building system
        this.allBuildings().forEach((building) => {
            building.update();
            building.target = null;
            const validEnemies = this.allEnemies().filter((enemy) => {
                const xDifference = enemy.center.x - building.center.x;
                const yDifference = enemy.center.y - building.center.y;
                const distance = Math.hypot(xDifference, yDifference);

                return distance < enemy.radius + building.radius;
            });

            building.target = validEnemies[0];
            // ! Enemies in a range of a tower -> !!! Mal de crâne !!!
            // console.log(validEnemies)

            for (let i = building.projectiles.length - 1; i >= 0; i--) {
                const projectile = building.projectiles[i];

                if (projectile.enemy) {
                    projectile.update();
                    const xDifference =
                        projectile.enemy.center.x - projectile.position.x;
                    const yDifference =
                        projectile.enemy.center.y - projectile.position.y;
                    const distance = Math.hypot(xDifference, yDifference);

                    if (distance < projectile.enemy.radius + projectile.radius) {
                        projectile.enemy.health -= 20
                        console.log(projectile.enemy.health);
                        building.projectiles.splice(i, 1);
                    }
                }
                else if (projectile.health !== undefined) {

                    const enemies = this.allEnemies();
                    for (let j = enemies.length - 1; j >= 0; j--) {
                        const enemy = enemies[j];
                        const dist = Math.hypot(
                            enemy.center.x - projectile.position.x,
                            enemy.center.y - projectile.position.y
                        );

                        if (dist < enemy.radius + projectile.radius) {
                            const chickHealth = projectile.health;
                            const enemyHealth = enemy.health;

                            enemy.health -= chickHealth;
                            projectile.health -= enemyHealth;

                            // ! Summoned vs Enemies
                            // console.log(`Clash! Chick (${chickHealth}) vs Enemy (${enemyHealth})`);

                            if (projectile.health <= 0) {
                                building.projectiles.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }

        });
    }
}
