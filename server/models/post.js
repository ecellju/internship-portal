const mongoose = require('mongoose');

// isActive : denotes whether the post is viscible to students or not
const PostSchema = new mongoose.Schema({
  /* position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  stipend: {
    type: Number,
    required: true,
  },
  postedOn: {
    type: Date,
    required: true,
  },
  applyBy: {
    type: Date,
    required: true,
  }, */
  title: { type: String, required: true },
  description: { type: String, required: true },
  studentsApplied: [{ type: mongoose.Schema.Types.ObjectId }],
  isActive: { type: Boolean, default: true },
});

module.exports.createPostModel = () => {
  mongoose.model('Post', PostSchema);
};
