import mongoose from 'mongoose'
import validator from 'validator'

const subscriber = new mongoose.Schema({
  email: {
    type: String,
    required: 'E-Mail Address required',
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email passed'],
    trim: true,
  },
})

export default mongoose.model('subscriber', subscriber)
