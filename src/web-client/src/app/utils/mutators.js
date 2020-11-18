/* Update an object in state after field changes */

export const updateObjectInArray = (data = [], newObject = {}, idkey = '_id') => {
  let objectExists = false;
  const newArray = data.map((item) => {
    if (newObject && (item[idkey] === newObject[idkey])) {
      objectExists = true;
      return { ...item, ...newObject };
    }
    return item;
  });

  if (!objectExists) {
    return [...data, newObject];
  }

  return newArray;
};

/* Delete an object from state array */

export const deleteObjectFromArray = (data = [], id, idkey = '_id') => {
  const filteredArray = data.filter((obj) => (
    obj[idkey] !== id
  ));

  return filteredArray;
};

/* Update an object */

export const updateObject = (oldObject = {}, newObject = {}) => ({
  ...oldObject, 
  ...newObject, 
});
