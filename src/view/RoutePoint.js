// src/view/RoutePoint.js
export default class RoutePoint {
  constructor(data) {
    this.data = data;
  }

  get template() {
    if (this.points.length === 0) {
      return `
        <p>
          Добавьте первую точку маршрута!
        </p>`;
    }

    return this.points.map((point) =>
      `<div class="route-point">
            <h3>${point.type}</h3>
            <p>${point.destination.cityName}: ${point.destination.description}</p>
            <button class="edit-button">Edit</button>
      </div>`
    ).join('');
  }
}
