import { rnd } from "./Math.js";

export class Bubble {
    constructor(x = 0, y = 0, radius = 1, color = "blue", alpha = 0.1, speed = 0.1, type="normal", angle = 0) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = radius;
        this.color = color;
        this.alpha = alpha;
        this.speed = speed;
        this.type = type;
        this.angle = angle;
        this.bubblesSummoned = 0;
    }
    wasClicked(clickX, clickY) {
        let dx = clickX - this.x;
        let dy = clickY - this.y;
        let d = Math.sqrt(dx**2 + dy**2);
        return d <= this.radius;
    }
    renderBubble(ctx, renderer) {
        renderer(ctx, this);
    }
    simulateBubble(simulator) {
        simulator(this);
    }
}

class BubbleManager {
    constructor() {
        this.bubbles = [];
        this.minRadius = 5;
        this.maxRadius = 100;

        this.minOpacity = 5;
        this.maxOpacity = 50;

        this.minSpeed = 5;
        this.maxSpeed = 50;

        this.secondaryChance = 20;

        this.primary = window.getComputedStyle( document.body ).getPropertyValue( "--primary-main" );
        this.secondary = window.getComputedStyle( document.body ).getPropertyValue( "--secondary-main" );

        this.bubblesOnPop = 0;

    }
    clear() {
        this.bubbles = [];
    }
    add(width, height, color = this.primary, type="normal", x=0, y=0, angle=0) {
        let b = new Bubble(x == 0 ? rnd(0, width) : x, y == 0? rnd(0, height) : y, rnd(this.minRadius, this.maxRadius), color, rnd(this.minOpacity,this.maxOpacity) * 0.01, rnd(this.minSpeed,this.maxSpeed) * 0.01, type, angle);
        this.bubbles.push(b)

        if (type=="normal" && rnd(0, this.secondaryChance) == 0) {
            b.color = this.secondary;
            b.type = "normal";
        }
    }
    at(i) {
        return this.bubbles[i];
    }
    count() {
        return this.bubbles.length;
    }
    prune(condition) {
        let toDelete = [];
        this.bubbles.forEach(b => {
            if (condition(b)) toDelete.push(b);
        })
        toDelete.forEach(b => {
            this.bubbles.splice(this.bubbles.indexOf(b), 1);
        })
    }
    clickBubbles(clickX, clickY, clickEffect, clickFilter="normal") {
        this.bubbles.forEach(b => {
            if (b.type == clickFilter) {
                if (b.wasClicked(clickX, clickY)) {
                    clickEffect(b);
                }
            }
            
        })
    }
    renderBubbles(ctx, renderer) {
        this.bubbles.forEach(b => {
            b.renderBubble(ctx, renderer);
        })
    }
    simulateBubbles(simulator, type="normal") {
        this.bubbles.forEach(b => {
            if (b.type == type)
                b.simulateBubble(simulator);
        })
    }
}

export const bubbleManager = new BubbleManager();