export default class Sorting {
  constructor() {
    this.element = this.createElement();
    this.currentSortType = 'day';
  }

  createElement() {
    const container = document.createElement('div');
    container.className = 'sorting';
    container.innerHTML = `
      <h2>Сортировка</h2>
      <div class="sorting__types">
        <button
          class="sorting__type ${this.currentSortType === 'day' ? 'sorting__type--active' : ''}"
          data-sort-type="day"
        >
          По дате
        </button>
        <button
          class="sorting__type ${this.currentSortType === 'time' ? 'sorting__type--active' : ''}"
          data-sort-type="time"
        >
          По времени
        </button>
        <button
          class="sorting__type ${this.currentSortType === 'price' ? 'sorting__type--active' : ''}"
          data-sort-type="price"
        >
          По цене
        </button>
      </div>
    `;
    return container;
  }

  setSortTypeChangeHandler(callback) {
    this.element.addEventListener('click', (evt) => {
      const sortType = evt.target.dataset.sortType;

      if (!sortType || sortType === this.currentSortType) {
        return;
      }

      this.currentSortType = sortType;
      callback(sortType);
      this.updateActiveClass();
    });
  }

  updateActiveClass() {
    const buttons = this.element.querySelectorAll('.sorting__type');
    buttons.forEach((button) => {
      button.classList.toggle(
        'sorting__type--active',
        button.dataset.sortType === this.currentSortType
      );
    });
  }

  render() {
    return this.element;
  }
}
