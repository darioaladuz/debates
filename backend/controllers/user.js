const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getAll = async(req, res, next) => {
    const users = await User
        .find({});
    
    return res.status(200).json(users);
}

exports.register = async(req, res, next) => {
    const { username, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if(emailExists){
        return res.status(403).json({
            message: 'This email is already registered.'
        })
    }

    if(usernameExists){
        return res.status(403).json({
            message: 'This username is already in use.'
        })
    }

    const hashRounds = 10;
    const passwordHash = await bcrypt.hash(password, hashRounds);

    const user = new User({
        username,
        email,
        passwordHash
    })

    try {
        const newUser = await user.save();
        return res.status(201).json(newUser);
    } catch(error){
        console.error(error);
        return res.status(400).json({
            message: 'There was an error : ' + error
        })
    }
}