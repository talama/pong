import Event from './event.js';

class Model {
  constructor(
    gameWidth,
    gameHeight,
    playerWidth,
    playerLength,
    ballRadius,
    updateRate,
  ) {
    // game settings
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.playerWidth = playerWidth;
    this.playerLength = playerLength;
    // ball settings
    this.ball = {
      x: gameWidth / 2,
      y: gameHeight / 2,
      radius: ballRadius,
      velocity: {
        x: 4,
        y: 3,
      },
      accelleration: 1,
    };

    this.ball.getVelocity = () => {
      return Math.sqrt(
        this.ball.velocity.x ** 2 + this.ball.velocity.y ** 2,
      );
    };

    // player settings
    this.player = {
      x: 20,
      y: this.gameHeight / 2 - this.playerLength / 2,
    };
    this.AI = {
      x: this.gameWidth - this.playerWidth - 20,
      y: this.gameHeight / 2 - this.playerLength / 2,
    };
    this.score = [0, 0];
    // update rate
    this.updateRate = updateRate;
    // events
    this.updateEvent = new Event();
    this.scoreEvent = new Event();
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  reset() {
    // reset ball
    let direction = this.getRandom(-1, 1);
    while (direction === 0) direction = this.getRandom(-1, 1);
    this.ball.x = this.gameWidth / 2;
    this.ball.y = this.gameHeight / 2;
    this.ball.velocity.x = this.getRandom(1, 3) * direction;
    this.ball.velocity.y = this.getRandom(1, 3);
    this.ball.accelleration = 1;
    this.updateEvent.trigger(this.ball, this.AI);
  }

  wallCollision() {
    if (
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.gameHeight
    )
      this.ball.velocity.y = -this.ball.velocity.y;
  }

  paddleCollision(player) {
    const ballTop = this.ball.y + this.ball.radius;
    const ballBottom = this.ball.y - this.ball.radius;
    const ballRight = this.ball.x + this.ball.radius;
    const ballLeft = this.ball.x - this.ball.radius;
    const playerTop = player.y;
    const playerBottom = player.y + this.playerLength;
    const playerLeft = player.x;
    const playerRight = player.x + this.playerWidth;
    if (
      ballTop <= playerBottom &&
      ballBottom >= playerTop &&
      ballLeft <= playerRight &&
      ballRight >= playerLeft
    ) {
      this.ball.velocity.x = -this.ball.velocity.x;
      this.ball.velocity.y = -this.ball.velocity.y;
    }
    return (
      ballTop <= player.y + this.playerLength &&
      ballBottom >= player.y &&
      ballLeft <= player.x + this.playerWidth &&
      ballRight >= player.x
    );
  }

  updateBall() {
    this.ball.x += this.ball.velocity.x;
    this.ball.y += this.ball.velocity.y;
    this.wallCollision();
    if (this.ball.x < this.gameWidth / 2)
      this.paddleCollision(this.player);
    else this.paddleCollision(this.AI);
  }

  updateAI() {
    this.AI.y = this.ball.y - this.playerLength / 2;
  }

  updatePlayer(player) {
    this.player = player;
  }

  update(updateRate) {
    setInterval(() => {
      this.updateBall();
      if (this.ball.x - this.ball.radius <= 0) {
        this.score[1] += 1;
        this.scoreEvent.trigger(this.score);
        this.reset();
      } else if (this.ball.x + this.ball.radius >= this.gameWidth) {
        this.score[0] += 1;
        this.scoreEvent.trigger(this.score);
        this.reset();
      }
      this.updateAI();
      this.updateEvent.trigger(this.ball, this.AI);
    }, this.updateRate);
  }
}

export default Model;
