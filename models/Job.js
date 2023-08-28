const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide positions'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      // Tying up the values to the user
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
