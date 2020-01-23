
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
    uiLife: {
        path: "assets/ui/life.png",
        image: null
    },
    uiScore: {
        path: "assets/ui/points.png",
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


// MUSIC ASSETS REFERENCES
let music = {
}

// SOUNDS ASSETS REFERENCES
let audio = {
    menu: new Audio("sound/caketown.mp3"),
    game: new Audio("sound/shakeAndBake.mp3"),
    playerDead: null,
    enemyDead: null,
    bullet: null
}


// MENU
let startButton, restartButton, player1Button, player2Button;
let buttons = [];
let buttonHoover;


// GAME
let gameState = 1;
let gameRound = 0;
let camera, scene, background;

let score = 50;
let lives = 0;
let enemyCount = 0;

let player = null;
let enemy = null;
let enemies = [];

let flowers = [];
let fireflies = [];
let clouds = [];


// GAME STATES
let isCollision = false;
let isGameover = false;