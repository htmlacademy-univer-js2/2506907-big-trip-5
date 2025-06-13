import AbstractView from '../framework/view/abstract-view.js';
import { createTripInfoTemplate } from '../template/trip-info-template.js';

export default class TripInfoView extends AbstractView {
  #route = null;
  #dates = null;
  #cost = null;
  #isEmpty = true;

  constructor({ route, dates, cost, isEmpty }) {
    super();
    this.#route = route;
    this.#dates = dates;
    this.#cost = cost;
    this.#isEmpty = isEmpty;
  }

  get template() {
    return createTripInfoTemplate({
      route: this.#route,
      dates: this.#dates,
      cost: this.#cost,
      isEmpty: this.#isEmpty,
    });
  }
}
