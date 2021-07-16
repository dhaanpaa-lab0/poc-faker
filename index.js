require('dotenv').config();
const inquirer = require('inquirer');

const faker = require('faker');
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.ATLAS_DB_USER}:${process.env.ATLAS_DB_PASSWORD}@${process.env.ATLAS_DB_CLUSTER}/${process.env.ATLAS_DB_NAME}?retryWrites=true&w=majority`;
const ui = new inquirer.ui.BottomBar();



MongoClient.connect(uri ).then((database) => {
  (async (db) => {
    let collection = await db.collection("names_" + faker.datatype.number());
    inquirer.prompt([
      {
        name: "record_count",
        type: "number",
        message: "Number of Fake Records to Generate",
      },
      {
        name: "reset_coll",
        type: "confirm",
        message: "Reset Collection?",
      }
    ]).then((answers) => {
      if (answers.reset_coll) {

        collection.deleteMany({});

      }
      for (let index = 0; index < answers.record_count; index++) {
        const testCard = {
          index: index,
          name: faker.fake("{{name.firstName}}, {{name.lastName}}"),
          firstName: faker.name.firstName("female"),
          lastName: faker.name.lastName(),
          email: faker.internet.email("curly","smith","example.com")
        };
        collection.insertOne(testCard).then(value => {
          console.log(`Writing Record #${index}`);
        });
      }
    });

  })(database.db(process.env.ATLAS_DB_NAME));
});







