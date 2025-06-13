import { FormType, Mode, UpdateType, UserAction } from '../const';
import { remove, render, replace } from '../framework/render';
import { isEscapeKey } from '../utils/common';
import { isBigDifference } from '../utils/point';
import { EditPointView, PointView } from '../view';

export default class PointPresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onModeChange
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByType(point.type),
      onEditClick: this.#handleEditPointOpen,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinationsModel.getAll(),
      offers: this.#offersModel.getAll(),
      onClose: this.#handleEditPointClose,
      onSubmit: this.#handleEditPointSubmit,
      onDelete: this.#handleEditPointDelete,
      pointType: FormType.EDITING
    });

    if (!prevPointComponent || !prevEditPointComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevEditPointComponent);
    remove(prevPointComponent);
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.reset(this.#point);
      this.#switchToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
    document.removeEventListener('keydown', this.#handleDocumentEscKeydown);
  }

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.shake(this.#resetFormState);
    } else {
      this.#editPointComponent.shake();
    }
  };

  setDeleting = () => {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isDeleting: true
    });
  };

  #switchToEditForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#handleDocumentEscKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #switchToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#handleDocumentEscKeydown);
    this.#mode = Mode.DEFAULT;
  };

  #resetFormState = () => {
    this.#editPointComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });
  };

  #handleDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt) && !this.#editPointComponent.isDisabled) {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#switchToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite,
      }
    );
  };

  #handleEditPointOpen = () => {
    this.#switchToEditForm();
  };

  #handleEditPointClose = () => {
    if (!this.#editPointComponent.isDisabled) {
      this.#editPointComponent.reset(this.#point);
      this.#switchToPoint();
    }
  };

  #handleEditPointSubmit = (point) => {
    const isMinor = isBigDifference(point, this.#point);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinor ? UpdateType.MINOR : UpdateType.PATCH,
      point
    );

    if (!this.#editPointComponent.isDisabled) {
      this.#switchToPoint();
    }
  };

  #handleEditPointDelete = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
