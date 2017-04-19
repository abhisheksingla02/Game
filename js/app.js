// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    /*As we need the speed of the bug to be random,Math.random()
    function is used,so as the speed does not become too slow,
    a minimum speed of 200 is being set.*/
    this.speed = Math.random() * 1000;
    if (this.speed < 500) {
        this.speed = 200;
    }
    console.log(this.speed);
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    /*This property is taken to keep check of the score*/
    this.score = 0;
};
Player.prototype.update = function(dt) {
    /*These conditions have been given to perform actions when the player reaches the water.*/
    if (this.y <= 0) {
        this.score++;
        var c = confirm("Your Score Is\'" + this.score + "\'Do You Wish To Continue?");
        if (c == true) {
            this.x = 200;
            this.y = 410;
            document.getElementById('action').innerHTML = "YOUR SCORE IS:" + this.score;
        } else {
            this.y = 10;
            var a = this.score;
            document.write("THANX FOR PLAYING THE GAME,YOUR SCORE IS \'" + this.score + "\'PRESS REFRESH TO PLAY AGAIN");
        }
    }
    /* These conditions have been put to reset the game when the player hits the enemy*/
    else if (this.x - allEnemies[0].x < 40 && this.x - allEnemies[0].x > 0 && this.y === allEnemies[0].y) {
        this.x = 200;
        this.y = 410;
    } else if (this.x - allEnemies[1].x < 40 && this.x - allEnemies[1].x > 0 && this.y === allEnemies[1].y) {
        this.x = 200;
        this.y = 410;
    } else if (this.x - allEnemies[2].x < 40 && this.x - allEnemies[2].x > 0 && this.y === allEnemies[2].y) {
        this.x = 200;
        this.y = 410;
    }
    this.x = this.x;
    this.y = this.y;
};
Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    /* In this function we are just comparing the key code with
    the four possible values(up,down,left,right) and moving the
    player accordingly*/
Player.prototype.handleInput = function(code) {
    var a = code;
    if (a === "up") {
        /*These condition is put so that player does not
         go out of canvas*/
        if (this.y <= 0) {
            this.y = 0;
        } else {
            this.x = this.x;
            this.y = this.y - 50;
        }
    } else if (a === "down") {
        if (this.y === 410) {
            this.y = 410;
        } else {
            this.x = this.x;
            this.y = this.y + 50;
        }
    } else if (a === "left") {
        if (this.x === 0) {
            this.x = 0;
        } else {
            this.x = this.x - 25;
            this.y = this.y;
        }
    } else if (a === "right") {
        if (this.x === 400) {
            this.x = 400;
        } else {
            this.x = this.x + 25;
            this.y = this.y;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
/* Here we are also sending the coordinates we want while instantiating the
object.*/
var allEnemies = [new Enemy(-100, 60), new Enemy(-100, 160), new Enemy(100, 160)];
var player = new Player(200, 410);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});