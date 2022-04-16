/**
 * Class Event
 * An Event will notify its listeners every time the event is triggered
 */
class Event {
  constructor() {
    this.listeners = [];
  }

  /**
   *  Adds callbacks to be called when an event is triggered
   * @param {Function} listener
   */
  addListner(listener) {
    this.listeners.push(listener);
  }

  /**
   *  Calls every callback for the event triggered.
   * @param  {...any} params - parameters to be passed to the callback.
   */
  trigger(...params) {
    this.listeners.forEach((listener) => listener(...params));
  }
}

export default Event;
