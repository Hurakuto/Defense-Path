import { Projectile } from "../Projectile.js";
import fireballSprite from "../../assets/sprites/projectiles/fireball.png";

export class Fireball extends Projectile {
    constructor(enemy, pos = { x: 0, y: 0 }) {
        super(
            enemy,
            { x: pos.x, y: pos.y - 12 },
            fireballSprite,
            1,
            { x: -8, y: -8 },
            25,
        );
    }
}
