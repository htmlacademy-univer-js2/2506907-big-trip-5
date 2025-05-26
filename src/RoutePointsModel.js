export default class RoutePointsModel {
  constructor() {
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = points;
  }

  addPoint(point) {
    this._points.push(point);
  }

  updatePoint(updatedPoint) {
    const index = this._points.findIndex(point => point.id === updatedPoint.id);
    if (index !== -1) {
      this._points[index] = updatedPoint;
    }
  }

  deletePoint(pointId) {
    this._points = this._points.filter(point => point.id !== pointId);
  }
}
