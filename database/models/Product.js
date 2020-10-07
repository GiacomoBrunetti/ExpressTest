const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('../config');
const Category = require('./Category');

const db = new Sequelize(config);

class Product extends Model {}

const productColumns = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        index: true
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'no-image.png'
    },
};

const productOptions = {
    sequelize: db,
    tableName: 'products'
};

Product.init(productColumns, productOptions);

Product.belongsTo(Category)


module.exports = Product;
