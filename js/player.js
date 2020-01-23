
class Player {
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
        this.speed = 200;
        this.rotation = 0;

        // collision bools
        this.hit = false;
        this.dead = false;

        // box collider
        this.collider = {
            x: 0,
            y: 0,
            r: this.pivot.x,
            fill: "blue",
            stroke: "white"
        }

        // bullets
        this.bullets = [];
        this.isPressed = false;

        // sprite sheet animation
        this.framesDuration = 1 / 4;
        this.frameCount = 3;
        this.currentFrame = 0;
        this.currentFrameCountTime = 0;
    }

    draw() {
        // draw the player pointer
        ctx.fillStyle = "blue";
        ctx.fillRect(Input.mouse.x + camera.x - 1, Input.mouse.y + camera.y - 1, 10, 10);

        ctx.save();

        // applies transformations
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation + 1.5708);

        // draw player box
        ctx.fillStyle = this.collider.fill;
        ctx.fillRect(-this.pivot.x, -this.pivot.y, this.size, this.size);

        // draw player
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
        if (this.currentFrameCountTime >= this.framesDuration) {
            // update the animation with the new frame
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.currentFrameCountTime = 0;
        }

        // rotation to face pointersd
        this.rotation = Math.atan2(
            Input.mouse.y + camera.y - this.y,
            Input.mouse.x + camera.x - this.x
        );

        // initial position of collider
        this.collider.x = this.x;
        this.collider.y = this.y;

        // displacement vector
        let disp = { x: 0, y: 0 };

        if (Input.IsKeyPressed(KEY_A))
            disp.x -= 1;
        if (Input.IsKeyPressed(KEY_D))
            disp.x += 1;
        if (Input.IsKeyPressed(KEY_W))
            disp.y -= 1;
        if (Input.IsKeyPressed(KEY_S))
            disp.y += 1;

        let dispMag = Math.sqrt((disp.x * disp.x) + (disp.y * disp.y));

        if (dispMag > 0) {
            disp.x /= dispMag;
            disp.y /= dispMag;
        }

        this.x += disp.x * this.speed * dt.global;
        this.y += disp.y * this.speed * dt.global;

        // walls collisions - x
        if (this.x <= this.size / 2) {
            this.x = this.size / 2;
        }
        else if (this.x + this.size / 2 > scene.w) {
            this.x = scene.w - this.size / 2;
        }

        // walls collisions - y
        if (this.y < this.size / 2) {
            this.y = this.size / 2;
        }
        else if (this.y + this.size / 2 > scene.h) {
            this.y = scene.h - this.size / 2;
        }

        // if mouse is pressed then the player can shoot only once
        if (!this.isPressed) {
            if (Input.IsMousePressed()) {
                this.secondCounter = 0;
                this.isPressed = true;

                // audio
                audio.bullet.currentTime = 0.01;
                audio.bullet.play();

                this.shootBullets();
            }
        }

        // if mouse is not pressed
        if (!Input.IsMousePressed()) {
            this.isPressed = false;
        }

        // update the bullets
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        }
    }

    // new bullet
    shootBullets() {
        let target = {
            x: Input.mouse.x,
            y: Input.mouse.y
        }

        NewBullet(this, target);
    }
}

function NewPlayer() {
    player = new Player(graphics.player.image, canvas.width / 2, canvas.height / 2);
}