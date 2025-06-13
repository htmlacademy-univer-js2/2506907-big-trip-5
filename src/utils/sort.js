import { SortType } from '../const';
import {
  getPointsDateDifference,
  getPointsDurationDifference,
  getPointsPriceDifference,
} from './point';

const sortMethod = {
  [SortType.DAY]: (points) => points.sort(getPointsDateDifference),
  [SortType.PRICE]: (points) => points.sort(getPointsPriceDifference),
  [SortType.TIME]: (points) => points.sort(getPointsDurationDifference),
};

export const sort = (points, sortType = SortType.DAY) => {
  if (!sortMethod[sortType]) {
    throw new Error(`Sort by ${sortType} is not implemented`);
  }
  return sortMethod[sortType](points);
};
