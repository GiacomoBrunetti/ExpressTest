const User  = require('../models/User')

const defaults = {
    firstName: 'Giacomo',
    lastName: 'Brunetti',
    username: 'Ittenurb',
    password: 'password'
}

const createUser = async () => {
    await User.sync({ alter: true })
    const user = User.findOne({where: { username: 'Ittenurb'}});
    if (!user) {
        User.create(defaults)
    }
};

module.exports = {
    createUser
}