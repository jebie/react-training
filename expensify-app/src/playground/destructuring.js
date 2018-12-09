console.log('destructuring..');

//
// destructuring object
//

const person = {
  name: 'jebie',
  age: 12,
  location: {
    city: 'mandaue',
    temp: 1
  }
};

// aliasing and assign default value
const { name: firstName = 'Anonymous', age } = person;
console.log(`Name ${firstName}, Age ${age}`);


const { city, temp: temperature } = person.location;
console.log(`Temp: ${temperature}, city: ${city}`);


//
// destructuring array
//
const item = ['Coffee (hot)', '$1', '$2', '$3'];
const [coffee, _, price = '$2.0'] = item;
console.log(`Coffee ${coffee}, price ${price}`);
