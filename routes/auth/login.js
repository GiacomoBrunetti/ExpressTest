const User = require('../../database/models/User');

async function login(req, res, next) {
    const {username, password} = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    })
    if (!user) {
        res.sendStatus(404)
    } else {
        const passwordMatch = await user.checkPassword(password);
        if (passwordMatch) {
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    }
    next()
}

module.exports = {
    login,
};


