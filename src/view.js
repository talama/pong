class View {
  constructor(
    ctx,
    gameWidth,
    gameHeight,
    playerWidth,
    playerLength,
    ballColor,
    playerColor,
    aiColor,
  ) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.playerWidth = playerWidth;
    this.playerLength = playerLength;
    this.ballColor = ballColor;
    this.playerColor = playerColor;
    this.aiColor = aiColor;
  }

  updatePositions(ball, player, ai) {
    this.ball = ball;
    this.player = player;
    this.AI = ai;
  }

  drawBoard() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
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
