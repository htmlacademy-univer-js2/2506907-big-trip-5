// src/view/Sorting.js
export default class Sorting {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const container = document.createElement('div');
    container.className = 'sorting';
    container.innerHTML = `
          <h2>Сортировка</h2>
          <select>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
          </select>
      `;
    return container;
  }

  render() {
    return this.element;
  }
}
