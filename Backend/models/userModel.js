const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true
  },
  followers: {
    type: [String]
  },
  following: {
    type: [String]
  },
  savedposts: {
    type: [String]
  }
}, { timestamps: true })

userSchema.statics.signup = async function (firstName, lastName, userName, password, age, phoneNumber) {
  // validation
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough")
  }

  if (phoneNumber < 6000000000 || phoneNumber >= 10000000000) {
    throw Error("invalid phone Number")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ firstName, lastName, userName, password: hash, age, phoneNumber })
  return user;
}

userSchema.statics.login = async function(userName, password) {
  const user = await this.findOne({userName})

  if (!user) {
    throw Error("userName is not found")
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error("incorrect password")
  }

  return user;
}

module.exports = mongoose.model('User', userSchema)