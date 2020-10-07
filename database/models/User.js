const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const config = require('../config');

const db = new Sequelize(config);

const saltRounds = 8;

const hashPassword = raw => {
    const salt =  bcrypt.genSaltSync(saltRounds);
    return  bcrypt.hashSync(raw, salt);
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


const userColumns = {
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
        set(value) {
          this.setDataValue('password', hashPassword(value));
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
};

User.init(userColumns, userOptions);

module.exports = User;
