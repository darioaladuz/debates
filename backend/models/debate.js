const mongoose = require("mongoose");

const DebateSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

DebateSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Debate', DebateSchema);