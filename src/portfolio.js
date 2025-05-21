import '../css/portfolio.css'
import { Animations } from './objects/Animations.js';
import { Camera } from './objects/Camera.js';
import { events } from './objects/Events.js';
import { FrameIndexPattern } from './objects/FrameIndexPattern.js';
import { GameLoop } from './GameLoop.js';
import { GameObject } from './objects/GameObject.js';
import { gridCells, isSpaceFree } from './helpers/Grid.js';
import { moveTowards } from './helpers/MoveTowards.js';
import { Input, UP, DOWN, LEFT, RIGHT } from './helpers/Input.js';
import { walls } from './levels/level1.js';
import { Hero } from './objects/Hero/Hero.js';
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './objects/Hero/heroAnimations.js';
import { resources } from './objects/Resource.js';
import { Sprite } from './objects/Sprite.js';
import { Vector2 } from './helpers/Vector2.js';
import { Interactable } from './objects/Interactables/Interactable.js';
import { DialogInteractable } from './objects/Interactables/DialogInteractable.js';

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
    position: new Vector2(0,0)
})

// Add sky, ground, and hero
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

const tree = new DialogInteractable(gridCells(4), gridCells(3), "I am a tree!");
mainScene.addChild(tree);

// Add input to main scene
mainScene.input = new Input();

const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    skySprite.drawImage(ctx, 0, 0)

    ctx.save();

    ctx.translate(camera.position.x, camera.position.y);

    mainScene.draw(ctx, 0, 0);

    ctx.restore();
}

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();