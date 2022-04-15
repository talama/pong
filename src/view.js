import Event from './event.js';
class View {
  constructor(
    cvs,
    gameWidth,
    gameHeight,
    playerWidth,
    playerLength,
    ballColor,
    playerColor,
    aiColor,
  ) {
    this.cvs = cvs;
    this.ctx = this.cvs.getContext('2d');
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.playerWidth = playerWidth;
    this.playerLength = playerLength;
    this.ballColor = ballColor;
    this.playerColor = playerColor;
    this.aiColor = aiColor;
    this.player = {
      x: 20,
      y: this.gameHeight / 2 - this.playerLength / 2,
    };
    this.cvs.addEventListener('mousemove', (evt) =>
      this.playerMove(evt),
    );
    this.score = [0, 0];
    this.playerEvent = new Event();
  }

  playerMove(evt) {
    const rect = this.cvs.getBoundingClientRect();
    this.player.y = evt.y - rect.y - this.playerLength / 2;
    this.playerEvent.trigger(this.player);
  }

  updatePositions(ball, ai) {
    this.ball = ball;
    this.AI = ai;
  }

  updateScore(score) {
    this.score = score;
  }

  drawBoard() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    // draw the net
    this.ctx.fillStyle = 'white';
    for (let i = 5; i <= this.gameHeight; i += 20) {
      this.ctx.fillRect(this.gameWidth / 2 - 4, i, 4, 10);
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

  drawBall(ball) {
    const ballColor = 'red';
    this.ctx.fillStyle = ballColor;
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

  drawPlayers() {
    // draw Player
    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.playerWidth,
      this.playerLength,
    );
    // Draw AI
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(
      this.AI.x,
      this.AI.y,
      this.playerWidth,
      this.playerLength,
    );
  }

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
