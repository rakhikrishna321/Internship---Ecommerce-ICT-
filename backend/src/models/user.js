import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensures unique usernames
      trim: true,   // Trims whitespace
      minlength: 3, // Minimum length for username (you can adjust this)
      maxlength: 50, // Maximum length for username
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures unique emails
      lowercase: true, // Converts to lowercase
      trim: true,   // Trims whitespace
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], 
        // Regex for email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Allowed roles
      default: 'user', // Default role
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash the password before saving it
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) return next();

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Continue with saving the user
  } catch (error) {
    next(error); // Pass the error to the next middleware (or the error handler)
  }
});

// Compare input password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the user model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;