import RoutePointPresenter from './presenter/RoutePointPresenter.js';
import { generateMockRoutePoints } from './MockPoints.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
    this.routePoints = generateMockRoutePoints(5);
    this.routePointPresenters = {};
  }

  init() {
    this.renderRoutePoints();
  }

  renderRoutePoints() {
    this.routePoints.forEach((pointData) => {
      const presenter = new RoutePointPresenter(
        pointData,
        this.handleDataChange.bind(this),
        this.handleEditStart.bind(this)
      );
      presenter.init(this.container);
      this.routePointPresenters[pointData.id] = presenter;
    });
  }

  handleDataChange(updatedPoint) {
    const index = this.routePoints.findIndex((point) => point.id === updatedPoint.id);
    this.routePoints[index] = updatedPoint;
  }

  handleEditStart() {
    Object.values(this.routePointPresenters).forEach((presenter) => {
      presenter.resetView();
    });
  }
}
