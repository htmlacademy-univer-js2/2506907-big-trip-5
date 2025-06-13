import { DestinationsModel, FilterModel, OffersModel, PointsModel } from './model';
import { FilterPresenter, NewPointButtonPresenter, TripInfoPresenter, TripPresenter } from './presenter';
import PointService from './service/point-service.js';

const tripMainElement = document.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');

const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic QwertyZXC';

const service = new PointService(END_POINT, AUTHORIZATION);

const destinationsModel = new DestinationsModel({ service });
const offersModel = new OffersModel({ service });
const pointsModel = new PointsModel({ service, destinationsModel, offersModel });
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter({
  container: tripMainElement,
  pointsModel,
  destinationsModel,
  offersModel,
});

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: tripMainElement,
});

const filterPresenter = new FilterPresenter({
  container: tripControlsElement,
  pointsModel,
  filterModel,
});

const tripPresenter = new TripPresenter({
  container: tripEventsElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonPresenter,
});

newPointButtonPresenter.init({
  onClick: tripPresenter.handleNewPointClick,
});
filterPresenter.init();
tripPresenter.init();
pointsModel.init();
tripInfoPresenter.init();
