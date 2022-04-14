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
    // reset player 1
    this.player.x = 20;
    this.player.y = this.gameHeight / 2 - this.playerLength / 2;
    // reset AI
    this.AI.x = this.gameWidth - this.playerWidth - 20;
    this.AI.y = this.gameHeight / 2 - this.playerLength / 2;
    this.updateEvent.trigger(this.ball, this.player, this.AI);
  }

  updateBall() {
    this.ball.x += this.ball.velocity.x;
    this.ball.y += this.ball.velocity.y;
  }

  update(updateRate) {
    setInterval(() => {
      this.updateBall();
      this.updateEvent.trigger(this.ball, this.player, this.AI);
    }, this.updateRate);
  }
}

export default Model;
