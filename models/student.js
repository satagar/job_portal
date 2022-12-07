const mongoose = require('mongoose');

const studentSchema= mongoose.Schema({

    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date
      }
});

module.exports=mongoose.model('student', studentSchema);