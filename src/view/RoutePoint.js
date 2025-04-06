// src/view/RoutePoint.js
export default class RoutePoint {
  constructor(name) {
    this.name = name;
    this.element = this.createElement();
  }

  createElement() {
    const point = document.createElement('div');
    point.className = 'route-point';
    point.innerHTML = `<p>${this.name}</p>`;
    return point;
  }

  render() {
    return this.element;
  }
}
