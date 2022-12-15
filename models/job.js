const mongoose = require('mongoose');

const status = ['open','close'];
const type = ['fullTime','parTime'];
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
      jobType: {
        type: String,
        enum: type,
        default:'fullTime'
      },
      jobStatus: {
        type: String,
        enum: status,
        default:'open'
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