
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
    ctx.fillStyle = "#606060";
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
}


// UI
function UI() {
    let icon = {
        sx: [0, 30],
        sy: 0,
        pos: 30,
        size: 30
    };
    let bar = {
        w: 100,
        h: 15,
        color: ["#e82828", "#3eb71c"],
        health: health
    };
    let gameTimer = {
        x: canvas.width / 2,
        y: 40,
        value: Math.floor(gameRound / 60)
    };

    // player health bar
    ctx.drawImage(graphics.ui.image, icon.sx[0], icon.sy, icon.size, icon.size, canvas.width - 2 * icon.size, icon.pos, icon.size, icon.size);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(canvas.width - 1.8 * bar.w, icon.pos + bar.h / 2, bar.w, bar.h);

    if (bar.health > 50) {
        ctx.fillStyle = bar.color[1];
    }
    else {
        ctx.fillStyle = bar.color[0];
    }
    ctx.fillRect(canvas.width - 1.8 * bar.w, icon.pos + bar.h / 2, health, bar.h);

    // player score
    ctx.drawImage(graphics.ui.image, icon.sx[1], icon.sy, icon.size, icon.size, icon.pos, icon.pos, icon.size, icon.size);
    UIText(score, 70, icon.pos + icon.size / 2, "left", 30);

    // timer
    UIText(gameTimer.value, gameTimer.x, gameTimer.y, "center", 40);
}


// GAMEPLAY
function Gameplay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    camera.preDraw();

    // parallax
    scene.draw();
    background.draw();
    middleground.draw();
    middleground.update();

    // screen center
    //ctx.fillStyle = "red";
    //ctx.fillRect(scene.w / 2, scene.w / 2, 50, 50);

    // starts timer
    gameRound++;

    // generate player
    player.update();
    player.draw();

    // generate bullet
    if (player.bullets.length != 0) {
        for (let i = 0; i < player.bullets.length; i++) {
            player.bullets[i].draw();
            player.bullets[i].update();
        }
    }

    // generate enemy
    if (enemies.length != 0) {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].update();
            enemies[i].draw();
        }
    }

    foreground.draw();

    camera.posDraw();

    // ui
    UI();

    // collisions enemy - bullet
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < player.bullets.length; j++) {
            if (collisions(player.bullets[j], enemies[i].collider)) {
                player.bullets[j].destroy(player.bullets[j]);
                enemies[i].destroy(enemy);

                score += 10;
            }
        }
    }

    // collisions enemy - player
    for (let i = 0; i < enemies.length; i++) {
        if (collisions(enemies[i].collider, player.collider)) {
            console.log("player hiit")
            player.hit = true;

            enemies[i].destroy(enemies[i]);
        }
    }

    // if player gets hit by an enemy
    if (player.hit) {
        // audio
        audio.playerHit.currentTime = 0.01;
        audio.playerHit.play();

        player.collider.fill = "red";

        // resets to center
        //player.x = canvas.width / 2;
        //player.y = canvas.height / 2;

        health -= 10;

        player.hit = false;
    }

    // if has no more lives left
    if (health <= 0) {
        audio.gameover.play();

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

    let icon = {
        sx: [0, 50],
        sy: 0,
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 50
    };
    let enemy_size = 50;


    // background
    ctx.fillStyle = "#8cceed";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // title
    ctx.drawImage(graphics.gameoverTitle.image, canvas.width / 2 - title.w / 2, canvas.height / 4 - title.h / 2, title.w, title.h);


    // score
    ctx.drawImage(graphics.counter.image, icon.sx[0], icon.sy, icon.size, icon.size, icon.x / 2 + icon.size - 5, icon.y - icon.size, icon.size, icon.size);
    UIText(score, icon.x / 2 + 2 * icon.size, icon.y - icon.size / 2, "left", 30);


    // timer
    ctx.drawImage(graphics.counter.image, icon.sx[1], icon.sy, icon.size, icon.size, icon.x + icon.size - 5, icon.y - icon.size, icon.size, icon.size);
    UIText(Math.floor(gameRound / 60), icon.x + icon.size * 2, icon.y - icon.size / 2, "left", 30);


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