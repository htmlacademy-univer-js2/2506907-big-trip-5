import { PointFilters } from '../const';
import { isPointFuture, isPointPresent, isPointPast } from './point';

export const filterMethod = {
  [PointFilters.EVERYTHING]: (points) => points.slice(),
  [PointFilters.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [PointFilters.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [PointFilters.PAST]: (points) => points.filter((point) => isPointPast(point)),
};
