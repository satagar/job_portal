const mongoose = require('mongoose');

const campanySchema= mongoose.Schema({

      name: {
        type: String,
        required: true
      }, 
      id: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        required: true
      },
      contact: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        required: true
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
      },
      updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
      },

      role: {
        type: String,
        required: true
      }
});

module.exports=mongoose.model('company', campanySchema);