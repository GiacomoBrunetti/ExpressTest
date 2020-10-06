const User = require('../../database/models/User')

async function login(req, res, next) {
    console.log(req.body)
    const {username, password} = req.body;
    console.log(username)
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
            res.sendStatus(201)
        } else {
            res.sendStatus(401)
        }
    }
}

module.exports = {
    login,
};


