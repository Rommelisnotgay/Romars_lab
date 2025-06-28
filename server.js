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
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rommel_admin';
const JWT_SECRET = process.env.JWT_SECRET || 'rommel_super_secret_key';

// Initialize Express app
const app = express();

// تكوين CORS للسماح بالوصول من أي مصدر في بيئة الإنتاج
app.use(cors({
  origin: '*', // السماح لأي أصل
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve static files from the dist directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Connect to MongoDB with improved error handling
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // زيادة مهلة الاتصال
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Using in-memory authentication instead');
});

// ========== DATABASE MODELS ==========

// Admin schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{ 
    text: String, 
    createdAt: { type: Date, default: Date.now } 
  }]
});

// Visitor schema
const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastVisit: { type: Date, default: Date.now }
});

// Notification schema
const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  link: { type: String },
  timestamp: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Website Like Schema
const websiteLikeSchema = new mongoose.Schema({
  visitorCode: { type: String, required: true },
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Create Models
const Admin = mongoose.model('Admin', adminSchema);
const Post = mongoose.model('Post', postSchema);
const Visitor = mongoose.model('Visitor', visitorSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const WebsiteLike = mongoose.model('WebsiteLike', websiteLikeSchema);

// In-memory data stores (fallback when no DB connection)
let inMemoryAdmins = [];
let inMemoryPosts = [];
let inMemoryVisitors = [];
let inMemoryNotifications = [];
let inMemoryLikes = [];

// In-memory admin account as fallback
const initializeInMemoryAdmin = async () => {
  if (inMemoryAdmins.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    inMemoryAdmins.push({
      username: 'admin',
      password: hashedPassword
    });
    console.log('Created in-memory admin account (username: admin)');
  }
};
initializeInMemoryAdmin();

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
    req.visitor = null;
    next();
  }
};

// Generate unique visitor code
function generateUniqueCode() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

// Apply visitor code middleware to all routes
app.use(assignVisitorCode);

// ========== ROUTES ==========

// التأكد من أن الخادم يعمل بشكل صحيح
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Get visitor code
app.get('/api/visitor/code', (req, res) => {
  if (req.visitor) {
    // تسجيل معلومات الزائر للتصحيح
    console.log('Visitor code requested:', req.visitor.code);
    res.json({ 
      code: req.visitor.code,
      name: req.visitor.name || ''
    });
  } else {
    // إنشاء رمز افتراضي إذا كان هناك مشكلة في استرجاع معلومات الزائر
    const fallbackCode = generateUniqueCode();
    console.log('Generated fallback visitor code:', fallbackCode);
    res.json({ 
      code: fallbackCode,
      name: ''
    });
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
      user = await Admin.findOne({ username });
      
      // Create default admin if it doesn't exist and we're looking for it
      if (!user && username === 'admin') {
        await Admin.create({
          username: 'admin',
          password: await bcrypt.hash('admin123', 10)
        });
        user = await Admin.findOne({ username });
      }
    } else {
      // Not connected to MongoDB - use in-memory admin
      if (username === 'admin') {
        user = inMemoryAdmins[0];
      }
    }
    
    // If user not found
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    let validPassword = false;
    
    if (user === inMemoryAdmins[0]) {
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
      { username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token route
app.get('/api/auth/verify', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ valid: true, user });
  });
});

// Users Routes
app.get('/api/admin/users', async (req, res) => {
  try {
    let users;
    if (mongoose.connection.readyState === 1) {
      users = await Admin.find().select('-password');
    } else {
      users = inMemoryAdmins.map(user => {
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

app.post('/api/admin/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Check if user exists
    let userExists;
    if (mongoose.connection.readyState === 1) {
      userExists = await Admin.findOne({ username });
    } else {
      userExists = inMemoryAdmins.find(user => user.username === username);
    }
    
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Create user
    if (mongoose.connection.readyState === 1) {
      const newUser = new Admin({
        username,
        password: await bcrypt.hash(password, 10)
      });
      await newUser.save();
      const { password: _, ...userResponse } = newUser.toObject();
      res.status(201).json(userResponse);
    } else {
      const newUser = {
        username,
        password: await bcrypt.hash(password, 10)
      };
      inMemoryAdmins.push(newUser);
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
      userId: user ? user.username : (req.visitor ? req.visitor.ipAddress : 'anonymous'),
      name: user ? user.username || visitorName : visitorName,
      code: user ? user.username : (req.visitor ? req.visitor.code : null)
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
app.put('/api/admin/posts/:id/pin', async (req, res) => {
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
app.put('/api/admin/posts/:id/update-likes', async (req, res) => {
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

app.delete('/api/admin/posts/:id', async (req, res) => {
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
      userId: user ? user.username : (req.visitor ? req.visitor.ipAddress : 'anonymous'),
      name: user ? user.username || visitorName : visitorName,
      code: user ? user.username : (req.visitor ? req.visitor.code : null)
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
app.delete('/api/admin/posts/:postId/comments/:commentId', async (req, res) => {
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
app.get('/api/admin/stats', async (req, res) => {
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
      stats.totalUsers = await Admin.countDocuments();
      stats.totalPosts = await Post.countDocuments();
      stats.totalComments = await Comment.countDocuments();
      stats.pinnedPosts = await Post.countDocuments({ isPinned: true });
      
      // Count total likes across all posts
      const posts = await Post.find();
      stats.totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
      
      // Count active users (created in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      stats.activeUsers = await Admin.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    } else {
      // Get stats from in-memory data
      stats.totalUsers = inMemoryAdmins.length;
      stats.totalPosts = inMemoryPosts.length;
      stats.totalComments = inMemoryComments.length;
      stats.pinnedPosts = inMemoryPosts.filter(post => post.isPinned).length;
      stats.totalLikes = inMemoryPosts.reduce((sum, post) => sum + post.likes, 0);
      
      // Count active users (created in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      stats.activeUsers = inMemoryAdmins.filter(user => 
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
app.get('/api/admin/protected', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ message: 'This is a protected route', user });
  });
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
        return new Promise((resolve) => {
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
app.post('/api/notifications', async (req, res) => {
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
app.put('/api/notifications/:id', async (req, res) => {
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
app.delete('/api/notifications/:id', async (req, res) => {
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

// Get website likes
app.get('/api/website/likes', async (req, res) => {
  try {
    let count = 68; // Base number of likes (default)
    let hasLiked = false;
    
    if (mongoose.connection.readyState === 1) {
      // إذا كان متصلاً بقاعدة البيانات، جلب العدد الحقيقي
      count = await WebsiteLike.countDocuments() + 68; // إضافة العدد الأساسي
      
      // التحقق إذا كان المستخدم الحالي قد سجل إعجابه
      if (req.visitor) {
        const existingLike = await WebsiteLike.findOne({ 
          $or: [
            { visitorCode: req.visitor.code },
            { ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress }
          ]
        });
        hasLiked = !!existingLike;
      }
    } else {
      // استخدام البيانات المخزنة في الذاكرة
      if (req.visitor) {
        const existingLike = inMemoryLikes.find(like => 
          like.visitorCode === req.visitor.code || 
          like.ipAddress === (req.headers['x-forwarded-for'] || req.socket.remoteAddress)
        );
        hasLiked = !!existingLike;
      }
      count = inMemoryLikes.length + 68;
    }
    
    // تسجيل معلومات للتصحيح
    console.log('Website likes:', { count, hasLiked });
    
    res.json({ count, hasLiked });
  } catch (error) {
    console.error('Error fetching website likes:', error);
    res.status(500).json({ message: 'Error fetching website likes' });
  }
});

// Toggle website like
app.post('/api/website/like', async (req, res) => {
  try {
    // Need visitor info for tracking likes
    if (!req.visitor) {
      return res.status(400).json({ message: 'Visitor information required' });
    }
    
    const visitorCode = req.visitor.code;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    let hasLiked = false;
    let count = 68; // Base count
    
    if (mongoose.connection.readyState === 1) {
      // Check if visitor already liked the website
      const existingLike = await WebsiteLike.findOne({ 
        $or: [
          { visitorCode },
          { ipAddress }
        ]
      });
      
      if (existingLike) {
        // User already liked, remove the like
        await WebsiteLike.deleteOne({ _id: existingLike._id });
        hasLiked = false;
      } else {
        // Add new like
        await WebsiteLike.create({ visitorCode, ipAddress });
        hasLiked = true;
      }
      
      // Get updated count
      count = await WebsiteLike.countDocuments() + 68;
    } else {
      // In-memory like management
      const likeIndex = inMemoryLikes.findIndex(like => 
        like.visitorCode === visitorCode || like.ipAddress === ipAddress
      );
      
      if (likeIndex !== -1) {
        // User already liked, remove the like
        inMemoryLikes.splice(likeIndex, 1);
        hasLiked = false;
      } else {
        // Add new like
        inMemoryLikes.push({ 
          visitorCode, 
          ipAddress, 
          timestamp: new Date() 
        });
        hasLiked = true;
      }
      
      count = inMemoryLikes.length + 68;
    }
    
    console.log(`User ${hasLiked ? 'liked' : 'unliked'} website:`, { visitorCode });
    
    res.json({ hasLiked, count });
  } catch (error) {
    console.error('Error toggling website like:', error);
    res.status(500).json({ message: 'Error toggling like status' });
  }
});

// Fallback route to serve the frontend in production
app.get('*', (req, res) => {
  // تحويل طلبات API للمسار الصحيح
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  
  // تقديم ملف HTML الرئيسي لجميع الطلبات الأخرى
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.status(404).send('Not found in development mode');
  }
});

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
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // محاولة إنشاء حساب المسؤول الافتراضي
  if (mongoose.connection.readyState === 1) {
    initializeInMemoryAdmin();
  } else {
    console.log('Using in-memory data storage due to database connection issues');
    // تهيئة البيانات الافتراضية في الذاكرة
    initializeInMemoryAdmin();
  }
}); 