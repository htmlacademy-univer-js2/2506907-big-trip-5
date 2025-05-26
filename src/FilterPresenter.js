import { FilterType } from '../const.js';

export default class FilterPresenter {
  constructor(filterModel, container, routePointsModel) {
    this._filterModel = filterModel;
    this._container = container;
    this._routePointsModel = routePointsModel;
    this._filterView = new FilterView(this._filterModel.getFilter());
  }

  init() {
    this._renderFilter();
    this._updateFilterButtons();
  }

  _renderFilter() {
    this._container.append(this._filterView.getElement());
    this._filterView.setFilterChangeHandler(this._handleFilterChange.bind(this));
  }

  _handleFilterChange(filter) {
    this._filterModel.setFilter(filter);
    this._updateFilterButtons();
    // Обновите точки маршрута
  }

  _updateFilterButtons() {
    const points = this._routePointsModel.getPoints();
    const filterButtons = this._filterView.getFilterButtons();

    filterButtons.forEach((button) => {
      const filterType = button.dataset.filterType;
      const isDisabled = this._isFilterDisabled(filterType, points);
      button.disabled = isDisabled;
    });
  }

  _isFilterDisabled(filterType, points) {
    switch (filterType) {
      case FilterType.FUTURE:
        return points.every(point => new Date(point.dateFrom) < new Date());
      case FilterType.PAST:
        return points.every(point => new Date(point.dateTo) > new Date());
      default:
        return false;
    }
  }
}
