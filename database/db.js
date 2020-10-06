const path = require('path');
const { Sequelize } = require('sequelize');

const config = require('./config')
const { createUser } = require('./seeds/Users')

const db = new Sequelize(config)


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
    await createUser()
}

module.exports = {
    db,
    testDB,
    syncDB,
};


