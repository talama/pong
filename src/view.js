import Event from './event.js';
/**
 * Class View
 */
class View {
  /**
   * Implements the View Component of the MVC.
   * @param {Object} cvs
   * @param {Number} gameWidth
   * @param {Number} gameHeight
   * @param {Number} playerWidth
   * @param {Number} playerLength
   */
  constructor(cvs, gameWidth, gameHeight, playerWidth, playerLength) {
    this.cvs = cvs;
    this.ctx = this.cvs.getContext('2d');
    // game settings
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.playerWidth = playerWidth;
    this.playerLength = playerLength;
    // player settings
    this.player = {
      x: 20,
      y: this.gameHeight / 2 - this.playerLength / 2,
    };
    this.cvs.addEventListener('mousemove', (evt) =>
      this.playerMove(evt),
    );
    this.score = [0, 0];
    // events
    this.playerEvent = new Event();
  }

  /**
   * Callback to get called every time a mouse movement is detected.
   * Updates the player postion based on the mouse y position.
   * @param {Object} evt
   */
  playerMove(evt) {
    const rect = this.cvs.getBoundingClientRect();
    // moves the middle of the paddle to the mouse pointer y position
    this.player.y = evt.y - rect.y - this.playerLength / 2;
    this.playerEvent.trigger(this.player);
  }

  /**
   * Updates the position of the ball.
   * @param {Object} ball
   * @param {Object} ai
   */
  updatePositions(ball, ai) {
    this.ball = ball;
    this.AI = ai;
  }

  /**
   * Updates the players score.
   * @param {Number} score
   */
  updateScore(score) {
    this.score = score;
  }

  /**
   * Draws the game board
   */
  drawBoard() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    // draw the net
    this.ctx.fillStyle = 'white';
    for (let i = 5; i <= this.gameHeight; i += 20) {
      this.ctx.fillRect(this.gameWidth / 2 + 2, i, 4, 10);
    }
    // draw the score
    this.ctx.font = '60px serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(
      this.score[0],
      this.gameWidth / 6,
      this.gameHeight / 6,
    );
    this.ctx.textAlign = 'right';
    this.ctx.fillText(
      this.score[1],
      (5 * this.gameWidth) / 6,
      this.gameHeight / 6,
    );
  }

  /**
   * Draws the ball.
   */
  drawBall() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(
      this.ball.x,
      this.ball.y,
      this.ball.radius,
      0,
      2 * Math.PI,
      false,
    );
    this.ctx.fill();
  }

  /**
   * Draws the players.
   */
  drawPlayers() {
    // draw Player
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.playerWidth,
      this.playerLength,
    );
    // Draw AI
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.AI.x,
      this.AI.y,
      this.playerWidth,
      this.playerLength,
    );
  }

  /**
   * Render Loop.
   */
  render() {
    requestAnimationFrame(() => {
      this.drawBoard();
      this.drawBall();
      this.drawPlayers();
      this.render();
    });
  }
}

export default View;
