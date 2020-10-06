const path = require('path');
const { Sequelize } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'test.sqlite')
})

async function  testDb() {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}


module.exports = {
    db,
    testDb
};


