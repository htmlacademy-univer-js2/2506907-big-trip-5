// src/view/RoutePoint.js
export default class RoutePoint {
  constructor(data) {
      this.data = data; // Данные точки маршрута
      this.element = this.createElement();
  }

  createElement() {
    const div = document.createElement('div');
    div.innerHTML = `
        <h3>${this.data.type}</h3>
        <p>${this.data.destination.cityName}: ${this.data.destination.description}</p>
        <h4>Опции:</h4>
        <ul>
            ${this.data.options.map(option => <li>${option.name} - ${option.price} руб.</li>).join('')}
        </ul>
    `;
    return div;
  }
}
