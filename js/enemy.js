
class Enemy {
    constructor(sprite, x, y, player) {
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

        // target
        this.player = player;

        // sprite movement / direction
        this.speed = -RandomBetween(20, 80);
        this.rotation = 0;

        // check if is alive
        this.dead = false;

        // box collider
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
            this.player.y + camera.y - this.y,
            this.player.x + camera.x - this.x
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

        if (this.collisionPlayer(player, this) && !player.dead) {
            player.dead = true;            
        }
/*
        let dx = this.collider.position.x - this.player.collider.position.x;
        let dy = this.collider.position.y - this.player.collider.position.y;
        let dist = Math.sqrt(dx * dx + dy * dy);*/
    }

    collisionPlayer(player, enemy) {
        let dx = this.collider.x - this.player.collider.x;
        let dy = this.collider.y - this.player.collider.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.collider.r + this.player.collider.r) {
            console.log("DEAD");

            isCollision = true;
            player.collider.fill = "rgba(0, 255, 230, 0.25)";
        }
        else {
            isCollision = false;
            player.collider.fill = "blue";
        }

        return isCollision;

/*
        if (dx > (player.w / 2 + enemy.r) || dy > (player.h / 2 + enemy.r)) {
            isCollision = false;
        }
        else if (dx <= (player.w) || dy <= (player.h)) {
            isCollision = true;
        }*/
    }
}

function NewEnemy() {
    let position = {
        x: 50,
        y: RandomBetween(10, scene.h - 200)
    }

    enemy = new Enemy(graphics.enemy.image, position.x, position.y, player);

    //enemies.push(new Enemy(graphics.enemy.image, position.x, position.y));
}