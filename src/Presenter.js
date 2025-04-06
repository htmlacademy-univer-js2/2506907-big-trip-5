import Filters from './Filters.js';
import Sorting from './Sorting.js';
import CreateForm from './CreateForm.js';
import EditForm from './EditForm.js';
import RoutePoint from './RoutePoint.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
  }

  init() {
    const editForm = new EditForm();
    this.container.appendChild(editForm.render());
    const createForm = new CreateForm();
    this.container.appendChild(createForm.render());

    const sorting = new Sorting();
    this.container.appendChild(sorting.render());

    const filters = new Filters();
    this.container.appendChild(filters.render());

    for (let i = 0; i < 3; i++) {
      const routePoint = new RoutePoint(`Точка маршрута ${i + 1}`);
      this.container.appendChild(routePoint.render());
    }
  }
}
