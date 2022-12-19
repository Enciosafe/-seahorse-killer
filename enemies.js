class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
    }
    update() {
        this.x += this.speedX - this.game.speed;
        if (this.x + this.width < 0) this.markedForDeletion = true;
        // sprite animation
        if (this.frameX < this.maxFrame) {
            this.frameX++
        } else this.frameX = 0
    }
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
        if(this.game.debug) {
            context.font = '20px Helvetica'
            context.fillText(this.lives, this.x, this.y)
        }

    }
}

class Angler1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 228;
        this.height = 169;
        this.y = Math.random() * (this.game.height * 0.9 - this.height)
        this.image = document.getElementById('angler1')
        this.frameY = Math.floor(Math.random() * 3);
        this.lives = 3
        this.score = this.lives
    }
}

class Angler2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 213;
        this.height = 165;
        this.y = Math.random() * (this.game.height * 0.9 - this.height)
        this.image = document.getElementById('angler2')
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 4
        this.score = this.lives
    }
}

class LuckyFish extends Enemy {
    constructor(game) {
        super(game);
        this.width = 99;
        this.height = 95;
        this.y = Math.random() * (this.game.height * 0.9 - this.height)
        this.image = document.getElementById('lucky')
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 5
        this.score = 15
        this.type = 'lucky'
    }
}

class HiveWhale extends Enemy {
    constructor(game) {
        super(game);
        this.width = 400;
        this.height = 227;
        this.y = Math.random() * (this.game.height * 0.95 - this.height)
        this.image = document.getElementById('hivewhale')
        this.frameY = 0;
        this.lives = 15
        this.score = this.lives
        this.type = 'hive'
        this.speedX = Math.random() * -1.2 - 0.2
    }
}

class Drone extends Enemy {
    constructor(game,x,y) {
        super(game);
        this.width = 115;
        this.height = 95;
        this.x = x
        this.y = y
        this.image = document.getElementById('drone')
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 3
        this.score = this.lives
        this.type = 'drone'
        this.speedX = Math.random() * -4.2 - 0.5
    }
}
