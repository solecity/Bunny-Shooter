
class Bullet {
    constructor(player, target) {
        this.x = player.x;
        this.y = player.y;

        this.direction = player.rotation;

        this.player = player;
        this.target = target;

        this.r = 6;

        this.color = "orange";
        this.speed = 400;
    }

    draw() {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, pi2);
        ctx.fill();
    }
    
    update() {
        this.x += Math.cos(this.direction) * this.speed * dt.global;
        this.y += Math.sin(this.direction) * this.speed * dt.global;

        if (this.x < 0 || this.x > scene.w || this.y < 0 || this.y > scene.h) {
            this.destroy();
        }
    }

    destroy() {
        player.bullets.splice(this, 1);
    }
}

function NewBullet(player, target) {
    player.bullets.push(new Bullet(player, target));
}