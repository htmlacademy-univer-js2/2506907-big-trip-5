export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const getLastWord = (str) => str.split(' ').pop().toLowerCase();
export const isEscapeKey = (evt) => evt.key === 'Escape';
export const updateItem = (items, update) =>
  items.map((item) => item.id === update.id ? update : item);
