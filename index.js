var faker = require('faker');


for (let index = 0; index < 256; index++) {
  var randomCard = faker.helpers.createCard(); // random contact card containing many properties
  console.log(randomCard)
  
}


