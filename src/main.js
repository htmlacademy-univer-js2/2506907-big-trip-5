import API from './api.js';
import RoutePointsModel from './model/RoutePointsModel.js';
import FilterModel from './model/FilterModel.js';
import RoutePresenter from './presenter/RoutePresenter.js';
import FilterPresenter from './presenter/FilterPresenter.js';

const AUTHORIZATION = '';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const api = new API(END_POINT, AUTHORIZATION);
const routePointsModel = new RoutePointsModel();
const filterModel = new FilterModel();

const routePresenter = new RoutePresenter(routePointsModel, filterModel, document.querySelector('.trip-events'));
const filterPresenter = new FilterPresenter(filterModel, document.querySelector('.filter-container'));

const loadData = async () => {
  try {
    const points = await api.getPoints();
    routePointsModel.setPoints(points);
    const destinations = await api.getDestinations();
    routePointsModel.setDestinations(destinations);
    const offers = await api.getOffers();
    routePointsModel.setOffers(offers);
    routePresenter.init();
    filterPresenter.init();
  } catch (error) {
    console.error('Failed to load data:', error);

    const noDataMessage = document.createElement('div');
    noDataMessage.textContent = 'Failed to load data. Please try again later.';
    document.querySelector('.trip-events').append(noDataMessage);
  }
};

loadData();
