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

  }
  return mockPoints;
}

generateMockRoutePoints();
