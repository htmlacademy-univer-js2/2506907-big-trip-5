import { PointFilters } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  #currentFilter = PointFilters.EVERYTHING;

  set(updateType, update) {
    this.#currentFilter = update;
    this._notify(updateType, update);
  }

  get() {
    return this.#currentFilter;
  }
}
