const Debate = require('../models/debate');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res, next) => {
    try {
        const debates = await Debate.find({});
        return res.status(200).json(debates);
    } catch(error) {
        console.error(error);
        return res.status(403).json({ message: "There was an error : " + error })
    }
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id;

    try {
        const debate = await Debate.findOne({ id });
    
        return res.status(200).json(debate);
    } catch(error){
        console.error(error);
        return res.status(403).json({ message: "There was an error : " + error })
    }
}

exports.add = async (req, res, next) => {
    const title = req.body.title;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if(!decodedToken.id){
        return res.status(401).json({
            error: 'token missing or invalid'
        })
    }

    const userId = decodedToken.id;

    const debate = new Debate({
        title,
        created_by: userId
    })

    try {
        const createdDebate = await debate.save();

        return res.status(201).json(createdDebate);
    } catch(error) {
        console.error(error);
        return res.status(403).json({ message: "Something went wrong : " + error })
    }
}