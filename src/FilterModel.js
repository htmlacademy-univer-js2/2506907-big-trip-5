export default class FilterModel {
  constructor() {
    this._activeFilter = 'all';
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilter(filter) {
    this._activeFilter = filter;
  }
}
