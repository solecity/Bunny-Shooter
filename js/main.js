
// REQUEST ANIMATION
window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, dt.target * 1000);
        };
})();


// ON WINDOW LOAD
window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    SetupKeyboardEvents();
    SetupMouseEvents();

    LoadResources(function () {
        Start();
        Loop();
    })
}


// LOAD ALL RESOURCES
function LoadResources(onloaded) {
    // loads graphics
    let imagesToLoad = 0;
    const onload = () => --imagesToLoad === 0 && onloaded();

    // iterate through the object of graphics and load every image
    for (let asset in graphics) {
        if (graphics.hasOwnProperty(asset)) {
            imagesToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const img = graphics[asset].image = new Image;
            img.src = graphics[asset].path;
            img.onload = onload;
        }
    }

    // loads audio
    audio.menu = new Audio("sounds/happytune.mp3");
    audio.gameover = new Audio("sounds/gameover.wav");
    audio.playerDead = "null";
    audio.enemyDead = "null";
    audio.bullet = new Audio("sounds/laser.wav");  

    // initialize background elements
}


// START
function Start() {
    ChangeState();
}


// ANIMATION LOOP
function Loop() {
    // deltaTime
    let now = Date.now();
    dt.global = (now - system.time) / 1000;
    //dt.global = deltaTime;

    if (dt.global > 1) {
        dt.global = 0;
    }

    system.time = now;

    // frames counter
    system.frames++;
    dt.acumDelta += dt.global;

    if (dt.acumDelta > 1) {
        system.FPS = system.frames;
        system.frames = 0;
        dt.acumDelta -= dt.acumDelta;
    }

    requestAnimationFrame(Loop);
    Animate();
}


// GAME STATE
function ChangeState() {
    buttons = [];

    let y = [canvas.height / 2 + 50, 2 * canvas.height / 4];
    let sy = [0, 60, 120, 180];
    let nextState;

    switch (gameState) {

        case 0:     // Start menu
            audio.menu.play();
            isGameover = false;
            nextState = 1;
            NewButton(y[0], sy[0], nextState);
            break;
        case 1:     // Gameplay
            audio.menu.pause();
            gameRound = 0;
            score = 0;
            health = 100;
            CreateScene();
            CreateBackground();
            NewPlayer();
            NewEnemy();
            camera = new Camera(player);
            break;
        case 2:     // Game over
            audio.menu.play();
            nextState = 1;
            NewButton(y[0], sy[1], nextState);
            break;
    }
}


function Animate() {
    switch (gameState) {
        case 0:
            StartMenu();
            break
        case 1:
            Gameplay();
            break
        case 2:
            GameOver();
            break
    }
}


// generate random value
function RandomBetween(min, max) {
    return min + (Math.random() * (max - min));
}