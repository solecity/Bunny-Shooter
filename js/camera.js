
class Camera {
    constructor(player) {
        this.player = player;
        this.x = 0;
        this.y = 0;
    }

    preDraw() {
        ctx.save();

        this.x = this.player.x - canvas.width / 2;
        this.y = this.player.y - canvas.height / 2;

        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x + canvas.width > scene.w) {
            this.x = scene.w - canvas.width;
        }

        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y + canvas.height > scene.h) {
            this.y = scene.h - canvas.height;
        }

        ctx.translate(-this.x, -this.y);
    }

    posDraw() {
        ctx.restore();
    }
}

function CreateScene() {
    scene = {
        w: canvas.width + 150,
        h: canvas.height + 150,
        start: function() {
            for (let i = 0; i < 20; i++) {
                var flower = {
                    x: RandomBetween(0, scene.w),
                    y: RandomBetween(0, scene.h),
                    r: RandomBetween(0.5, 2)
                }
                flowers.push(flower);
            }
        },
        draw: function() {
            // grass
            ctx.fillStyle = "#b5e0a4";
            ctx.fillRect(0, 0, this.w, this.h);
            
            // flowers
            ctx.fillStyle = "white";
            for (let i = 0; i < flowers.length; i++) {
                ctx.beginPath();
                ctx.arc(flowers[i].x, flowers[i].y, flowers[i].r, 0, pi2, false);
                ctx.fill();
            }
        }
    }
}

function CreateBackground() {
    background = {
        flowers: [],
        firefly: {
            x: 320,
            y: 320,
            size: 50,
            speed: 5
        },
        clouds: {
            x: 140,
            y: 140,
            size: 80,
            speed: 20
        },
        draw: function() {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.firefly.x - camera.x / this.firefly.speed, this.firefly.y - camera.y / this.firefly.speed, this.firefly.size, this.firefly.size);

            ctx.fillStyle = "white";
            ctx.fillRect(this.clouds.x + camera.x / this.clouds.speed, this.clouds.y + camera.y / this.clouds.speed, this.clouds.size, this.clouds.size);
        }
    }
}