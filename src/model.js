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
        x: 1,
        y: 1,
      },
      accelleration: 1,
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
    // update rate
    this.updateRate = updateRate;
    // events
    this.updateEvent = new Event();
  }

  reset() {
    // reset ball
    this.ball.x = this.gameWidth / 2;
    this.ball.y = this.gameHeight / 2;
    this.ball.velocity.x = 1;
    this.ball.velocity.y = 1;
    this.ball.accelleration = 1;
    // reset AI
    this.AI.x = this.gameWidth - this.playerWidth - 20;
    this.AI.y = this.gameHeight / 2 - this.playerLength / 2;
    this.updateEvent.trigger(this.ball, this.AI);
  }

  collision() {
    const ballTop = this.ball.y + this.ball.radius;
    const ballBottom = this.ball.y - this.ball.radius;
    const ballRight = this.ball.x + this.ball.radius;
    const ballLeft = this.ball.x - this.ball.radius;
    if (ballTop >= this.gameHeight || ballBottom <= 0)
      this.ball.velocity.y = -this.ball.velocity.y;
    if (ballRight >= this.gameWidth || ballLeft <= 0)
      this.ball.velocity.x = -this.ball.velocity.x;
  }

  updateBall() {
    this.ball.x += this.ball.velocity.x;
    this.ball.y += this.ball.velocity.y;
    this.collision();
  }

  updateAI() {
    this.AI.y = this.ball.y - this.playerLength / 2;
  }

  update(updateRate) {
    setInterval(() => {
      this.updateBall();
      this.updateAI();
      this.updateEvent.trigger(this.ball, this.AI);
    }, this.updateRate);
  }
}

export default Model;
