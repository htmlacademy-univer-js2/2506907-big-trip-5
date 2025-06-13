import { RenderPosition, remove, render, replace } from '../framework/render';
import { getTripCost, getTripDates, getTripRoute } from '../utils/trip-info';
import { TripInfoView } from '../view';

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #container = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderTripInfo();
    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  #renderTripInfo = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;

    const points = this.#pointsModel.getAll();
    const destinations = this.#destinationsModel.getAll();
    const offers = this.#offersModel.getAll();

    this.#tripInfoComponent = new TripInfoView({
      route: getTripRoute(points, destinations),
      dates: getTripDates(points),
      cost: getTripCost(points, offers),
      isEmpty: !points.length,
    });

    if (!prevTripInfoComponent) {
      render(
        this.#tripInfoComponent,
        this.#container,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleModelChange = () => {
    this.#renderTripInfo();
  };
}
