require('dotenv').config();

const faker = require('faker');


for (let index = 0; index < 256; index++) {
  const testCard = {
    name: faker.name.firstName('female') + ", " + faker.name.lastName('female')
  };

  console.log(testCard)

}


