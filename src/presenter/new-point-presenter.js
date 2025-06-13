import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, FormType } from '../const.js';
import { EditPointView } from '../view';
import { isEscapeKey } from '../utils/common';

export default class NewPointPresenter {
  #container = null;
  #newPointComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onDestroy,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (!this.#newPointComponent) {
      this.#newPointComponent = new EditPointView({
        destinations: this.#destinationsModel.getAll(),
        offers: this.#offersModel.getAll(),
        onSubmit: this.#handleFormSubmit,
        onClose: this.#handleFormClose,
        pointType: FormType.CREATING
      });

      render(this.#newPointComponent, this.#container, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#handleDocumentEscKeydown);
    }
  }

  destroy = ({ isCanceled = true } = {}) => {
    if (this.#newPointComponent) {
      remove(this.#newPointComponent);
      this.#newPointComponent = null;
      document.removeEventListener('keydown', this.#handleDocumentEscKeydown);

      this.#handleDestroy({ isCanceled });
    }
  };

  setSaving = () => {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    this.#newPointComponent.shake(this.#resetFormState);
  };

  #resetFormState = () => {
    this.#newPointComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleFormClose = () => {
    this.destroy();
  };

  #handleDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
