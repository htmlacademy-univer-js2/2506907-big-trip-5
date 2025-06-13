import { EmptyListMessage } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { createEmptyListTemplate } from '../template/empty-list-template.js';

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate({message: EmptyListMessage[this.#filterType]});
  }
}
