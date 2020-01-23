
class Button {
    constructor(sprite, y, sy, state) {
        this.sprite = sprite;
        this.x = canvas.width / 2 - 120;
        this.y = y;
        this.sy = sy;                           // sprite sheet y position
        this.w = 240;
        this.h = 48;
        this.state = state;
    }

    draw() {
        ctx.drawImage(this.sprite, 0, this.sy, this.w, this.h, this.x, this.y, this.w, this.h);
    }

    drawHoover() {
        ctx.drawImage(this.sprite, 260, this.sy, this.w, this.h, this.x, this.y, this.w, this.h);
    }

    click() {
        gameState = this.state;
        ChangeState();
    }
}

function NewButton(y, sy, nextState) {    
    //startButton = new Button(graphics.menuButtons, y, sy, nextState);

    buttons.push(new Button(graphics.menuButtons.image, y, sy, nextState));
}