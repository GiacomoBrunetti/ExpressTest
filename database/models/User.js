const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const config = require('../config')

const db = new Sequelize(config)

const saltRounds = 8;

const hashPassword = async raw => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(raw, salt);
};


class User extends Model {
    static hashPassword = hashPassword;

    async checkPassword(raw) {
        return await bcrypt.compare(raw, this.password);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}


const userAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        maxLength: 50,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        async set(value) {
          this.setDataValue('password', await hashPassword(value));
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
};

const userOptions = {
    sequelize: db,
    tableName: 'users'
    // indexes: [
    //     {
    //         unique: true,
    //         field: 'username'
    //     }
    // ]
};

User.init(userAttributes, userOptions);

module.exports = User;
