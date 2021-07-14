require('dotenv').config();

const faker = require('faker');
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.ATLAS_DB_USER}:${process.env.ATLAS_DB_PASSWORD}@${process.env.ATLAS_DB_CLUSTER}/${process.env.ATLAS_DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
  const collection = client.db("test").collection("names_" + faker.random.number());
  // perform actions on the collection object



  for (let index = 0; index < 256; index++) {
    const testCard = {
      index: index,
      name: faker.fake("{{name.firstName}}, {{name.lastName}}"),
      firstName: faker.name.firstName("female"),
      lastName: faker.name.lastName(),
      email: faker.internet.email("curly","smith","example.com")
    };
    await collection.insertOne(testCard);
    console.log(testCard)

  }
  await client.close();
});





