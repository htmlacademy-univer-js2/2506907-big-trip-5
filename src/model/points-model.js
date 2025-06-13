import { UpdateType } from '../const';
import Observable from '../framework/observable';
import { adaptToClient, adaptToServer } from '../utils/adapter';
import { updateItem } from '../utils/common';

export default class PointsModel extends Observable {
  #service = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({ service, destinationsModel, offersModel }) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  getAll() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init(),
      ]);

      const points = await this.#service.getPoints();
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {});
    } catch (error) {
      this.#points = [];
      this._notify(UpdateType.INIT, { error });
    }
  }

  async add(type, point) {
    try {
      const adaptedToServerPoint = adaptToServer(point);
      const newPoint = await this.#service.addPoint(adaptedToServerPoint);
      const adaptedToClientPoint = adaptToClient(newPoint);

      this.#points.push(adaptedToClientPoint);
      this._notify(type, adaptedToClientPoint);
    } catch {
      throw new Error('Can\'t add point');
    }
  }

  async update(type, point) {
    try {
      const adaptedToServerPoint = adaptToServer(point);
      const updatedPoint = await this.#service.updatePoint(adaptedToServerPoint);
      const adaptedToClientPoint = adaptToClient(updatedPoint);

      this.#points = updateItem(this.#points, adaptedToClientPoint);
      this._notify(type, adaptedToClientPoint);
    } catch {
      throw new Error('Can\'t update point');
    }
  }

  async delete(type, deletedPoint) {
    try {
      const adaptedToServerPoint = adaptToServer(deletedPoint);
      await this.#service.deletePoint(adaptedToServerPoint);
      this.#points = this.#points.filter((point) => point.id !== deletedPoint.id);
      this._notify(type);
    } catch {
      throw new Error('Can\'t delete point');
    }
  }
}
