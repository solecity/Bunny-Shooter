
class Bullet {
    constructor(player, target) {
        this.x = player.pivot.x;
        this.y = player.pivot.y;

        this.player = player;
        this.target = target;

        this.r = 10;

        this.color = "orange";
        this.speed = 400;
    }

    draw() {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.player.x, this.player.y, this.r, 0, pi2);
        ctx.fill();
    }
    
    update() {
        this.x = this.target.x - this.speed * dt.global;
        this.y = this.target.y - this.speed * dt.global;
    }
}

function NewBullet(player, target) {
    player.bullets.push(new Bullet(player, target));
}