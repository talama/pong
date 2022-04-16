/**
 * Class Controller
 */
class Controller {
  /**
   *  Implements the Controller component of the MVC.
   * @param {Model} model
   * @param {View} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // event to inform the view of the current ai and ball positons.
    this.model.updateEvent.addListner((ball, ai) => {
      this.view.updatePositions(ball, ai);
    });
    // event to update the view score.
    this.model.scoreEvent.addListner((score) =>
      this.view.updateScore(score),
    );
    // event to inform the model of the current player position.
    this.view.playerEvent.addListner((player) =>
      this.model.updatePlayer(player),
    );
  }

  /**
   * Runs the game.
   */
  run() {
    this.model.reset();
    this.model.update();
    this.view.render();
  }
}

export default Controller;
