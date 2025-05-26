import RoutePointPresenter from './presenter/RoutePointPresenter.js';
import Sorting from '../view/Sorting.js';
import { generateMockRoutePoints } from '../mock/MockPoints.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
    this.routePoints = generateMockRoutePoints(10); // Генерируем 10 точек маршрута
    this.routePointPresenters = new Map();
    this.currentSortType = 'day';
    this.sortingComponent = new Sorting(this.currentSortType);
    this.handleViewAction = this.handleViewAction.bind(this);
    this.handleModelEvent = this.handleModelEvent.bind(this);
  }

  init() {
    this.renderSorting();
    this.renderRoutePointsList();
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
}
