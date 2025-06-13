import { render } from '../framework/render';
import NewPointButtonView from '../view/new-point-button-view';

export default class NewPointButtonPresenter {
  #container = null;
  #button = null;

  constructor({ container }) {
    this.#container = container;
  }

  init({ onClick }) {
    this.#button = new NewPointButtonView({ onClick });
    render(this.#button, this.#container);
  }

  disableButton() {
    this.#button.setDisabled(true);
  }

  enableButton() {
    this.#button.setDisabled(false);
  }
}
