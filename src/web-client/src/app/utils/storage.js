export const saveItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
};

export const deleteItem = (key) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
