
// START MENU
function StartMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let title = {
        w: 500,
        h: 150
    };

    // background
    ctx.fillStyle = "#8cceed";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // title
    ctx.drawImage(graphics.gameTitle.image, canvas.width / 2 - title.w / 2, canvas.height / 4 - title.h / 2, title.w, title.h);

    // button
    for (let i = 0; i < buttons.length; i++) {
        if (!buttonHoover) {
            buttons[i].draw();
        }
        else {
            buttons[i].drawHoover();
        }
    }

    if (Input.IsMousePressed()) {
        for (let i = 0; i < buttons.length; i++) {
            let boolX = Input.mouse.x > buttons[i].x && Input.mouse.x < buttons[i].x + buttons[i].w
            let boolY = Input.mouse.y > buttons[i].y && Input.mouse.y < buttons[i].y + buttons[i].h

            if (boolX && boolY) {
                buttons[i].click();
                break;
            }
        }
    }
}

// UI TEXT
function UIText(text, x, y, align, size) {
    ctx.font = `${size}px sans-serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
}


// UI
function UI() {
    let icon = {
        sx: [0, 20],
        sy: 0,
        x: [30, 60, canvas.width - 20],
        y: 30,
        size: 30
    };

    let timeConverted = Math.floor(gameRound / 60);
    let gameTimer = {
        x: canvas.width / 2,
        y: 40
    };

    // player score
    ctx.drawImage(graphics.uiScore.image, icon.sx[0], icon.sy, icon.size, icon.size, icon.x[0], icon.y, icon.size, icon.size);
    UIText(score, icon.x[1], icon.y + icon.size / 2, "left", 20);

    // player lives
    for (let i = 1; i <= lives; i++) {
        ctx.drawImage(graphics.uiLife.image, icon.sx[0], icon.sy, icon.size, icon.size, icon.x[2] - i * icon.x[0], icon.y, icon.size, icon.size);
    }

    // timer
    UIText(timeConverted, gameTimer.x, gameTimer.y, "center", 40);
}


// GAMEPLAY
function Gameplay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    camera.preDraw();

    scene.draw();
    background.draw();

    ctx.strokeStyle = "red";
    ctx.strokeRect(50, 50, 150, 150);

    // starts timer
    gameRound++;

    // generate player
    player.update();
    player.draw();

    // generate bullet
    if (player.bullets.length != 0) {
        for (let i = 0; i < player.bullets.length; i++) {
            player.bullets[i].update();
            player.bullets[i].draw();
        }
    }

    // generate enemy
    enemy.update();
    enemy.draw();

    camera.posDraw();

    // ui
    UI();

    // if player collides with enemy
    if (player.dead) {
        player.x = canvas.width / 2;
        player.y = canvas.height / 2;

        lives--;

        player.dead = false;
    }

    // if has no more lives left
    if (lives <= 0) {
        gameState = 2;
        ChangeState();
    }
}


// GAME OVER
function GameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let title = {
        w: 480,
        h: 70
    };

    let enemy_size = 50;

    // background
    ctx.fillStyle = "#8cceed";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // title
    ctx.drawImage(graphics.gameoverTitle.image, canvas.width / 2 - title.w / 2, canvas.height / 4 - title.h / 2, title.w, title.h);

    // score
    ctx.drawImage(graphics.enemy.image, 0, 0, enemy_size, enemy_size, canvas.width / 2 - 1.5 * enemy_size, canvas.height / 2 - enemy_size, enemy_size, enemy_size);
    UIText(score, canvas.width / 2 + enemy_size / 3, canvas.height / 2 - enemy_size / 2, "left", 30);


    // button
    for (let i = 0; i < buttons.length; i++) {
        if (!buttonHoover) {
            buttons[i].draw();
        }
        else {
            buttons[i].drawHoover();
        }
    }

    if (Input.IsMousePressed()) {
        for (let i = 0; i < buttons.length; i++) {
            let boolX = Input.mouse.x > buttons[i].x && Input.mouse.x < buttons[i].x + buttons[i].w
            let boolY = Input.mouse.y > buttons[i].y && Input.mouse.y < buttons[i].y + buttons[i].h

            if (boolX && boolY) {
                buttons[i].click();
                break;
            }
        }
    }
}