import { gridCells } from "../../helpers/Grid.js";
import { DOWN, LEFT, RIGHT, UP } from "../../helpers/Input.js";
import { Vector2 } from "../../helpers/Vector2.js";
import { events } from "../Events.js";
import { GameObject } from "../GameObject.js";

export class Interactable extends GameObject {
    constructor(x, y) {
        super( {
            position: new Vector2(x, y)
        });

        this.distanceFromHeroVertical = 0;
        this.distanceFromHeroHorizontal = 0;
        this.touchingHero = false;
        this.isInteractable = false;

        events.on("HERO_POSITION", this, heroPosition => {
            this.distanceFromHeroHorizontal = this.position.x - heroPosition.x;
            this.distanceFromHeroVertical = this.position.y - heroPosition.y;
            const distanceFromHero = this.position.subtract(heroPosition).magnitude();

            if (distanceFromHero <= gridCells(1)) {
                this.touchingHero = true;
            }
            else {
                this.touchingHero = false;
            }
        })
    }

    step(delta, root) {
        const {input} = root;

        if ( this.touchingHero ) {
            if ((input.lastDirection == UP && this.distanceFromHeroHorizontal == 0 && this.distanceFromHeroVertical == -gridCells(1)) ||
            (input.lastDirection == DOWN && this.distanceFromHeroHorizontal == 0 && this.distanceFromHeroVertical == gridCells(1)) ||
            (input.lastDirection == LEFT && this.distanceFromHeroVertical == 0 && this.distanceFromHeroHorizontal == -gridCells(1)) ||
            ( input.lastDirection == RIGHT && this.distanceFromHeroVertical == 0 && this.distanceFromHeroHorizontal == gridCells(1))) {
                this.isInteractable = true;
            }
        }
        else {
            this.isInteractable = false;
        }

        if ( input.isInteracting && this.isInteractable ) {
            input.isInteracting = false;
            input.canInteract = false;
            this.interact(input);
            input.canInteract = true;  
        }
    }
    
        

    interact(input) {}
    
}