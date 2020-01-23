
// CAMERA
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


// GRASS
function CreateScene() {
    scene = {
        w: canvas.width * 2,
        h: canvas.height * 2,
        draw: function () {
            ctx.fillStyle = "#b5e0a4";
            ctx.fillRect(0, 0, this.w, this.h);
        }
    }
}


// FLOWERS
function CreateBackground() {
    background = {
        groupLength: 20,
        colors: ["#ffffff", "#99c8f7", "#ff9cd6"],
        start: function () {
            for (let i = 0; i < this.groupLength; i++) {
                let tmpLeng = Math.round(RandomBetween(1, 10));
                let flowerGroup = {
                    x: RandomBetween(0, scene.w),
                    y: RandomBetween(0, scene.h),
                    flowers: []
                }

                for (let j = 0; j < tmpLeng; j++) {
                    let flower = {
                        x: RandomBetween((flowerGroup.x - RandomBetween(0, 30)), (flowerGroup.x + RandomBetween(0, 30))),
                        y: RandomBetween((flowerGroup.y - RandomBetween(0, 30)), (flowerGroup.y + RandomBetween(0, 30))),
                        r: RandomBetween(1, 4),
                        color: this.colors[Math.round(RandomBetween(0, 2))]
                    };
                    flowerGroup.flowers.push(flower);
                }
                flowerGroups.push(flowerGroup);
            }
        },
        draw: function () {
            for (let i = 0; i < flowerGroups.length; i++) {
                for (let j = 0; j < flowerGroups[i].flowers.length; j++) {
                    ctx.fillStyle = flowerGroups[i].flowers[j].color;
                    ctx.beginPath();
                    ctx.arc(flowerGroups[i].flowers[j].x, flowerGroups[i].flowers[j].y, flowerGroups[i].flowers[j].r, 0, pi2, false);
                    ctx.fill();
                }
            }
        }
    }
}


// FIREFLIES
function CreateMiddleground() {
    middleground = {
        groupLength: 60,
        speed: 40,
        start: function () {
            for (let i = 0; i < this.groupLength; i++) {
                NewParticle(this.speed);
            }
        },
        draw: function() {
            for (let i = 0; i < fireflies.length; i++) {
                fireflies[i].draw();
            }
        },
        update: function() {
            for (let i = 0; i < fireflies.length; i++) {
                fireflies[i].update();
            }
        }
    }
}


// CLOUDS
function CreateForeground() {
    foreground = {
        groupLength: 50,
        color: "rgba(255, 255, 255, 0.3)",
        speed: 5,
        start: function () {
            for (let i = 0; i < this.groupLength; i++) {
                let tmpLeng = Math.round(RandomBetween(1, 3));
                let cloudGroup = {
                    x: RandomBetween(0, scene.w),
                    y: RandomBetween(0, scene.h),
                    clouds: []
                }

                for (let j = 0; j < tmpLeng; j++) {
                    let cloud = {
                        x: RandomBetween((cloudGroup.x - RandomBetween(0, 80)), (cloudGroup.x + RandomBetween(0, 80))),
                        y: RandomBetween((cloudGroup.y - RandomBetween(0, 80)), (cloudGroup.y + RandomBetween(0, 80))),
                        r: RandomBetween(10, 80)
                    };
                    cloudGroup.clouds.push(cloud);
                }
                cloudGroups.push(cloudGroup);
            }
        },
        draw: function () {
            for (let i = 0; i < cloudGroups.length; i++) {
                for (let j = 0; j < cloudGroups[i].clouds.length; j++) {
                    ctx.save();

                    ctx.fillStyle = this.color;
                    ctx.filter = "blur(15px)";      // feather effet

                    ctx.beginPath();
                    ctx.arc(cloudGroups[i].clouds[j].x + camera.x / this.speed, cloudGroups[i].clouds[j].y + camera.y / this.speed, cloudGroups[i].clouds[j].r, 0, pi2, false);
                    ctx.fill();

                    ctx.restore();
                }
            }
        }
    }
}