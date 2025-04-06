import Destination from './Model.js';
import RoutePoint from './view/RoutePoint.js';

function generateMockRoutePoints(count) {
  const mockPoints = [];
  for (let i = 0; i < count; i++) {
    const destination = new Destination(`City ${i + 1}, Description for City ${i + 1}`);
    const type = ['taxi', 'bus', 'train'][Math.floor(Math.random() * 3)];
    mockPoints.push(new RoutePoint(type, destination));
  }
  return mockPoints;
}

generateMockRoutePoints();
