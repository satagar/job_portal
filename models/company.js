const mongoose = require('mongoose');

const campanySchema= mongoose.Schema({

    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date
      }
});

module.exports=mongoose.model('company', campanySchema);