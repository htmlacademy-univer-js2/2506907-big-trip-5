export default class RoutePoint {
  constructor(data) {
    this.data = data;
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.className = 'route-point';
    element.innerHTML = `
      <h3>${this.data.destination.cityName}</h3>
      <p>${this.data.type}</p>
      <button class="favorite-button ${this.data.isFavorite ? 'active' : ''}">
        ★
      </button>
      <button class="edit-button">Редактировать</button>
    `;
    return element;
  }

  render() {
    return this.element;
  }
}
