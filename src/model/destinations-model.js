import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #service = null;
  #destinations = [];

  constructor({ service }) {
    super();
    this.#service = service;
  }

  getAll() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  async init() {
    this.#destinations = await this.#service.getDestinations();
    return this.#destinations;
  }
}
