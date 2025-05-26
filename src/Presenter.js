import RoutePointPresenter from './presenter/RoutePointPresenter.js';
import Sorting from '../view/Sorting.js';
import { generateMockRoutePoints } from '../mock/MockPoints.js';
import RoutePointsModel from './RoutePointsModel.js';
import FilterModel from './FilterModel.js';

export default class Presenter {
  constructor(container, routePointsModel, filterModel) {
    this.container = container;
    this.routePoints = generateMockRoutePoints(10);
    this.routePointPresenters = new Map();
    this.currentSortType = 'day';
    this.sortingComponent = new Sorting(this.currentSortType);
    this.handleViewAction = this.handleViewAction.bind(this);
    this.handleModelEvent = this.handleModelEvent.bind(this);
    this._routePointsModel = routePointsModel;
    this._filterModel = filterModel;
  }

  init() {
    this.renderSorting();
    this.renderRoutePointsList();
    this._renderRoutePoints();
    this._filterModel.setFilterChangeHandler(this._handleFilterChange.bind(this));
  }

  renderSorting() {
    this.sortingComponent.setSortTypeChangeHandler(this.handleSortTypeChange.bind(this));
    this.container.prepend(this.sortingComponent.getElement());
  }

  renderRoutePointsList() {
    this.clearRoutePointsList();
    this.renderRoutePoints(this.sortRoutePoints(this.routePoints));
  }

  renderRoutePoints(points) {
    points.forEach((point) => this.renderRoutePoint(point));
  }

  renderRoutePoint(point) {
    const pointPresenter = new RoutePointPresenter(
      this.container,
      this.handleViewAction,
      this.handleModeChange.bind(this)
    );
    pointPresenter.init(point);
    this.routePointPresenters.set(point.id, pointPresenter);
  }

  clearRoutePointsList() {
    this.routePointPresenters.forEach((presenter) => presenter.destroy());
    this.routePointPresenters.clear();
  }

  handleSortTypeChange(sortType) {
    if (this.currentSortType === sortType) {
      return;
    }

    this.currentSortType = sortType;
    this.renderRoutePointsList();
  }

  sortRoutePoints(points) {
    const sortedPoints = [...points];

    switch (this.currentSortType) {
      case 'time':
        return sortedPoints.sort((a, b) => b.duration - a.duration);
      case 'price':
        return sortedPoints.sort((a, b) => b.basePrice - a.basePrice);
      case 'day':
      default:
        return sortedPoints.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    }
  }

  handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case 'UPDATE_POINT':
        this.routePoints = this.routePoints.map((point) =>
          point.id === update.id ? update : point
        );
        this.routePointPresenters.get(update.id).init(update);
        break;
      case 'TOGGLE_FAVORITE':
        this.routePoints = this.routePoints.map((point) =>
          point.id === update.id ? { ...point, isFavorite: !point.isFavorite } : point
        );
        this.routePointPresenters.get(update.id).init(
          this.routePoints.find((point) => point.id === update.id)
        );
        break;
    }
  }

  handleModelEvent(updateType, data) {
    switch (updateType) {
      case 'PATCH':
        this.routePointPresenters.get(data.id).init(data);
        break;
      case 'MINOR':
        this.clearRoutePointsList();
        this.renderRoutePointsList();
        break;
      case 'MAJOR':
        this.clearRoutePointsList();
        this.renderRoutePointsList();
        break;
    }
  }

  handleModeChange() {
    this.routePointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleFilterChange() {
    this._renderRoutePoints();
  }

  _renderRoutePoints() {
    const points = this._getFilteredPoints();
  }

  _getFilteredPoints() {
    const filter = this._filterModel.getFilter();
    const points = this._routePointsModel.getPoints();
    switch (filter) {
      case 'all':
        return points;
      case 'future':
        return points.filter(point => new Date(point.dateFrom) > new Date());
      case 'past':
        return points.filter(point => new Date(point.dateTo) < new Date());
      default:
        return points;
    }
  }

  addPoint(point) {
    this._routePointsModel.addPoint(point);
    this._renderRoutePoints();
  }

  deletePoint(pointId) {
    this._routePointsModel.deletePoint(pointId);
    this._renderRoutePoints();
  }

  setNewEventHandler(callback) {
    this._callback.newEvent = callback;
    this.element.querySelector('.new-event-btn')
      .addEventListener('click', this.#newEventHandler);
  }

  #newEventHandler = () => {
    this._callback.newEvent();
  };

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
  }
}
