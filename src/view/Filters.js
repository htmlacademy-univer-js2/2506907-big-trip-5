// src/view/Filters.js
export default class Filters {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const container = document.createElement('div');
    container.className = 'filters';
    container.innerHTML = `
          <h2>Фильтры</h2>
          <input type="text" placeholder="Поиск..." />
          <button>Применить</button>
      `;
    return container;
  }

  render() {
    return this.element;
  }
}
