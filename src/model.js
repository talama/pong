import Event from './event.js';

/**
 * Class Model
 */
class Model {
  /**
   * Implements the Model component of the MVC.
   * @param {Number} gameWidth
   * @param {Number} gameHeight
   * @param {Number} playerWidth
   * @param {Number} playerLength
   * @param {Number} ballRadius
   * @param {Number} updateRate
   */
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
      acceleration: 1,
    };

    // Calcualtes the length of the ball velocity vector
    this.ball.getVelocity = () => {
      return Math.sqrt(
        this.ball.velocity.x ** 2 + this.ball.velocity.y ** 2,
      );
    };

    // players settings
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

  /**
   * Returns a random integer between min and max both inclusive.
   * @param {Number} min
   * @param {Number} max
   * @returns
   */
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Resets the ball to the center of the board with a random velocity and direction.
   */
  reset() {
    // reset ball
    let direction = this.getRandom(-1, 1);
    while (direction === 0) direction = this.getRandom(-1, 1);
    this.ball.x = this.gameWidth / 2;
    this.ball.y = this.gameHeight / 2;
    this.ball.velocity.x = this.getRandom(1, 2) * direction;
    this.ball.velocity.y = this.getRandom(1, 2);
    this.ball.acceleration = 1;
    this.updateEvent.trigger(this.ball, this.AI);
  }

  /**
   * Returns true if the ball hits one of the horizontal walls.
   * @returns {Boolean}
   */
  wallCollision() {
    return (
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.gameHeight
    );
  }

  /**
   * Returns true if the ball collides with one of the players.
   * @param {Object} player
   * @returns {Boolean}
   */
  paddleCollision(player) {
    const ballTop = this.ball.y - this.ball.radius;
    const ballBottom = this.ball.y + this.ball.radius;
    const ballRight = this.ball.x + this.ball.radius;
    const ballLeft = this.ball.x - this.ball.radius;
    return (
      ballBottom >= player.y &&
      ballTop <= player.y + this.playerLength &&
      ballLeft <= player.x + this.playerWidth &&
      ballRight >= player.x
    );
  }

  /**
   * Updates ball velocity and position.
   */
  updateBall() {
    // only check for collisions for the player the ball is going towards to
    // and remember if the velocity direction x is positive or negative
    let currentPlayer;
    let direction;
    if (this.ball.velocity.x < 0) {
      currentPlayer = this.player;
      direction = 1;
    } else {
      currentPlayer = this.AI;
      direction = -1;
    }
    // if the ball hits one of the horizontal walls reflect ball velocity around x axe
    if (this.wallCollision()) {
      const hitWall = new Audio('../sounds/wallHit.mp3');
      this.ball.velocity.y = -this.ball.velocity.y;
      this.ball.acceleration += 0.1;
      hitWall.play();
    }
    // if the ball hits one of the paddles reflect it with a velocity angle that is interpolated
    // linearly between 45 and -45 degrees based on the hit point distance from the paddle center
    // (0 degree angle if the ball hits the middle, 45 degrees at the bottom and -45 degrees at the top of the paddle)
    else if (this.paddleCollision(currentPlayer)) {
      // paddle center y coordinate
      const paddleCenter = currentPlayer.y + this.playerLength / 2;
      // hit point distance form paddle center
      let distance = this.ball.y - paddleCenter;
      // normalize the distance to get a parameter ranging between [-1, 1] that we can use to interpolate the reflection angle.
      distance /= this.playerLength / 2;
      // interpolated angle
      const angle = (Math.PI / 4) * distance;
      const velocity = this.ball.getVelocity();
      const paddleHit = new Audio('../sounds/paddleHit.mp3');
      this.ball.velocity.x = velocity * Math.cos(angle) * direction;
      this.ball.velocity.y = velocity * Math.sin(angle);
      this.ball.acceleration += 0.1;
      paddleHit.play();
    }
    // move the ball
    this.ball.x += this.ball.velocity.x * this.ball.acceleration;
    this.ball.y += this.ball.velocity.y * this.ball.acceleration;
  }

  /**
   * Update AI y position based on ball y position
   */
  updateAI() {
    this.AI.y +=
      (this.ball.y - (this.AI.y + this.playerLength / 2)) * 0.1;
  }

  /**
   * Updated the postion of the player controlled paddle.
   * @param {Object} player
   */
  updatePlayer(player) {
    this.player = player;
  }

  /**
   * Update loop to be repeated 'updateRate' times per second.
   * @param {Number} updateRate
   */
  update(updateRate) {
    setInterval(() => {
      // update the ball postion and check if any of teh players scored.
      // if any player scored reset the ball position and trigger the scoreEvent.
      this.updateBall();
      const scoreHit = new Audio('../sounds/playerScore.mp3');
      if (this.ball.x - this.ball.radius <= 0) {
        this.score[1] += 1;
        this.scoreEvent.trigger(this.score);
        scoreHit.play();
        this.reset();
      } else if (this.ball.x + this.ball.radius >= this.gameWidth) {
        this.score[0] += 1;
        this.scoreEvent.trigger(this.score);
        scoreHit.play();
        this.reset();
      }
      // Update the AI position and trigger the updateEvent.
      this.updateAI();
      this.updateEvent.trigger(this.ball, this.AI);
    }, this.updateRate);
  }
}

export default Model;
