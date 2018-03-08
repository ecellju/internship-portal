const mongoose = require('mongoose');
// isActive : denotes whether the post is viscible to students or not
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports.createSkillModel = () => {
  mongoose.model('Skill', skillSchema);
};
