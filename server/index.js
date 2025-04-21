import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    
    console.log('MongoDB would connect here in production');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Models
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User model would be created like this in production:
const User = mongoose.model('User', UserSchema);

// Mock user data for development
const mockUsers = [
  {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10)
  }
];

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const userExists = mockUsers.find(user => user.email === email || user.username === username);
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      _id: Date.now().toString(),
      username,
      email,
      password: hashedPassword
    };
    
    const user = await User.create({ username, email, password: hashedPassword });
    
    mockUsers.push(newUser);
    
    // Create JWT
    const token = jwt.sign(
      { id: newUser._id },
      'jwtSecretKey', 
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = mockUsers.find(user => user.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id },
      'jwtSecretKey', 
      { expiresIn: '1d' }
    );
    
    res.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
