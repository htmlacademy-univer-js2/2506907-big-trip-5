import { capitalize } from '../utils/common';

export const createFilterTemplate = ({filters}) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(({ type, isDisabled, isChecked }) => `
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          data-item="${type}"
          ${isDisabled ? 'disabled' : ''}
          ${isChecked ? 'checked' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">
          ${capitalize(type)}
        </label>
      </div>
    `).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
