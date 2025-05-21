export class Vector2 {
    constructor( x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    duplicate() {
        return new Vector2(this.x, this.y);
    }

    add( otherVector ) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    }

    subtract( otherVector ) {
        const negativeVector = otherVector.multiply(-1);
        return new Vector2(this.x + negativeVector.x, this.y + negativeVector.y);
    }

    multiply( scalar ) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
}