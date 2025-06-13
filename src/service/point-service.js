import { Method } from '../const';
import ApiService from '../framework/api-service';

export default class PointService extends ApiService {
  async fetchData ({ url }) {
    const response = await this._load({ url });
    return ApiService.parseResponse(response);
  }

  getDestinations() {
    return this.fetchData({ url: 'destinations' });
  }

  getOffers() {
    return this.fetchData({ url: 'offers' });
  }

  getPoints() {
    return this.fetchData({ url: 'points' });
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    return ApiService.parseResponse(response);
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    return ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }
}
