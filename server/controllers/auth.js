const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');

module.exports.login = async function (req, res) {

    const condidate = await User.findOne({ email: req.body.email });

    if (condidate) {
        const isValidatePass = bcrypt.compareSync(req.body.password, condidate.password);

        if (isValidatePass) {
            const token = jwt.sign({
                userId: condidate._id,
                role: condidate.role,
                },
                'pandog', { expiresIn: 60 * 60 });

            res.status(200).json({ token: `Bearer ${token}` })

        } else {
            res.status(401).json({
                message: 'Password not valid'
            })
        }
    } else {
        res.status(404).json({
            message: 'User not found!'
        });
    }
};

module.exports.registration = async function (req, res, next) {

    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        res.status(409).json({
           message: "User is already registred!"
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const { firstName, lastName, email, phone, country, city, street, index, login } = req.body;

        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            country,
            city,
            street,
            index,
            login,
            password: hashPassword
        });

        try {
            await user.save();
        } catch (e) {
            console.log(('e'));
        }
        next();
    }
};

module.exports.sendToken = async function (req, res) {
    const condidate = await User.findOne({ email: req.body.email });

    if (condidate) {

        const token = jwt.sign({
                userId: condidate._id,
                role: condidate.role,
            },
            'pandog', { expiresIn: 60 * 60 });

        res.status(201).json({ token: `Bearer ${token}` });
    } else {
        res.status(500);
    }
};