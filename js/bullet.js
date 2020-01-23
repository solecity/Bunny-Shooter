
class Bullet {
    constructor(player) {
        // origin
        this.x = player.x;
        this.y = player.y;

        // target
        this.direction = player.rotation;

        // characteristics
        this.r = 6;
        this.color = "orange";
        this.speed = 400;

        // collider
        this.collider = {
            x: 0,
            y: 0,
            r: this.r
        }

        this.hit = false;
    }

    draw() {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, pi2);
        ctx.fill();

        // draw collider
        ctx.beginPath();
        ctx.arc(this.collider.x, this.collider.y, this.collider.r, 0, pi2, false);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    
    update() {
        this.x += Math.cos(this.direction) * this.speed * dt.global;
        this.y += Math.sin(this.direction) * this.speed * dt.global;

        // walls collisions
        if (this.x < 0 || this.x > scene.w || this.y < 0 || this.y > scene.h) {
            this.destroy(this);
        }
    }

    destroy(bullet) {
        player.bullets.splice(bullet, 1);
    }
}

function NewBullet(player) {
    player.bullets.push(new Bullet(player));
}