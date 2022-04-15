class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.updateEvent.addListner((ball, ai) => {
      this.view.updatePositions(ball, ai);
    });
    this.model.scoreEvent.addListner((score) =>
      this.view.updateScore(score),
    );
    this.view.playerEvent.addListner((player) =>
      this.model.updatePlayer(player),
    );
  }

  run() {
    this.model.reset();
    this.model.update();
    this.view.render();
  }
}

export default Controller;
