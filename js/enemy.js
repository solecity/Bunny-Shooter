
class Enemy {
    constructor(sprite, x, y) {
        // sprite data
        this.sprite = sprite;

        // sprite initial position
        this.x = x;
        this.y = y;

        // sprite dimensions
        this.size = 50;

        // sprite pivot point
        this.pivot = {
            x: this.size / 2,
            y: this.size / 2
        };

        // sprite movement / direction
        this.speed = -RandomBetween(20, 80);
        this.rotation = 0;

        // check if is alive
        this.hit = false;
        this.dead = false;

        // collider
        this.collider = {
            x: 0,
            y: 0,
            r: this.pivot.x,
            fill: "purple",
            stroke: "white"
        }

        // sprite sheet animation
        this.framesDuration = 1 / 4;
        this.frameCount = 3;
        this.currentFrame = 0;
        this.currentFrameCountTime = 0;
    }

    draw() {
        // draw the player position
        ctx.fillStyle = "white";
        ctx.fillRect(player.x, player.y, 10, 10);

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation + 1.5708);

        // draw enemy box
        ctx.fillStyle = this.collider.fill;
        ctx.fillRect(-this.pivot.x, -this.pivot.y, this.size, this.size);

        // draw enemy
        ctx.drawImage(this.sprite, this.currentFrame * this.size, 0, this.size, this.size, -this.pivot.x, -this.pivot.y, this.size, this.size);

        ctx.restore();

        // draw collider
        ctx.beginPath();
        ctx.arc(this.collider.x, this.collider.y, this.collider.r, 0, pi2, false);
        ctx.strokeStyle = this.collider.stroke;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    update() {
        // animation
        this.currentFrameCountTime += dt.global;
        if (this.currentFrameCountTime >= this.framesDuration)
        {
            // update the animation with the new frame
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;

            this.currentFrameCountTime = 0;
        }

        // rotation to face player
        this.rotation = Math.atan2(
            player.y + camera.y - this.y,
            player.x + camera.x - this.x
        );

        // initial position of collider
        this.collider.x = this.x;
        this.collider.y = this.y;

        // displacement vector
        let disp = { x: 0, y: 0 };

        disp.x = -Math.cos(this.rotation);
        disp.y = -Math.sin(this.rotation);

        this.x += disp.x * this.speed * dt.global;
        this.y += disp.y * this.speed * dt.global;

        // if enemy hits player
        if (this.hit) {
            console.log("hit player");

            player.hit = true;   
            this.dead = true;
        }
    }
    
    destroy(enemy) {
        // audio
        audio.enemyDead.currentTime = 0.01;
        audio.enemyDead.play();

        enemies.splice(enemy, 1);
    }
}

function NewEnemy() {
    let left = {
        x: RandomBetween(-50, 0),
        y: RandomBetween(-50, scene.h + 50)
    };
    let right = {
        x: RandomBetween(scene.w, scene.w + 50),
        y: RandomBetween(-50, scene.h + 50)
    };
    let top = {
        x: RandomBetween(-50, scene.w + 50),
        y: RandomBetween(-50, 0)
    };
    let bottom = {
        x: RandomBetween(-50, scene.w + 50),
        y: RandomBetween(scene.h, scene.h + 50)
    };

    let origin = [left, right, top, bottom];

    let enemy = origin[Math.round(RandomBetween(0, 3))];
    console.log(enemy)
    
    enemies.push(new Enemy(graphics.enemy.image, enemy.x, enemy.y));
}