import Filters from './view/Filters.js';
import Sorting from './view/Sorting.js';
import CreateForm from './view/CreateForm.js';
import EditForm from './view/EditForm.js';
import RoutePoint from './view/RoutePoint.js';
import { createSampleData } from './Model.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
    this.routePoints = createSampleData(); // Получение временных данных
  }

  render() {
    const filters = new Filters();
    const sorting = new Sorting();
    const createForm = new CreateForm();

    this.container.appendChild(createForm.element);
    this.container.appendChild(filters.element);
    this.container.appendChild(sorting.element);

    this.routePoints.forEach((pointData) => {
      const routePoint = new RoutePoint(pointData);
      this.container.appendChild(routePoint.element);
    });

    const editForm = new EditForm(this.routePoints[0]);
    this.container.appendChild(editForm.element);
  }
}
