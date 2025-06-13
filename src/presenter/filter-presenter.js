import { UpdateType } from '../const';
import { render, replace, remove } from '../framework/render';
import { FilterView } from '../view';
import { filterMethod } from '../utils/filter';

export default class FilterPresenter {
  #filterComponent = null;
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #currentFilter = null;

  constructor({ container, pointsModel, filterModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get filters() {
    const points = this.#pointsModel.getAll();

    return Object.entries(filterMethod).map(([filterType, filterPoints]) => ({
      type: filterType,
      isDisabled: !filterPoints(points).length,
      isChecked: filterType === this.#currentFilter,
    }));
  }

  init() {
    this.#currentFilter = this.#filterModel.get();
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      items: this.filters,
      onItemChange: this.#handleFilterChange,
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleFilterChange = (filterType) => {
    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };

  #handleModelChange = () => {
    this.init();
  };
}
