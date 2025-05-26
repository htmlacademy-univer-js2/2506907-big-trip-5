export default class AbstractStatefulView {
  constructor() {
    if (new.target === AbstractStatefulView) {
      throw new Error('Can\'t instantiate AbstractStatefulView, only concrete one.');
    }
    this._element = null;
    this._state = {};
  }

  get element() {
    if (!this._element) {
      this._element = this.createElement();
    }
    return this._element;
  }

  get template() {
    throw new Error('Abstract method not implemented: template');
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    return element.firstElementChild || element;
  }

  updateElement(update) {
    if (!update) {
      return;
    }

    this._state = Object.assign({}, this._state, update);
    const prevElement = this._element;
    const parent = prevElement.parentElement;
    this._element = null;

    const newElement = this.element;
    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }

  _restoreHandlers() {
    throw new Error('Abstract method not implemented: _restoreHandlers');
  }
}
