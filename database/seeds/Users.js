const User  = require('../models/User')

const defaults = {
    firstName: 'Giacomo',
    lastName: 'Brunetti',
    username: 'Ittenurb',
    password: 'password'
}

const createUser = async () => {
    // await User.sync({ alter: true })
    const user = await User.findOne({where: { username: 'Ittenurb'}});
    console.log(user)
    if (!user) {
        console.log(`User not found`)
        const user = await User.build(defaults)
        await user.save()
    }
};

module.exports = {
    createUser
}