class Resources {
    constructor() {
        this.toLoad = {
            sky: "../../public/sprites/sky.png",
            ground: "../../public/sprites/ground.png",
            hero: "../../public/sprites/tiny_eden.png",
            shadow: "../../public/sprites/hero_shadow.png"

        };

        this.images = {};

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

export const resources = new Resources();