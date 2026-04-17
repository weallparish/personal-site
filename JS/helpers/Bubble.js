export class Bubble {
    constructor(x = 0, y = 0, radius = 1, color = "blue", alpha = 0.1, speed = 0.1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = alpha;
        this.speed = speed;
    }
    wasClicked(x, y) {
        let dx = x - this.x;
        let dy = y - this.y;
        let d = Math.sqrt(dx**2 + dy**2);
        return d <= this.radius;
    }
}

class BubbleManager {
    constructor() {
        this.bubbles = [];
    }
    add(b) {
        this.bubbles.push(b);
    }
    at(i) {
        return this.bubbles[i];
    }
}

export const bubbleManager = new BubbleManager();