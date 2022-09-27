#!/usr/bin/env bash

touch controllers/$NAME.js models/$NAME.js routes/$NAME.js

CAP=${NAME^}

cat <<EOF >controllers/$NAME.js
const $CAP = require('../models/$NAME');

exports.getAll = async(req, res, next) => {
    try {
        // change this variable maybe
        const $NAME = await $CAP.find({});

        // change it here too
        return res.status(200).json($NAME);
    } catch(error) {
        console.error(error);
        return res.status(403).json({ message: "There was an error : " + error })
    }
}
EOF

cat <<EOF >models/$NAME.js
const mongoose = require("mongoose");

const ${CAP}Schema = mongoose.Schema({
    someValue: {
        type: String,
        required: true
    },
    someArray: [{
        type: String,
        required: true
    }],
    someSchemaObject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reference'
    }
})

${CAP}Schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('$CAP', ${CAP}Schema);
EOF

cat <<EOF >routes/$NAME.js
const express = require('express');
const router = express.Router();
// maybe change this variable
const ${NAME}Controller = require('../controllers/$NAME');

router.get('/', ${NAME}Controller.getAll);

// import in index
module.exports = router;

EOF