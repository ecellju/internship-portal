const mongoose = require('mongoose');
// isActive : denotes whether the post is viscible to students or not
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  studentsApplied: [{ type: mongoose.Schema.Types.ObjectId }],
  isActive: { type: Boolean, default: true },
});

const postModel = mongoose.model('post', postSchema);
module.exports = postModel;
