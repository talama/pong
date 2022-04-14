/**
 * Class Event
 * An Event will notify its listeners every time the event is triggered
 */
class Event {
  constructor() {
    this.listeners = [];
  }

  addListner(listener) {
    this.listeners.push(listener);
  }

  trigger(...params) {
    this.listeners.forEach((listener) => listener(...params));
  }
}

export default Event;
