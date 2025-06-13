import AbstractView from '../framework/view/abstract-view';

export default class AbstractRadioListView extends AbstractView {
  #items = [];
  #handleItemChange = null;

  constructor ({ items, onItemChange }) {
    super();
    this.#items = items;
    this.#handleItemChange = onItemChange;
    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  get items() {
    return this.#items;
  }

  #itemChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleItemChange?.(evt.target.dataset.item);
  };
}
