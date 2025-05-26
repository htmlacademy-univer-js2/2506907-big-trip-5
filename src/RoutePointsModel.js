import API from './api.js';

export default class RoutePointsModel {
  constructor(api) {
    this._api = api;
    this._points = [];
    this._destinations = [];
    this._offers = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = points;
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  async createPoint(point) {
    const newPoint = await this._api.createPoint(point);
    this._points.push(newPoint);
    this._notifyRouteUpdate();
    return newPoint;
  }

  async deletePoint(pointId) {
    await this._api.deletePoint(pointId);
    this._points = this._points.filter(point => point.id !== pointId);
    this._notifyRouteUpdate();
  }

  async updatePoint(updatedPoint) {
    const point = await this._api.updatePoint(updatedPoint.id, updatedPoint);
    this._points = this._points.map((p) => (p.id === point.id ? point : p));
    this._notifyRouteUpdate();
  }
}
