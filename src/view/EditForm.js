import AbstractStatefulView from './abstract-stateful-view.js';
import { POINT_TYPES, DESTINATION_ITEMS } from '../const.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditForm extends AbstractStatefulView {
  constructor(point = {}, destinations = [], offers = []) {
    super();
    this._state = EditForm.parsePointToState(point);
    this._destinations = destinations;
    this._offers = offers;
    this.#setInnerHandlers();
  }

  get template() {
    const { type, destination, basePrice, isFavorite, dateFrom, dateTo } = this._state;
    const currentDestination = this._destinations.find((d) => d.id === destination);
    const typeOffers = this._offers.find((offer) => offer.type === type)?.offers || [];

    return `
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${POINT_TYPES.map((pointType) => `
                  <div class="event__type-item">
                    <input id="event-type-${pointType}-1" class="event__type-input visually-hidden"
                      type="radio" name="event-type" value="${pointType}" ${type === pointType ? 'checked' : ''}>
                    <label class="event__type-label event__type-label--${pointType}"
                      for="event-type-${pointType}-1">${pointType}</label>
                  </div>
                `).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination" id="event-destination-1"
              type="text" name="event-destination" value="${currentDestination?.name || ''}"
              list="destination-list-1" required>
            <datalist id="destination-list-1">
              ${this._destinations.map((d) => `
                <option value="${d.name}"></option>
              `).join('')}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="event__label" for="event-start-time-1">Start</label>
            <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YYYY HH:mm')}" required>
            &mdash;
            <label class="event__label" for="event-end-time-1">End</label>
            <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YYYY HH:mm')}" required>
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input event__input--price" id="event-price-1"
              type="number" name="event-price" value="${basePrice}" required>
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>

          <input id="event-favorite-1" class="event__favorite-checkbox visually-hidden"
            type="checkbox" name="event-favorite" ${isFavorite ? 'checked' : ''}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
        </header>

        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${typeOffers.map((offer) => `
                <div class="event__offer-selector">
                  <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}"
                    type="checkbox" name="event-offer"
                    ${offer.includes(offer.id) ? 'checked' : ''}
                    data-offer-id="${offer.id}">
                  <label class="event__offer-label" for="event-offer-${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    +€&nbsp;<span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>
              `).join('')}
            </div>
          </section>

          <section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            ${currentDestination?.description ? `
              <p class="event__destination-description">${currentDestination.description}</p>
            ` : ''}

            ${currentDestination?.pictures?.length ? `
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${currentDestination.pictures.map((pic) => `
                    <img class="event__photo" src="${pic.src}" alt="${pic.description}">
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </section>
        </section>
      </form>
    `;
  }

  #setInnerHandlers() {
    this.element.querySelectorAll('.event__type-input').forEach((input) => {
      input.addEventListener('change', this.#typeChangeHandler);
    });

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });
  }

  _restoreHandlers() {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.submit);
    this.setRollupButtonHandler(this._callback.rollup);
    this.setDeleteClickHandler(this._callback.delete);
    this.setFavoriteChangeHandler(this._callback.favorite);

    flatpickr(this.element.querySelector('#event-start-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
      defaultDate: this._state.dateFrom,
      onChange: this.#onStartDateChange.bind(this),
    });

    flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
      defaultDate: this._state.dateTo,
      onChange: this.#onEndDateChange.bind(this),
    });
  }

  #onStartDateChange(selectedDates) {
    this.updateElement({
      dateFrom: selectedDates[0].toISOString(),
      duration: this._calculateDuration(selectedDates[0], this._state.dateTo)
    });
  }

  #onEndDateChange(selectedDates) {
    this.updateElement({
      dateTo: selectedDates[0].toISOString(),
      duration: this._calculateDuration(this._state.dateFrom, selectedDates[0])
    });
  }

  _calculateDuration(start, end) {
    return dayjs(end).diff(dayjs(start), 'minute');
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this._destinations.find((d) => d.name === evt.target.value);
    if (selectedDestination) {
      this.updateElement({
        destination: selectedDestination.id
      });
    }
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const offerId = evt.target.dataset.offerId;
    const offers = [...this._state.offers];

    if (evt.target.checked) {
      offers.push(offerId);
    } else {
      const index = offers.indexOf(offerId);
      if (index !== -1) {
        offers.splice(index, 1);
      }
    }

    this.updateElement({
      offers
    });
  };

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  setRollupButtonHandler(callback) {
    this._callback.rollup = callback;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.delete = callback;
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
  }

  setFavoriteChangeHandler(callback) {
    this._callback.favorite = callback;
    this.element.querySelector('.event__favorite-checkbox')
      .addEventListener('change', this.#favoriteChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(EditForm.parseStateToPoint(this._state));
  };

  #rollupButtonHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollup();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.delete(EditForm.parseStateToPoint(this._state));
  };

  #favoriteChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.favorite(EditForm.parseStateToPoint(this._state));
  };

  setDeleteClickHandler(callback) {
    this._callback.delete = callback;
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.delete(EditForm.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {
      ...point,
      isFavorite: point.isFavorite || false,
      offers: point.offers || []
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
