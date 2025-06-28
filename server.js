// server.js - Backend Authentication Server
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Set default values if environment variables are not provided
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rommel_admin';
const JWT_SECRET = process.env.JWT_SECRET || 'rommel_super_secret_key';

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // If we can't connect to MongoDB, we will use an in-memory admin account
    console.log('Using in-memory authentication instead');
  });

// ========== DATABASE MODELS ==========

// Visitor Schema - لتخزين الزوار وأكوادهم
const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['admin', 'user'] },
  displayName: { type: String, default: '' },
  email: { type: String, default: '' },
  code: { type: String, unique: true }, // كود المستخدم الفريد
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (!this.code) {
    // إنشاء كود فريد للمستخدم إذا لم يكن موجوداً
    this.code = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { 
    userId: { type: String, default: 'anonymous' },
    name: { type: String, required: true },
    code: String
  },
  isPinned: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  likedBy: [String],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Comment Schema
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  author: { 
    userId: { type: String, default: 'anonymous' },
    name: { type: String, required: true },
    code: String
  },
  createdAt: { type: Date, default: Date.now }
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, default: 'info', enum: ['info', 'success', 'warning', 'error'] },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Visitor = mongoose.model('Visitor', visitorSchema);
const Notification = mongoose.model('Notification', notificationSchema);

// In-memory data stores (fallback when no DB connection)
let inMemoryPosts = [];
let inMemoryComments = [];
let inMemoryUsers = [];
let inMemoryVisitors = [];
let inMemoryNotifications = [];

// In-memory admin account as fallback
const inMemoryAdmin = {
  username: 'Rommeltarek2005',
  // Password is "Rommel_R20" - we'll use plaintext and hash it when comparing
  password: 'Rommel_R20',
  role: 'admin',
  displayName: 'Rommel Admin',
  code: 'ADMIN01',
  active: true
};

// Add admin to in-memory users
inMemoryUsers.push(inMemoryAdmin);

// ========== MIDDLEWARE ==========

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Requires admin access' });
  }
  next();
};

// Helper function to generate a unique code
const generateUniqueCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Middleware to check and assign visitor code
const assignVisitorCode = async (req, res, next) => {
  try {
    // Get visitor's IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Check if visitor already has a code
    let visitor;
    
    if (mongoose.connection.readyState === 1) {
      visitor = await Visitor.findOne({ ipAddress });
      
      if (!visitor) {
        // Create new visitor with unique code
        const code = generateUniqueCode();
        visitor = new Visitor({ ipAddress, code });
        await visitor.save();
      } else {
        // Update last visit time
        visitor.lastVisit = new Date();
        await visitor.save();
      }
    } else {
      // In-memory visitor tracking
      visitor = inMemoryVisitors.find(v => v.ipAddress === ipAddress);
      
      if (!visitor) {
        // Create new visitor with unique code
        const code = generateUniqueCode();
        visitor = { ipAddress, code, createdAt: new Date(), lastVisit: new Date() };
        inMemoryVisitors.push(visitor);
      } else {
        // Update last visit time
        visitor.lastVisit = new Date();
      }
    }
    
    // Attach visitor info to request
    req.visitor = visitor;
    next();
  } catch (error) {
    console.error('Error in visitor code assignment:', error);
    // Continue without visitor code if there's an error
    next();
  }
};

// Create default admin user if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'Rommeltarek2005' });
    
    if (!adminExists) {
      await User.create({
        username: 'Rommeltarek2005',
        password: await bcrypt.hash('Rommel_R20', 10),
        role: 'admin',
        displayName: 'Rommel Admin',
        code: 'ADMIN01',
        active: true
      });
      console.log('Default admin account created');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

// Apply visitor code middleware to all routes
app.use(assignVisitorCode);

// ========== ROUTES ==========

// Get visitor code
app.get('/api/visitor/code', (req, res) => {
  if (req.visitor) {
    res.json({ 
      code: req.visitor.code,
      name: req.visitor.name || ''
    });
  } else {
    res.status(500).json({ message: 'Could not generate visitor code' });
  }
});

// Update visitor name
app.post('/api/visitor/name', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!req.visitor) {
      return res.status(400).json({ message: 'Visitor not found' });
    }
    
    if (mongoose.connection.readyState === 1) {
      await Visitor.findOneAndUpdate(
        { code: req.visitor.code },
        { name }
      );
    } else {
      const visitorIndex = inMemoryVisitors.findIndex(v => v.code === req.visitor.code);
      if (visitorIndex !== -1) {
        inMemoryVisitors[visitorIndex].name = name;
      }
    }
    
    req.visitor.name = name;
    
    res.json({ 
      code: req.visitor.code,
      name
    });
  } catch (error) {
    console.error('Error updating visitor name:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Log the received data for debugging
    console.log('Login attempt:', { username, receivedPassword: password });
    
    // Check if we're connected to MongoDB
    let user;
    
    if (mongoose.connection.readyState === 1) {
      // Connected to MongoDB - find user in database
      user = await User.findOne({ username });
      
      // Create default admin if it doesn't exist and we're looking for it
      if (!user && username === 'Rommeltarek2005') {
        await createDefaultAdmin();
        user = await User.findOne({ username });
      }
    } else {
      // Not connected to MongoDB - use in-memory admin
      if (username === inMemoryAdmin.username) {
        user = inMemoryAdmin;
      }
    }
    
    // If user not found
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    let validPassword = false;
    
    if (user === inMemoryAdmin) {
      // For in-memory admin, just compare directly since we stored plaintext
      validPassword = (password === user.password);
      console.log('In-memory password check:', { valid: validPassword });
    } else {
      // For database user, use bcrypt
      validPassword = await bcrypt.compare(password, user.password);
      console.log('Database password check:', { valid: validPassword });
    }
    
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id || 'in-memory-admin', username: user.username, role: user.role, code: user.code },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        username: user.username,
        role: user.role,
        displayName: user.displayName || user.username,
        code: user.code
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token route
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Users Routes
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    let users;
    if (mongoose.connection.readyState === 1) {
      users = await User.find().select('-password');
    } else {
      users = inMemoryUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    }
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { username, password, displayName, role, code } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Check if user exists
    let userExists;
    if (mongoose.connection.readyState === 1) {
      userExists = await User.findOne({ username });
    } else {
      userExists = inMemoryUsers.find(user => user.username === username);
    }
    
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Create user
    if (mongoose.connection.readyState === 1) {
      const newUser = new User({
        username,
        password,
        displayName: displayName || username,
        role: role || 'user',
        code: code || Math.random().toString(36).substring(2, 8).toUpperCase()
      });
      await newUser.save();
      const { password: _, ...userResponse } = newUser.toObject();
      res.status(201).json(userResponse);
    } else {
      const newUser = {
        id: Date.now().toString(),
        username,
        password,
        displayName: displayName || username,
        role: role || 'user',
        code: code || Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date()
      };
      inMemoryUsers.push(newUser);
      const { password: _, ...userResponse } = newUser;
      res.status(201).json(userResponse);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Posts Routes
app.get('/api/posts', async (req, res) => {
  try {
    let posts;
    if (mongoose.connection.readyState === 1) {
      posts = await Post.find().sort({ isPinned: -1, createdAt: -1 });
    } else {
      posts = [...inMemoryPosts].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Modified post creation endpoint to support both authenticated and non-authenticated users
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, authorName } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // Check if request has authentication token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = null;
    
    if (token) {
      // Verify token if provided
      try {
        user = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        // Continue without authentication if token is invalid
        console.log('Invalid token provided, continuing as visitor');
      }
    }
    
    // Use visitor info if available
    const visitorName = authorName || (req.visitor && req.visitor.name ? req.visitor.name : 'زائر');
    
    // Determine author information
    const author = {
      userId: user ? user.id : (req.visitor ? req.visitor.ipAddress : 'anonymous'),
      name: user ? user.username || visitorName : visitorName,
      code: user ? user.code : (req.visitor ? req.visitor.code : null)
    };
    
    // If visitor provided a name, update their record
    if (!user && req.visitor && authorName && authorName !== req.visitor.name) {
      try {
        if (mongoose.connection.readyState === 1) {
          await Visitor.findOneAndUpdate(
            { ipAddress: req.visitor.ipAddress },
            { name: authorName }
          );
        } else {
          const visitorIndex = inMemoryVisitors.findIndex(v => v.ipAddress === req.visitor.ipAddress);
          if (visitorIndex !== -1) {
            inMemoryVisitors[visitorIndex].name = authorName;
          }
        }
      } catch (updateError) {
        console.error('Error updating visitor name:', updateError);
      }
    }
    
    let newPost;
    if (mongoose.connection.readyState === 1) {
      newPost = new Post({
        title,
        content,
        author,
        tags: req.body.tags || []
      });
      await newPost.save();
    } else {
      newPost = {
        id: Date.now().toString(),
        title,
        content,
        author,
        isPinned: false,
        likes: 0,
        likedBy: [],
        tags: req.body.tags || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      inMemoryPosts.push(newPost);
    }
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Post Management
app.put('/api/admin/posts/:id/pin', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isPinned } = req.body;
    
    if (mongoose.connection.readyState === 1) {
      const post = await Post.findByIdAndUpdate(
        id, 
        { isPinned }, 
        { new: true }
      );
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    } else {
      const postIndex = inMemoryPosts.findIndex(post => post.id === id);
      if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
      
      inMemoryPosts[postIndex].isPinned = isPinned;
      res.json(inMemoryPosts[postIndex]);
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post likes count (new endpoint)
app.put('/api/admin/posts/:id/update-likes', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;
    
    if (isNaN(likes) || likes < 0) {
      return res.status(400).json({ message: 'Invalid likes count' });
    }
    
    if (mongoose.connection.readyState === 1) {
      const post = await Post.findByIdAndUpdate(
        id, 
        { likes }, 
        { new: true }
      );
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.json(post);
    } else {
      const postIndex = inMemoryPosts.findIndex(post => post.id === id);
      if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
      
      inMemoryPosts[postIndex].likes = likes;
      res.json(inMemoryPosts[postIndex]);
    }
  } catch (error) {
    console.error('Error updating post likes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/posts/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (mongoose.connection.readyState === 1) {
      const post = await Post.findByIdAndDelete(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      
      // Delete associated comments too
      await Comment.deleteMany({ postId: id });
    } else {
      const postIndex = inMemoryPosts.findIndex(post => post.id === id);
      if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
      
      inMemoryPosts.splice(postIndex, 1);
      // Remove associated comments
      inMemoryComments = inMemoryComments.filter(comment => comment.postId !== id);
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like Post
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get visitor IP or user ID for tracking likes
    const visitorId = req.visitor ? req.visitor.ipAddress : 
                     (req.headers['x-forwarded-for'] || req.socket.remoteAddress);
    
    if (mongoose.connection.readyState === 1) {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      
      // Check if visitor already liked the post
      const userLikedIndex = post.likedBy.indexOf(visitorId);
      if (userLikedIndex !== -1) {
        // Remove like
        post.likedBy.splice(userLikedIndex, 1);
        post.likes--;
      } else {
        // Add like
        post.likedBy.push(visitorId);
        post.likes++;
      }
      
      await post.save();
      res.json(post);
    } else {
      const postIndex = inMemoryPosts.findIndex(post => post.id === id);
      if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
      
      // Check if visitor already liked the post
      const userLikedIndex = inMemoryPosts[postIndex].likedBy.indexOf(visitorId);
      if (userLikedIndex !== -1) {
        // Remove like
        inMemoryPosts[postIndex].likedBy.splice(userLikedIndex, 1);
        inMemoryPosts[postIndex].likes--;
      } else {
        // Add like
        inMemoryPosts[postIndex].likedBy.push(visitorId);
        inMemoryPosts[postIndex].likes++;
      }
      
      res.json(inMemoryPosts[postIndex]);
    }
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Comments
app.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    
    let comments;
    if (mongoose.connection.readyState === 1) {
      comments = await Comment.find({ postId: id }).sort({ createdAt: 1 });
    } else {
      comments = inMemoryComments
        .filter(comment => comment.postId === id)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Modified comment creation endpoint to support both authenticated and non-authenticated users
app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, authorName } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    // Check if post exists
    let postExists = false;
    if (mongoose.connection.readyState === 1) {
      const post = await Post.findById(id);
      postExists = !!post;
    } else {
      postExists = inMemoryPosts.some(post => post.id === id);
    }
    
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if request has authentication token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = null;
    
    if (token) {
      // Verify token if provided
      try {
        user = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        // Continue without authentication if token is invalid
        console.log('Invalid token provided, continuing as visitor');
      }
    }
    
    // Use visitor info if available
    const visitorName = authorName || (req.visitor && req.visitor.name ? req.visitor.name : 'زائر');
    
    // Determine author information
    const author = {
      userId: user ? user.id : (req.visitor ? req.visitor.ipAddress : 'anonymous'),
      name: user ? user.username || visitorName : visitorName,
      code: user ? user.code : (req.visitor ? req.visitor.code : null)
    };
    
    // If visitor provided a name, update their record
    if (!user && req.visitor && authorName && authorName !== req.visitor.name) {
      try {
        if (mongoose.connection.readyState === 1) {
          await Visitor.findOneAndUpdate(
            { ipAddress: req.visitor.ipAddress },
            { name: authorName }
          );
        } else {
          const visitorIndex = inMemoryVisitors.findIndex(v => v.ipAddress === req.visitor.ipAddress);
          if (visitorIndex !== -1) {
            inMemoryVisitors[visitorIndex].name = authorName;
          }
        }
      } catch (updateError) {
        console.error('Error updating visitor name:', updateError);
      }
    }
    
    let newComment;
    if (mongoose.connection.readyState === 1) {
      newComment = new Comment({
        postId: id,
        content,
        author
      });
      await newComment.save();
    } else {
      newComment = {
        id: Date.now().toString(),
        postId: id,
        content,
        author,
        createdAt: new Date()
      };
      inMemoryComments.push(newComment);
    }
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment
app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    
    if (mongoose.connection.readyState === 1) {
      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
    } else {
      const commentIndex = inMemoryComments.findIndex(c => (c._id === commentId || c.id === commentId) && (c.postId === postId));
      if (commentIndex === -1) return res.status(404).json({ message: 'Comment not found' });
      
      inMemoryComments.splice(commentIndex, 1);
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a specific endpoint for admin comment deletion
app.delete('/api/admin/posts/:postId/comments/:commentId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    
    if (mongoose.connection.readyState === 1) {
      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
    } else {
      const commentIndex = inMemoryComments.findIndex(c => (c._id === commentId || c.id === commentId) && (c.postId === postId));
      if (commentIndex === -1) return res.status(404).json({ message: 'Comment not found' });
      
      inMemoryComments.splice(commentIndex, 1);
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dashboard Statistics
app.get('/api/admin/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    let stats = {
      totalUsers: 0,
      totalPosts: 0,
      totalComments: 0,
      totalLikes: 0,
      pinnedPosts: 0,
      activeUsers: 0
    };
    
    if (mongoose.connection.readyState === 1) {
      // Get real stats from database
      stats.totalUsers = await User.countDocuments();
      stats.totalPosts = await Post.countDocuments();
      stats.totalComments = await Comment.countDocuments();
      stats.pinnedPosts = await Post.countDocuments({ isPinned: true });
      
      // Count total likes across all posts
      const posts = await Post.find();
      stats.totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
      
      // Count active users (created in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      stats.activeUsers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    } else {
      // Get stats from in-memory data
      stats.totalUsers = inMemoryUsers.length;
      stats.totalPosts = inMemoryPosts.length;
      stats.totalComments = inMemoryComments.length;
      stats.pinnedPosts = inMemoryPosts.filter(post => post.isPinned).length;
      stats.totalLikes = inMemoryPosts.reduce((sum, post) => sum + post.likes, 0);
      
      // Count active users (created in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      stats.activeUsers = inMemoryUsers.filter(user => 
        new Date(user.createdAt) >= thirtyDaysAgo
      ).length;
    }
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
app.get('/api/admin/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Notification Routes
app.get('/api/notifications', async (req, res) => {
  try {
    // يمكن استخدام timestamp للتحقق فقط من الإشعارات الجديدة منذ آخر تحقق
    const timestamp = req.query.timestamp ? parseInt(req.query.timestamp) : 0;
    const now = new Date();
    
    let notifications;
    if (mongoose.connection.readyState === 1) {
      // Filter only active notifications that haven't expired
      notifications = await Notification.find({
        active: true,
        expiresAt: { $gt: now },
        // تضمين الإشعارات الجديدة فقط (منذ آخر تحقق)
        createdAt: { $gt: new Date(timestamp) }
      }).sort({ createdAt: -1 });
    } else {
      // Use in-memory notifications with filtering
      notifications = inMemoryNotifications
        .filter(n => n.active && 
                new Date(n.expiresAt) > now && 
                new Date(n.createdAt).getTime() > timestamp)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Long polling endpoint for notifications - allows clients to wait for new notifications
app.get('/api/notifications/poll', async (req, res) => {
  try {
    const timestamp = req.query.timestamp ? parseInt(req.query.timestamp) : Date.now();
    const timeout = 25000; // 25 seconds timeout (slightly less than browser timeout)
    const pollInterval = 1000; // Check every second
    const maxIterations = timeout / pollInterval;
    let iterations = 0;
    
    // Store the timestamp of the most recent notification for comparison
    let lastNotificationTimestamp = 0;
    
    // Function to check for new notifications
    const checkForNewNotifications = async () => {
      const now = new Date();
      
      if (mongoose.connection.readyState === 1) {
        // Check DB for new notifications since timestamp
        const latestNotification = await Notification.findOne({
          active: true,
          expiresAt: { $gt: now },
          createdAt: { $gt: new Date(timestamp) }
        }).sort({ createdAt: -1 });
        
        if (latestNotification) {
          lastNotificationTimestamp = new Date(latestNotification.createdAt).getTime();
          return true;
        }
      } else {
        // Check in-memory notifications
        const latestNotification = inMemoryNotifications.find(n => 
          n.active && 
          new Date(n.expiresAt) > now && 
          new Date(n.createdAt).getTime() > timestamp
        );
        
        if (latestNotification) {
          lastNotificationTimestamp = new Date(latestNotification.createdAt).getTime();
          return true;
        }
      }
      
      return false;
    };
    
    // Initial check
    let hasNewNotifications = await checkForNewNotifications();
    
    // If no new notifications found immediately, start polling
    if (!hasNewNotifications) {
      // Using setTimeout recursively instead of setInterval for better timing control
      const poll = () => {
        return new Promise<boolean>((resolve) => {
          setTimeout(async () => {
            iterations++;
            
            // Check for new notifications
            const newNotificationsFound = await checkForNewNotifications();
            
            // If found or reached max iterations, resolve
            if (newNotificationsFound || iterations >= maxIterations) {
              resolve(newNotificationsFound);
            } else {
              // Continue polling
              resolve(await poll());
            }
          }, pollInterval);
        });
      };
      
      // Start polling
      hasNewNotifications = await poll();
    }
    
    // Respond with result
    res.json({ 
      hasNewNotifications,
      timestamp: lastNotificationTimestamp || Date.now()
    });
    
  } catch (error) {
    console.error('Error in notifications long polling:', error);
    res.status(500).json({ message: 'Server error', hasNewNotifications: false });
  }
});

// Create notification
app.post('/api/notifications', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { title, content, type, displayDuration } = req.body;
    
    if (!title || !content || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Set default expiry to 24 hours if not specified
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    let newNotification;
    
    if (mongoose.connection.readyState === 1) {
      newNotification = new Notification({
        title,
        content,
        type,
        active: true,
        displayDuration: displayDuration || 3, // Default 3 seconds
        expiresAt,
        createdAt: now
      });
      
      await newNotification.save();
    } else {
      // Create in-memory notification
      newNotification = {
        _id: generateId(),
        title,
        content,
        type,
        active: true,
        displayDuration: displayDuration || 3,
        expiresAt: expiresAt.toISOString(),
        createdAt: now.toISOString()
      };
      
      inMemoryNotifications.push(newNotification);
    }
    
    // إرسال الإشعار إلى جميع المستخدمين من خلال الاستجابة للـ long polling
    console.log("New notification created:", newNotification.title);
    
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update notification
app.put('/api/notifications/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, active, displayDuration } = req.body;
    
    if (!title || !content || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    let updatedNotification;
    
    if (mongoose.connection.readyState === 1) {
      updatedNotification = await Notification.findByIdAndUpdate(
        id,
        { 
          title, 
          content, 
          type,
          active: active !== undefined ? active : true,
          displayDuration: displayDuration || 3,
          updatedAt: new Date()
        },
        { new: true }
      );
      
      if (!updatedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
    } else {
      // Update in-memory notification
      const notificationIndex = inMemoryNotifications.findIndex(n => 
        (n._id === id || n.id === id)
      );
      
      if (notificationIndex === -1) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      
      updatedNotification = {
        ...inMemoryNotifications[notificationIndex],
        title,
        content,
        type,
        active: active !== undefined ? active : true,
        displayDuration: displayDuration || 3,
        updatedAt: new Date().toISOString()
      };
      
      inMemoryNotifications[notificationIndex] = updatedNotification;
    }
    
    res.json(updatedNotification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete notification
app.delete('/api/notifications/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (mongoose.connection.readyState === 1) {
      const deletedNotification = await Notification.findByIdAndDelete(id);
      
      if (!deletedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
    } else {
      // Delete from in-memory notifications
      const notificationIndex = inMemoryNotifications.findIndex(n => 
        (n._id === id || n.id === id)
      );
      
      if (notificationIndex === -1) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      
      inMemoryNotifications.splice(notificationIndex, 1);
    }
    
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to generate a unique ID for in-memory data
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

// Active Users Tracking
app.get('/api/active-users', async (req, res) => {
  try {
    // Get current time
    const now = new Date();
    // Get visitors active in the last 15 minutes
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
    
    let activeUsers;
    if (mongoose.connection.readyState === 1) {
      activeUsers = await Visitor.find({
        lastVisit: { $gte: fifteenMinutesAgo }
      }).select('ipAddress name code lastVisit');
    } else {
      activeUsers = inMemoryVisitors.filter(visitor => 
        new Date(visitor.lastVisit) >= fifteenMinutesAgo
      );
    }
    
    res.json(activeUsers);
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update visitor last visit time
app.post('/api/visitor/heartbeat', async (req, res) => {
  try {
    if (!req.visitor) {
      return res.status(400).json({ message: 'Visitor not found' });
    }
    
    // Update last visit time
    if (mongoose.connection.readyState === 1) {
      await Visitor.findOneAndUpdate(
        { ipAddress: req.visitor.ipAddress },
        { lastVisit: new Date() }
      );
    } else {
      const visitorIndex = inMemoryVisitors.findIndex(v => v.ipAddress === req.visitor.ipAddress);
      if (visitorIndex !== -1) {
        inMemoryVisitors[visitorIndex].lastVisit = new Date();
      }
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating visitor heartbeat:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ========== WEBSITE LIKES ROUTES ==========

// In-memory website likes data (fallback when DB is unavailable)
let websiteLikes = {
  count: 68, // Default likes count
  likedByIPs: new Set() // Track IPs that have liked
};

// Get website likes
app.get('/api/website/likes', async (req, res) => {
  try {
    // Get visitor's IP to check if they've liked
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    let likesCount = 0;
    let hasLiked = false;
    
    if (mongoose.connection.readyState === 1) {
      // Try to get likes document from DB
      // The likes are stored in a single document with id 'website_likes'
      const likesDoc = await mongoose.connection.db.collection('website_likes').findOne({ id: 'website_likes' });
      
      if (likesDoc) {
        likesCount = likesDoc.count;
        hasLiked = likesDoc.likedByIPs && likesDoc.likedByIPs.includes(ipAddress);
      } else {
        // Create document if it doesn't exist
        await mongoose.connection.db.collection('website_likes').insertOne({
          id: 'website_likes',
          count: websiteLikes.count,
          likedByIPs: []
        });
        likesCount = websiteLikes.count;
      }
    } else {
      // Use in-memory data
      likesCount = websiteLikes.count;
      hasLiked = websiteLikes.likedByIPs.has(ipAddress);
    }
    
    res.json({ count: likesCount, hasLiked });
  } catch (error) {
    console.error('Error getting website likes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle website like
app.post('/api/website/like', async (req, res) => {
  try {
    // Get visitor's IP to track who has liked
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    let likesCount = 0;
    let hasLiked = false;
    
    if (mongoose.connection.readyState === 1) {
      // Get current likes document
      let likesDoc = await mongoose.connection.db.collection('website_likes').findOne({ id: 'website_likes' });
      
      // Create document if it doesn't exist
      if (!likesDoc) {
        likesDoc = {
          id: 'website_likes',
          count: websiteLikes.count,
          likedByIPs: []
        };
        await mongoose.connection.db.collection('website_likes').insertOne(likesDoc);
      }
      
      // Check if user has already liked
      const likedByIPs = Array.isArray(likesDoc.likedByIPs) ? likesDoc.likedByIPs : [];
      hasLiked = likedByIPs.includes(ipAddress);
      
      if (hasLiked) {
        // Remove like
        await mongoose.connection.db.collection('website_likes').updateOne(
          { id: 'website_likes' },
          { 
            $inc: { count: -1 },
            $pull: { likedByIPs: ipAddress }
          }
        );
        hasLiked = false;
        likesCount = (likesDoc.count || 0) - 1;
      } else {
        // Add like
        await mongoose.connection.db.collection('website_likes').updateOne(
          { id: 'website_likes' },
          { 
            $inc: { count: 1 },
            $addToSet: { likedByIPs: ipAddress }
          }
        );
        hasLiked = true;
        likesCount = (likesDoc.count || 0) + 1;
      }
    } else {
      // Use in-memory data
      hasLiked = websiteLikes.likedByIPs.has(ipAddress);
      
      if (hasLiked) {
        // Remove like
        websiteLikes.count = Math.max(0, websiteLikes.count - 1);
        websiteLikes.likedByIPs.delete(ipAddress);
        hasLiked = false;
      } else {
        // Add like
        websiteLikes.count += 1;
        websiteLikes.likedByIPs.add(ipAddress);
        hasLiked = true;
      }
      
      likesCount = websiteLikes.count;
    }
    
    res.json({ count: likesCount, hasLiked });
  } catch (error) {
    console.error('Error toggling website like:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle client-side routing - always return index.html for non-API routes
  app.get('*', (req, res) => {
    // Skip API routes
    if (!req.path.startsWith('/api')) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    }
  });
}

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  // Try to create default admin if connected to MongoDB
  if (mongoose.connection.readyState === 1) {
    createDefaultAdmin();
  }
}); 