import { Animations } from "../Animations";
import { events } from "../Events";
import { FrameIndexPattern } from "../FrameIndexPattern";
import { GameObject } from "../GameObject";
import { gridCells, isSpaceFree } from "../../helpers/Grid";
import { moveTowards } from "../../helpers/MoveTowards";
import { DOWN, LEFT, RIGHT, UP } from "../../helpers/Input";
import { walls } from "../../levels/level1";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../../helpers/Vector2";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./heroAnimations";

export class Hero extends GameObject {
    constructor(x, y) {
        super( {
            position: new Vector2(x, y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(16, 16),
            position: new Vector2(0.5, -3)
        })
        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(16, 16),
            hFrames: 2,
            vFrames: 4,
            frame:0,
            position: new Vector2(1, -5),
            animations: new Animations({
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkUp: new FrameIndexPattern(WALK_UP),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
        
                standDown: new FrameIndexPattern(STAND_DOWN),
                standUp: new FrameIndexPattern(STAND_UP),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT)
            })
        })
        this.addChild(this.body);

        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
    }

    step(delta, root) {
        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 1;

        if (hasArrived) {
            this.tryMove(root);
        }

        this.tryEmitPosition();
    }

    tryEmitPosition() {
        if (this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }

        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position);
    }

    tryMove(root) {
        const {input} = root;

        if (!input.direction) {
    
            if (this.facingDirection === LEFT) { this.body.animations.play("standLeft");}
            if (this.facingDirection === RIGHT) { this.body.animations.play("standRight");}
            if (this.facingDirection === UP) { this.body.animations.play("standUp");}
            if (this.facingDirection === DOWN) { this.body.animations.play("standDown");}
            return;
        }
    
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = gridCells(1);
    
        if (input.direction === DOWN) {
            nextY += gridSize;
            this.body.animations.play("walkDown");
        }
        if (input.direction === UP) {
            nextY -= gridSize;
            this.body.animations.play("walkUp");
        }
        if (input.direction === LEFT) {
            nextX -= gridSize;
            this.body.animations.play("walkLeft");
        }
        if (input.direction === RIGHT) {
            nextX += gridSize;
            this.body.animations.play("walkRight");
        }
    
        this.facingDirection = input.direction ?? this.facingDirection;
    
        if (isSpaceFree(walls, nextX, nextY)) {
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;
        }
        
    }
}