const User = require('../../database/models/User');

async function signup(req, res, next) {
    const { username, password, firstName, lastName } = req.body;
    try {
        const user = await User.create({
            username,
            firstName,
            lastName,
            password,
        });
        res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    signup,
};