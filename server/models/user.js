import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dept: { type: String },
  year: { type: String },
  cgpa: { type: String },
  internships: {  // internships applied for by the user
    type: [{ // zero or more internships
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    }],
  },
  dateJoined: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('User', userSchema);
