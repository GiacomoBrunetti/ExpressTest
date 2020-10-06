const { Model, DataTypes } = require('sequelize')

const { db } = require('../db')

class User extends Model {}


const userColumns = {
    username: {
        type: DataTypes.STRING,
        null: false,
        maxlength: 50,
    },
    firstname: {
        type: DataTypes.STRING,
        null: false,
    },
    lastname: {
        type: DataTypes.STRING,
        null: false,
    },
    password: {
        type: DataTypes.STRING,
        null: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        default: true
    }
};

const userOptions = {
    sequelize: db,
    freezeTableName: true
}

User.init(userColumns, userOptions)

module.exports = {
    User
}
