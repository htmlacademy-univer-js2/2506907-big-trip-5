<<<<<<< HEAD
function generateMockRoutePoints(count) {
  const mockPoints = [];
  for (let i = 0; i < count; i++) {
    mockPoints.push({
      id: `point-${i}`,
      type: ['taxi', 'bus', 'train'][Math.floor(Math.random() * 3)],
      destination: {
        cityName: `City ${i + 1}`,
        description: `Description for City ${i + 1}`
      },
      isFavorite: Math.random() > 0.5
    });
=======
import Destination from './Model.js';
import RoutePoint from './view/RoutePoint.js';

function generateMockRoutePoints(count) {
  const mockPoints = [];
  for (let i = 0; i < count; i++) {
    const destination = new Destination(`City ${i + 1}, Description for City ${i + 1}`);
    const type = ['taxi', 'bus', 'train'][Math.floor(Math.random() * 3)];
    mockPoints.push(new RoutePoint(type, destination));
>>>>>>> upstream/master
  }
  return mockPoints;
}

generateMockRoutePoints();
