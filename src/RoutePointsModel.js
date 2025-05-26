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

  async updatePoint(updatedPoint) {
    const point = await this._api.updatePoint(updatedPoint.id, updatedPoint);
    this._points = this._points.map((p) => (p.id === point.id ? point : p));
  }
}
