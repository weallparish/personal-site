class Resources {
    constructor() {
        this.toLoad = {
            sky: new URL("/sprites/sky.png", import.meta.url).href,
            ground: new URL("/sprites/ground.png", import.meta.url).href,
            hero: new URL("/sprites/tiny_eden.png", import.meta.url).href,
            shadow: new URL("/sprites/hero_shadow.png", import.meta.url).href

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