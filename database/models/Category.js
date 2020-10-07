const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('../config');

const db = new Sequelize(config);


class Category extends Model {}


const categoryColumns = {
    name: {
        type: DataTypes.STRING,
        unique: true,
        set(value) {
            return value.charAt(0).toUpperCase() + name.slice(1)
        }
    },
};


const categoryOptions = {
    sequelize: db,
    tableName: 'category'
};

Category.init(categoryColumns, categoryOptions);


module.exports = Category;


