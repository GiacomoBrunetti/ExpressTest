const { Sequelize } = require('sequelize');

const config = require('./config');

const db = new Sequelize(config);


async function testDB() {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

async function syncDB() {
    await db.sync();
    console.log('database is synced.')
}

module.exports = {
    db,
    testDB,
    syncDB,
};


