import dayjs from 'dayjs';
import { sort } from './sort.js';

const getDateFormat = (points) => {
  const startDate = dayjs(points.at(0).dateFrom).format('DD MMM');
  const finishDate = dayjs(points.at(-1).dateTo).format('DD MMM');
  return `${startDate} &mdash; ${finishDate}`;
};

const getOffersCost = (currentOffers, offers) => currentOffers
  .reduce((cost, id) => cost + offers
    .find((offer) => offer.id === id)?.price ?? 0, 0);

export const getTripRoute = (points, destinations) => {
  const route = sort(points)
    .map((point) => destinations
      .find((destination) => destination.id === point.destination).name);

  const cities = new Set(route);
  if (cities.size <= 3 && route.at(0) !== route.at(-1) || cities.size === 1) {
    return [...cities].join(' &mdash; ');
  }

  return `${route[0]} &mdash; ... &mdash; ${route[route.length - 1]}`;
};

export const getTripDates = (points) => {
  const sortedPoints = sort(points);
  return sortedPoints.length ? getDateFormat(sortedPoints) : '';
};

export const getTripCost = (points, offers) => points
  .reduce((cost, point) => cost + point.basePrice + getOffersCost(point.offers, offers
    .find((offer) => point.type === offer.type)?.offers), 0);
