class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.updateEvent.addListner((ball, player, ai) => {
      this.view.updatePositions(ball, player, ai);
    });
  }

  run() {
    this.model.reset();
    this.model.update();
    this.view.render();
  }
}

export default Controller;
