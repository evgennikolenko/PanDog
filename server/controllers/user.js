const jwt = require('jsonwebtoken');

const User = require('./../models/user');

module.exports.currentUser = async function (req, res) {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = await  jwt.verify(token, 'pandog');

    const user = await User.findOne({ _id: decoded.userId });

    const { firstName, lastName, phone, city, street, index, email, login, role, _id} = user;
    if (user) {
        res.status(200).json({
            firstName,
            lastName,
            phone,
            city,
            street,
            index,
            email,
            login,
            role,
            id: _id })
    }
};