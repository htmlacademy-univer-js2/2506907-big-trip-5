import RoutePoint from '../view/RoutePoint.js';
import EditForm from '../view/EditForm.js';
import { render, remove } from '../utils/render.js';
import { formatDate } from '../utils/date.js';
import { FilterType } from '../const.js';

export default class RoutePresenter {
  constructor(routePointsModel, filterModel, container) {
    this._routePointsModel = routePointsModel;
    this._filterModel = filterModel;
    this._container = container;
    this._routePointPresenters = new Map();
    this._totalCost = 0;
  }

  init() {
    this._renderRoutePoints();
    this._updateRouteInfo();
  }

  _renderRoutePoints() {
    this._clearRoutePointsList();
    const points = this._routePointsModel.getPoints();

    if (points.length === 0) {
      this._renderNoPointsMessage();
      return;
    }

    points.forEach((point) => this._renderRoutePoint(point));
    this._updateRouteInfo();
  }

  _renderRoutePoint(point) {
    const pointPresenter = new RoutePoint(
      point,
      this._handleViewAction.bind(this),
      this._handleEditStart.bind(this)
    );
    pointPresenter.init(this._container);
    this._routePointPresenters.set(point.id, pointPresenter);
  }

  _clearRoutePointsList() {
    this._routePointPresenters.forEach((presenter) => presenter.destroy());
    this._routePointPresenters.clear();
  }

  _renderNoPointsMessage() {
    const noPointsMessage = document.createElement('div');
    noPointsMessage.textContent = 'No points found';
    this._container.append(noPointsMessage);
  }

  _updateRouteInfo() {
    const points = this._routePointsModel.getPoints();
    this._updateRouteDates(points);
    this._updateRouteCost(points);
    this._updateRouteNames(points);
  }

  _updateRouteDates(points) {
    if (points.length === 0) {
      document.querySelector('.trip-dates').textContent = '';
      return;
    }
    const startDate = new Date(Math.min(...points.map(point => new Date(point.dateFrom))));
    const endDate = new Date(Math.max(...points.map(point => new Date(point.dateTo))));
    document.querySelector('.trip-dates').textContent = `${formatDate(startDate)} — ${formatDate(endDate)}`;
  }

  _updateRouteCost(points) {
    this._totalCost = points.reduce((total, point) => {
      const offersCost = point.offers.reduce((sum, offerId) => {
        const offer = this._offers.find(o => o.id === offerId);
        return sum + (offer ? offer.price : 0);
      }, 0);
      return total + point.basePrice + offersCost;
    }, 0);
    document.querySelector('.trip-cost').textContent = `€${this._totalCost}`;
  }

  _updateRouteNames(points) {
    const routeNames = points.map(point => point.destination.name);
    const uniqueRouteNames = [...new Set(routeNames)];

    let routeDisplay;
    if (uniqueRouteNames.length > 3) {
      routeDisplay = `${uniqueRouteNames[0]} ... ${uniqueRouteNames[uniqueRouteNames.length - 1]}`;
    } else {
      routeDisplay = uniqueRouteNames.join(' — ');
    }
    document.querySelector('.trip-route').textContent = routeDisplay;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case 'UPDATE_POINT':
        this._routePointsModel.updatePoint(update);
        this._routePointPresenters.get(update.id).init(update);
        break;
      case 'DELETE_POINT':
        this._routePointsModel.deletePoint(update.id);
        this._routePointPresenters.get(update.id).destroy();
        this._routePointPresenters.delete(update.id);
        break;
      case 'ADD_POINT':
        this._routePointsModel.createPoint(update);
        this._renderRoutePoint(update);
        break;
    }
    this._updateRouteInfo();
  }

  _handleEditStart() {
    this._routePointPresenters.forEach((presenter) => presenter.resetView());
  }
}
