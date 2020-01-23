
class Particle {
    constructor(x, y, r, vX, vY, filter, color, speed) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.vX = vX;
        this.vY = vY;

        this.filter = filter;
        this.color = color;

        this.speed = speed;

        this.dead = false;
    }

    draw() {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.filter = this.filter;

        ctx.beginPath();
        ctx.arc(this.x - camera.x / this.speed, this.y - camera.y / this.speed, this.r, 0, pi2, false);
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.x += this.vX;
        this.y += this.vY;
    }
}

function NewParticle(speed) {
        let firefly = {
            x: RandomBetween(0, scene.w),
            y: RandomBetween(0, scene.h),
            r: RandomBetween(2, 8),
            vX: RandomBetween(-.2, .2),
            vY: RandomBetween(-.2, .2),
            filter: "blur(1px)",  // feather effet
            color: "rgba(255, 255, 117, .7)"
        };

        fireflies.push(new Particle(firefly.x, firefly.y, firefly.r, firefly.vX, firefly.vY, firefly.filter, firefly.color, speed));
}