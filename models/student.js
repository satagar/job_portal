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
      role: {
        type: String,
        required: true
      }
});

module.exports=mongoose.model('student', studentSchema);