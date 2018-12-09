// es6

// arguments object is no longer bound with arrow funciton
const add = (a, b) => {
  // console.log(arguments)
  return a + 1;
};

console.log(add(55, 1))

// this keyword - no longer bound
const user = {
  name: 'Jebie',
  cities: ['Masbate', 'Cebu', 'Mandaue'],
  printPlacesLived() { // <-- es6 syntax
    return this.cities.map((city) => city + ' has lived in ' + city);
  }
};

user.printPlacesLived();
