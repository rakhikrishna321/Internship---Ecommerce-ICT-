import mongoose from 'mongoose';

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
export default Order;
