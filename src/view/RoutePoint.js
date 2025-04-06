// src/view/RoutePoint.js
export default class RoutePoint {
  constructor(data) {
    this.data = data;
  }

  get template() {
    return `
        <div class="route-point">
            <h3>${this.data.type}</h3>
            <p>${this.data.destination.cityName}: ${this.data.destination.description}</p>
            <button class="edit-button">Edit</button>
        </div>
    `;
  }
}
