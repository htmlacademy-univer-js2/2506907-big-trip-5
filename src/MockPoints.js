function generateMockRoutePoints(count) {
  const mockPoints = [];
  const types = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive'];
  const cities = ['Moscow', 'Paris', 'Berlin', 'Tokyo', 'New York'];

  for (let i = 0; i < count; i++) {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() + i);

    const dateTo = new Date(dateFrom);
    dateTo.setHours(dateTo.getHours() + Math.floor(Math.random() * 10) + 1);

    mockPoints.push({
      id: `point-${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      destination: {
        cityName: cities[Math.floor(Math.random() * cities.length)],
        description: `Description for ${cities[Math.floor(Math.random() * cities.length)]}`
      },

      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      basePrice: Math.floor(Math.random() * 1000) + 100,
      isFavorite: Math.random() > 0.5,
      duration: dateTo.getTime() - dateFrom.getTime()
    });
  }
  return mockPoints;
}

generateMockRoutePoints();
