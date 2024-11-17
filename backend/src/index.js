import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import './connection.js'; // Database connection
import User from './models/user.js'; // User model
import jwt from 'jsonwebtoken'; // JWT for authentication
import authenticateUser from './middleware/auth.js'; // Authentication middleware
import Product from './models/Product.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' })); // Increase limit to handle large images 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));


// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists (by email or username)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username or email already exists' });
    }

    // You can add password strength validation here if needed
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint 
app.post('/log', async (req, res) => { 
  const { username, password } = req.body; 
  // Hardcoded admin and user credentials (You can store these securely in environment variables) 
  const adminUsername = process.env.ADMIN_USERNAME || 'admin123'; 
  const adminPassword = process.env.ADMIN_PASSWORD || '123'; 
  const userUsername = process.env.USER_USERNAME || 'diya'; 
  const userPassword = process.env.USER_PASSWORD || 'diya123'; 
  try { 
    // Check if the user is the admin 
    if (username === adminUsername && password === adminPassword) { 
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' }); 
      return res.status(200).json({ message: 'Login successful', token, role: 'admin' }); 
    } 
    if (username === userUsername && password === userPassword) { 
      const token = jwt.sign({ role: 'user' }, process.env.JWT_SECRET, { expiresIn: '24h' }); 
      return res.status(200).json({ message: 'Login successful', token, role: 'user' }); 
    } 
    // Normal user authentication 
    const user = await User.findOne({ username }); 
    if (!user) { 
      return res.status(401).json({ message: 'Invalid username or password' }); 
    } 
    // Compare the provided password with the stored hashed password 
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (isPasswordValid) { 
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' }); 
      return res.status(200).json({ message: 'Login successful', token, role: user.role }); 
    } else { 
      return res.status(401).json({ message: 'Invalid username or password' }); 
    } 
  } catch (error) { 
    console.error('Login error:', error); 
    return res.status(500).json({ message: 'Internal server error' }); 
  }
});

// Fetch all users
app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send('Users not found');
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal server error');
  }
});

// Delete user by ID (admin only)
app.delete('/admin/users/:userId', authenticateUser, async (req, res) => {

  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Get user profile (protected route)
app.get('/user/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add product endpoint 
app.post('/api/products',  async (req, res) => { 
   
  try { 
    const { name, price, category,image } = req.body;
    const newProduct = new Product({ 
      name, 
      price, 
      category, 
      image,
       // Associate the product with the user who created it 
    }); 
    await newProduct.save(); 
    res.status(201).json({ message: 'Product added successfully', product: newProduct }); 
  } catch (error) { 
    console.error(' adding product:'); 
    res.status(500).json({ message: 'adding product'});
  }
});

// Get all products endpoint 
app.get('/api/products', async (req, res) => { 
  try { 
    const products = await Product.find(); 
    res.status(200).json(products);
   } catch (error) { 
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: 'Internal server error' });
   }
  });

// Get a single product by ID 
app.get('/api/products/:id', async (req, res) => { 
  try { 
    const product = await Product.findById(req.params.id); 
    if (!product) { 
      return res.status(404).json({ message: 'Product not found' }); 
    } 
    res.status(200).json(product); 
  } catch (error) { 
    console.error('Error fetching product:', error); 
    res.status(500).json({ message: 'Internal server error' }); 
  }
});


// Get product list (for admin) 
app.get('/api/productRoutes/list', authenticateUser, async (req, res) => { 
  try { 
    const products = await Product.find(); 
    res.status(200).json(products); 
  } catch (error) { 
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: 'Internal server error' }); 
  }
});

// Update product by ID (name, price, and category) 
app.put('/api/productRoutes/:productId', authenticateUser, async (req, res) => { 
  const { productId } = req.params; 
  const { name, price, category } = req.body; 
  // Update name, price, and category fields 
  try { 
    const updatedProduct = await Product.findByIdAndUpdate( productId, { name, price, category }, { new: true } 
      // Return the updated product 
    ); 
    if (!updatedProduct) { 
      return res.status(404).json({ message: 'Product not found' }); 
    } 
    res.status(200).json(updatedProduct); 
  } catch (error) { 
    console.error('Error updating product:', error); 
    res.status(500).json({ message: 'Internal server error' }); 
  } 
}); 


// Delete product by ID 
app.delete('/api/productRoutes/:productId', authenticateUser, async (req, res) => { 
  const { productId } = req.params; 
  try { 
    const deletedProduct = await Product.findByIdAndDelete(productId); 
    if (!deletedProduct) { 
      return res.status(404).json({ message: 'Product not found' }); 
    } 
    res.status(200).json({ message: 'Product deleted successfully' }); 
  } catch (error) { 
    console.error('Error deleting product:', error); 
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
