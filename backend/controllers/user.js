const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAll = async(req, res, next) => {
    try {
        const users = await User
        .find({});

        users.forEach(user => {
            delete user.id;
        })
    
        return res.status(200).json(users);
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            message: 'There was an error : ' + error
        })
    }
}

exports.register = async(req, res, next) => {
    const { username, email, password, password2 } = req.body;

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    const passwordsMatch = password === password2;

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

    if(!passwordsMatch){
        return res.status(403).json({
            message: 'Passwords do not match.'
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

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if(username === '' || password === ''){
        return res.status(400).json({
            message: 'Username or password fields cannot be empty'
        })
    }

    const user = await User
        .findOne({ username });


    if(!user){
        return res.status(403).json({
            message: 'User not found'
        })
    }

    const comparePasswords = await bcrypt.compare(password, user.passwordHash);

    if(!comparePasswords){
        return res.status(403).json({
            message: 'Incorrect password. Try again'
        })
    }

    const userForToken = { username: user.username, id: user._id }

    const token = jwt.sign(userForToken, process.env.SECRET);


    return res.status(200).json({
        username,
        email: user.email,
        token
    })
}

// exports.updateSchema = async (req, res, next) => {
//     await User.find( { debates : { $exists : false } } ).forEach(user => {
//         user.debates = [];
//         User.save(user);
//     })

//     return res.json({ message: "done" })
// }

exports.test = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        if(!decodedToken.id){
        return res.status(401).json({
            error: 'token missing or invalid'
        })
        }

        console.log("working");
        return res.status(200).json({
            message: "all working good"
        })
    } catch(error) {
        console.error(error);
        return res.status(400).json({
            message: 'There was an error : ' + error
        })
    }
}