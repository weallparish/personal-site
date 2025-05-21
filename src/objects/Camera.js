import { events } from "./Events.js";
import { GameObject } from "./GameObject.js";
import { Vector2 } from "../helpers/Vector2.js";

export class Camera extends GameObject {
    constructor() {
        super({});

        events.on("HERO_POSITION", this, heroPosition => {
            const personHalf = 8;
            const canvasWidth = 320;
            const canvasHeight = 180;
            const halfWidth = -personHalf + canvasWidth / 2;
            const halfHeight = -personHalf + canvasHeight / 2;

            this.position = new Vector2(
                -heroPosition.x + halfWidth,
                -heroPosition.y + halfHeight
            )
        })
    }
}