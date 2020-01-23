
// GENERAL
let canvas;
let ctx;

let pi2 = Math.PI * 2;


// DELTA TIME
let dt = {
    target: (1 / 60),
    global: 0,
    acumDelta: 0
};


// FRAMES
let system = {
    time: 0,
    FPS: 0,
    frames: 0
};


// GRAPHICS ASSETS REFERENCES
let graphics = {
    gameTitle: {
        path: "assets/ui/title.png",
        image: null
    },
    gameoverTitle: {
        path: "assets/ui/gameover.png",
        image: null
    },
    menuButtons: {
        path: "assets/ui/buttons.png",
        image: null
    },
    ui: {
        path: "assets/ui/ui.png",
        image: null
    },
    counter: {
        path: "assets/ui/counter.png",
        image: null
    },
    player: {
        path: "assets/game/player.png",
        image: null
    },
    enemy: {
        path: "assets/game/enemy.png",
        image: null
    }
};

// AUDIO ASSETS REFERENCES
let audio = {
    menu: null,
    gameover: null,
    playerHit: null,
    enemyDead: null,
    bullet: null
}


// MENU
let buttons = [];
let buttonHoover;


// GAME
let gameState = 0;
let gameRound;
let camera, scene
let background, middleground, foreground;

let score = 50;
let health = 100;
let enemyCount = 0;

let player = null;
let enemy = null;
let enemies = [];

let flowerGroups = [];
let fireflies = [];
let cloudGroups = [];


// GAME STATES
let isCollision = false;