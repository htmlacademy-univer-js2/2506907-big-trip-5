import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class CalendarView {
  #commonConfig = {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    locale: {
      firstDayOfWeek: 1,
    },
    'time_24hr': true,
  };

  #calendar = null;

  constructor ({
    element,
    defaultDate,
    minDate = null,
    maxDate = null,
    onClose
  }) {
    this.#calendar = flatpickr(element, {
      ...this.#commonConfig,
      defaultDate,
      minDate,
      maxDate,
      onClose,
    });
  }

  destroy = () => {
    this.#calendar.destroy();
  };

  setMaxDate = (date) => {
    this.#calendar.set('maxDate', date);
  };

  setMinDate = (date) => {
    this.#calendar.set('minDate', date);
  };
}
