import { createFilterTemplate } from '../template/filter-template.js';
import AbstractRadioListView from './abstract-radio-list-view.js';

export default class FilterView extends AbstractRadioListView {
  get template() {
    return createFilterTemplate({ filters: this.items });
  }
}
