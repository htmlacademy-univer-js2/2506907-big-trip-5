import { FormType, POINT_EMPTY } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createEditPointTemplate } from '../template/edit-point-template.js';
import CalendarView from './calendar-view.js';

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormClose = null;
  #handleFormSubmit = null;
  #handleFormDelete = null;
  #calendarFrom = null;
  #calendarTo = null;
  #pointType = null;

  constructor({
    point = POINT_EMPTY,
    destinations,
    offers,
    onClose,
    onSubmit,
    onDelete,
    pointType = FormType.EDITING,
  }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormClose = onClose;
    this.#handleFormSubmit = onSubmit;
    this.#handleFormDelete = onDelete;
    this.#pointType = pointType;
    this._setState(EditPointView.parsePointToState({point}));
    this._restoreHandlers();
  }

  reset = (point) => this.updateElement({ point });

  removeElement = () => {
    super.removeElement();

    if (this.#calendarFrom) {
      this.#calendarFrom.destroy();
      this.#calendarFrom = null;
    }

    if (this.#calendarTo) {
      this.#calendarTo.destroy();
      this.#calendarTo = null;
    }
  };

  _restoreHandlers = () => {
    if (this.#pointType === FormType.EDITING) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);

      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#deleteClickHandler);
    }

    if (this.#pointType === FormType.CREATING) {
      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#closeClickHandler);
    }

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitClickHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.#setCalendars();
  };

  #setCalendars = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    this.#calendarFrom = new CalendarView({
      element: dateFromElement,
      defaultDate: this._state.point.dateFrom,
      maxDate: this._state.point.dateTo,
      onClose: this.#dateFromCloseHandler,
    });

    this.#calendarTo = new CalendarView({
      element: dateToElement,
      defaultDate: this._state.point.dateTo,
      minDate: this._state.point.dateFrom,
      onClose: this.#dateToCloseHandler,
    });
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: [],
      },
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations
      .find((destination) => destination.name === evt.target.value);
    if (!selectedDestination) {
      return;
    }

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestination.id,
      }
    });
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point,
        offers: selectedOffers.map((element) => element.dataset.offerId),
      }
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });

    this.#calendarTo.setMinDate(this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });

    this.#calendarFrom.setMaxDate(this._state.point.dateTo);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(EditPointView.parseStateToPoint(this._state));
  };

  get template() {
    return createEditPointTemplate({
      state: this._state,
      destinations: this.#destinations,
      offers: this.#offers,
      pointType: this.#pointType,
    });
  }

  get isDisabled() {
    return this._state.isDisabled;
  }

  get isSaving() {
    return this._state.isDisabled;
  }

  get isDeleting() {
    return this._state.isDeleting;
  }

  static parsePointToState = ({
    point,
    isDisabled = false,
    isSaving = false,
    isDeleting = false
  }) => ({
    point,
    isDisabled,
    isSaving,
    isDeleting
  });

  static parseStateToPoint = (state) => state.point;
}
