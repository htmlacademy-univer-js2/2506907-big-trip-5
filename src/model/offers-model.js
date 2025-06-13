import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #service = null;
  #offers = [];

  constructor({ service }) {
    super();
    this.#service = service;
  }

  getAll() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }
}
