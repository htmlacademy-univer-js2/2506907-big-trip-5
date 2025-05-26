import RoutePoint from '../view/RoutePoint.js';
import EditForm from '../view/EditForm.js';

export default class RoutePointPresenter {
  constructor(pointData, onDataChange, onEditStart) {
    this.pointData = pointData;
    this.onDataChange = onDataChange;
    this.onEditStart = onEditStart;
    this.routePointComponent = new RoutePoint(pointData);
    this.editFormComponent = null;
  }

  init(container) {
    this.render(container);
    this.addEventListeners();
  }

  render(container) {
    container.appendChild(this.routePointComponent.element);
  }

  addEventListeners() {
    this.routePointComponent.element.querySelector('.favorite-button').addEventListener('click', () => {
      this.toggleFavorite();
    });

    this.routePointComponent.element.querySelector('.edit-button').addEventListener('click', () => {
      this.openEditForm();
    });
  }

  toggleFavorite() {
    this.pointData.isFavorite = !this.pointData.isFavorite;
    this.onDataChange(this.pointData);
    this.rerender();
  }

  openEditForm() {
    if (this.onEditStart) {
      this.onEditStart();
    }
    this.editFormComponent = new EditForm(this.pointData);
    this.routePointComponent.element.replaceWith(this.editFormComponent.element);
    this.setEditFormListeners();
  }

  setEditFormListeners() {
    this.editFormComponent.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.closeEditForm();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeEditForm();
      }
    });
  }

  closeEditForm() {
    this.editFormComponent.element.replaceWith(this.routePointComponent.element);
    this.editFormComponent = null;
  }

  resetView() {
    if (this.editFormComponent) {
      this.closeEditForm();
    }
  }

  rerender() {
    const oldElement = this.routePointComponent.element;
    this.routePointComponent = new RoutePoint(this.pointData);
    oldElement.replaceWith(this.routePointComponent.element);
    this.addEventListeners();
  }

  destroy() {
    if (this.editFormComponent) {
      this.editFormComponent.element.remove();
    }
    this.routePointComponent.element.remove();
  }
}
