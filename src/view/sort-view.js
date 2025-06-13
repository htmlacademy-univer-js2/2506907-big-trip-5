import { createSortTemplate } from '../template/sort-template.js';
import AbstractRadioListView from './abstract-radio-list-view.js';

export default class SortView extends AbstractRadioListView {
  get template() {
    return createSortTemplate({ sorts: this.items });
  }
}
