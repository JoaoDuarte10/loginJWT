const User = require('../models/User');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    register: async function(req, res) {

        const selectUser = await User.findOne({ email: req.body.email });
        if (selectUser) return res.status(400).send('Email already exist')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcript.hashSync(req.body.password)
        })

        try {
            const savedUser = await user.save();
            res.send(savedUser)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    login: async function(req, res) {
        const selectUser = await User.findOne({ email: req.body.email });
        if (!selectUser) return res.status(400).send('Email or Password incorrect!')

        const passwordAndUserMatch = bcript.compareSync(req.body.password, selectUser.password)
        if (!passwordAndUserMatch) return res.status(400).send('Email or Password incorrect!')

        const token = jwt.sign({ _id: selectUser._id }, process.env.TOKEN_SECRETE)

        res.header('authorization-token', token)

        res.send('User Logged')
    }
}

module.exports = userController;