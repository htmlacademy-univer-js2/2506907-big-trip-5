// Структура для опций
class Option {
  constructor(type, name, price) {
    this.type = type; // Тип опции
    this.name = name; // Название опции
    this.price = price; // Цена опции
  }
}

// Структура для пункта назначения
class Destination {
  constructor(description, cityName, photos) {
    this.description = description; // Описание
    this.cityName = cityName; // Название города
    this.photos = photos; // Фотографии
  }
}

// Структура для точки маршрута
class RoutePoint {
  constructor(type, destination, options) {
    this.type = type; // Тип точки маршрута
    this.destination = destination; // Пункт назначения
    this.options = options; // Дополнительные опции
  }
}

// Временные данные
const createSampleData = () => {
  const destinations = [
    new Destination('Прекрасный город с богатой историей', 'Москва', ['moscow1.jpg', 'moscow2.jpg']),
    new Destination('Солнечный курорт на побережье', 'Сочи', ['sochi1.jpg', 'sochi2.jpg']),
  ];

  const options = [
    new Option('Транспорт', 'Аренда автомобиля', 5000),
    new Option('Экскурсия', 'Гид по городу', 3000),
  ];

  const routePoints = [
    new RoutePoint('Тип 1', destinations[0], [options[0]]),
    new RoutePoint('Тип 2', destinations[1], [options[1]]),
  ];

  return routePoints;
};

export { createSampleData, RoutePoint, Destination, Option };
