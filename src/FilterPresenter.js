import FilterView from '../view/FilterView.js';
export default class FilterPresenter {
  constructor(filterModel, container) {
    this._filterModel = filterModel;
    this._container = container;
    this._filterView = new FilterView(this._filterModel.getFilter());
  }

  init() {
    this._renderFilter();
  }

  _renderFilter() {
    this._container.append(this._filterView.getElement());
    this._filterView.setFilterChangeHandler(this._handleFilterChange.bind(this));
  }

  _handleFilterChange(filter) {
    this._filterModel.setFilter(filter);

  }
}
