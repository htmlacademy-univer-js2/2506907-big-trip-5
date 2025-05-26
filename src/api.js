export default class API {
  constructor(baseURL, auth) {
    this._baseURL = baseURL;
    this._auth = auth;
  }

  async getPoints() {
    const response = await this._load({url: '/points'});
    return this._adaptPointsToClient(response);
  }

  async getDestinations() {
    const response = await this._load({url: '/destinations'});
    return response;
  }

  async getOffers() {
    const response = await this._load({url: '/offers'});
    return response;
  }

  async updatePoint(pointId, point) {
    const response = await this._load({
      url: `/points/${pointId}`,
      method: 'PUT',
      body: JSON.stringify(this._adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return this._adaptPointToClient(response);
  }

  async _load({url, method = 'GET', body = null}) {
    const response = await fetch(`${this._baseURL}${url}`, {
      method,
      headers: new Headers({
        'Authorization': this._auth,
        'Content-Type': 'application/json'
      }),
      body
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    return await response.json();
  }

  _adaptPointsToClient(points) {
    return points.map(this._adaptPointToClient);
  }

  _adaptPointToClient(point) {
    return {
      id: point.id,
      type: point.type,
      destination: point.destination,
      dateFrom: point.date_from,
      dateTo: point.date_to,
      basePrice: point.base_price,
      isFavorite: point.is_favorite,
      offers: point.offers
    };
  }

  _adaptPointToServer(point) {
    return {
      id: point.id,
      type: point.type,
      destination: point.destination,
      date_from: point.dateFrom,
      date_to: point.dateTo,
      base_price: point.basePrice,
      is_favorite: point.isFavorite,
      offers: point.offers
    };
  }
}
