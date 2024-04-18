// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   clerkUserId: { type: String, required: true, unique: true },
//   firstName: { type: String },
//   lastName: { type: String },
// });

// const User = mongoose.model('User', userSchema);

// export default User;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  counter: { type: Number, required: true, default: 0 }, // Added a counter field with a default value of 0
});

const User = mongoose.model('User', userSchema);

export default User;
