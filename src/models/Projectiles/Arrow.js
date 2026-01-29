import { Projectile } from "../Projectile.js";
import arrowSprite from "../../assets/sprites/projectiles/arrow.webp";

export class Arrow extends Projectile {
    constructor(enemy, pos = { x: 0, y: 0 }) {
        super(enemy, pos, arrowSprite, 3, { x: 0, y: 0 }, 8);
    }
}
