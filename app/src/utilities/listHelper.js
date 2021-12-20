export const sortByName = (a, b) => {
  var nameA = a.toUpperCase(); // ignore upper and lowercase
  var nameB = b.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

export const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const uniqueObject = (value, index, self, field) => {
  return self.findIndex((e) => e[field] === value[field]) === index;
};
