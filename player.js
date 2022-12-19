class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 3;
        this.speed = 3;
        this.markedForDeletion = false
        this.image = document.getElementById('projectile')
    }
    update() {
        this.x += this.speed
        if(this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y)
    }
}

class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 100;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.speedY = 0;
        this.maxSpeed = 2;
        this.projectiles = [];
        this.image = document.getElementById('player')
        this.powerUp = false
        this.powerUpTimer = 0;
        this.powerUpLimit = 10000;
    }
    update(deltaTime) {
        if(this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed
        else if(this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
        else this.speedY = 0;
        this.y += this.speedY
        // vertical boundaries
        if(this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5
        else if(this.y < -this.height * 0.5) this.y = -this.height * 0.5;
        // handle projectiles
        this.projectiles.forEach(projectile => {
            projectile.update()
        })
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
        // sprite animation
        if(this.frameX < this.maxFrame) {
            this.frameX++
        } else {
            this.frameX = 0;
        }
        // power up
        if (this.powerUp) {
            if (this.powerUpTimer > this.powerUpLimit) {
                this.powerUpTimer = 0
                this.powerUp = false;
                this.frameY = 0;
            } else {
                this.powerUpTimer += deltaTime;
                this.frameY = 1;
                this.game.ammo += 0.1;
            }
        }

    }
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        this.projectiles.forEach(projectile => {
            projectile.draw(context)
        })
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
            this.game.ammo--;
        }
        if (this.powerUp) this.shootBottom()
    }
    shootBottom() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175))
            this.game.ammo--;
        }
    }
    enterPowerUp() {
        this.powerUpTimer = 0
        this.powerUp = true;
        if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;

    }
}
