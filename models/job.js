const { text } = require('body-parser');
const mongoose = require('mongoose');

const jobSchema= mongoose.Schema({

      name: {
        type: String,
        required: true
      },
      jobId: {
        type: String,
        required: true,
        unique: true
      },
      sharedBy: {
        type: [mongoose.SchemaType.ObjectId],
        ref:"company",
        required: true
      },
      description: {
        type: Text,
        required: true
      },
      requirement: {
        type: Text,
        required: true
      },
      openingData: {
        type: Date,
        required: true
      }
});

module.exports=mongoose.model('job', jobSchema);