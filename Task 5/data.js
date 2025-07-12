// Mock data for the blog application
const authors = [
    {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah@techblog.com',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        bio: 'Full-stack developer passionate about React and modern web technologies.',
        verified: true,
    },
    {
        id: '2',
        name: 'Marcus Johnson',
        email: 'marcus@techblog.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        bio: 'DevOps engineer and cloud architecture specialist.',
        verified: true,
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        email: 'elena@techblog.com',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        bio: 'UX designer turned frontend developer with a focus on accessibility.',
        verified: true,
    },
];

const categories = [
    { id: '1', name: 'Frontend', slug: 'frontend', color: '#3B82F6', description: 'Frontend development and UI/UX' },
    { id: '2', name: 'Backend', slug: 'backend', color: '#8B5CF6', description: 'Server-side development and APIs' },
    { id: '3', name: 'DevOps', slug: 'devops', color: '#F59E0B', description: 'Deployment and infrastructure' },
    { id: '4', name: 'Mobile', slug: 'mobile', color: '#10B981', description: 'Mobile app development' },
    { id: '5', name: 'AI/ML', slug: 'ai-ml', color: '#EF4444', description: 'Artificial Intelligence and Machine Learning' },
];

const tags = [
    { id: '1', name: 'React', slug: 'react' },
    { id: '2', name: 'TypeScript', slug: 'typescript' },
    { id: '3', name: 'JavaScript', slug: 'javascript' },
    { id: '4', name: 'Node.js', slug: 'nodejs' },
    { id: '5', name: 'CSS', slug: 'css' },
    { id: '6', name: 'Performance', slug: 'performance' },
    { id: '7', name: 'Architecture', slug: 'architecture' },
    { id: '8', name: 'Tutorial', slug: 'tutorial' },
];

const articles = [
    {
        id: '1',
        title: 'Building Scalable React Applications with TypeScript',
        content: `<h1>Building Scalable React Applications with TypeScript</h1>

<p>TypeScript has become an essential tool for building large-scale React applications. In this comprehensive guide, we'll explore the best practices and patterns that make your React codebase more maintainable and scalable.</p>

<h2>Why TypeScript Matters</h2>

<p>TypeScript provides static type checking that catches errors at compile time rather than runtime. This is particularly valuable in React applications where props drilling and component composition can become complex.</p>

<h2>Setting Up Your TypeScript React Project</h2>

<p>Start with a solid foundation by configuring your TypeScript project properly:</p>

<pre><code>// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}</code></pre>

<h2>Component Patterns</h2>

<h3>Functional Components with Proper Typing</h3>

<pre><code>interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC&lt;ButtonProps&gt; = ({ 
  children, 
  variant, 
  onClick, 
  disabled = false 
}) => {
  return (
    &lt;button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    &gt;
      {children}
    &lt;/button&gt;
  );
};</code></pre>

<h3>Generic Components</h3>

<p>Generic components allow for reusable logic while maintaining type safety:</p>

<pre><code>interface ListProps&lt;T&gt; {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List&lt;T&gt;({ items, renderItem, keyExtractor }: ListProps&lt;T&gt;) {
  return (
    &lt;ul&gt;
      {items.map((item) => (
        &lt;li key={keyExtractor(item)}&gt;
          {renderItem(item)}
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

<h2>State Management</h2>

<p>Using TypeScript with state management libraries like Redux Toolkit:</p>

<pre><code>interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction&lt;User&gt;) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});</code></pre>

<h2>Performance Considerations</h2>

<p>TypeScript compilation can impact build times. Optimize your setup:</p>

<ol>
<li>Use <code>skipLibCheck</code> for faster compilation</li>
<li>Implement incremental compilation with <code>tsBuildInfoFile</code></li>
<li>Use project references for monorepos</li>
<li>Consider using SWC or esbuild for faster builds</li>
</ol>

<h2>Testing with TypeScript</h2>

<p>Ensure your tests are also type-safe:</p>

<pre><code>import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with correct text', () => {
  const handleClick = jest.fn();
  render(
    &lt;Button variant="primary" onClick={handleClick}&gt;
      Click me
    &lt;/Button&gt;
  );
  
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});</code></pre>

<h2>Conclusion</h2>

<p>TypeScript transforms React development by providing compile-time safety, better IDE support, and improved developer experience. Start small, gradually add types to your existing codebase, and follow these patterns for scalable applications.</p>`,
        excerpt: 'Learn how to build scalable React applications using TypeScript with best practices, patterns, and performance optimizations.',
        author: authors[0],
        category: categories[0],
        tags: [tags[0], tags[1], tags[6]],
        publishedAt: '2024-01-15T10:00:00Z',
        readingTime: 8,
        imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true,
        views: 1250,
        likes: 89,
    },
    {
        id: '2',
        title: 'Optimizing Web Performance: A Complete Guide',
        content: `<h1>Optimizing Web Performance: A Complete Guide</h1>

<p>Web performance is crucial for user experience and business success. In this guide, we'll explore various techniques to optimize your web applications for speed and efficiency.</p>

<h2>Core Web Vitals</h2>

<p>Understanding Google's Core Web Vitals is essential:</p>

<ul>
<li><strong>Largest Contentful Paint (LCP)</strong>: Measures loading performance</li>
<li><strong>First Input Delay (FID)</strong>: Measures interactivity</li>
<li><strong>Cumulative Layout Shift (CLS)</strong>: Measures visual stability</li>
</ul>

<h2>Image Optimization</h2>

<p>Images often account for the majority of a page's weight:</p>

<pre><code>&lt;img 
  src="image.webp" 
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
/&gt;</code></pre>

<p>Use modern formats like WebP and AVIF for better compression.</p>

<h2>Code Splitting</h2>

<p>Split your JavaScript bundles to load only what's needed:</p>

<pre><code>const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;LazyComponent /&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>

<h2>Caching Strategies</h2>

<p>Implement effective caching at multiple levels:</p>

<ol>
<li><strong>Browser caching</strong> with proper headers</li>
<li><strong>CDN caching</strong> for static assets</li>
<li><strong>Service Worker caching</strong> for offline functionality</li>
</ol>

<h2>Bundle Analysis</h2>

<p>Use tools like webpack-bundle-analyzer to identify optimization opportunities:</p>

<pre><code>npx webpack-bundle-analyzer build/static/js/*.js</code></pre>

<h2>Database Optimization</h2>

<ul>
<li>Use indexes appropriately</li>
<li>Implement query optimization</li>
<li>Consider database caching solutions</li>
</ul>

<h2>Monitoring</h2>

<p>Set up performance monitoring to track real user metrics:</p>

<pre><code>import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);</code></pre>

<p>Performance optimization is an ongoing process that requires constant monitoring and improvement.</p>`,
        excerpt: 'Comprehensive guide to web performance optimization covering Core Web Vitals, image optimization, code splitting, and monitoring.',
        author: authors[1],
        category: categories[0],
        tags: [tags[5], tags[7]],
        publishedAt: '2024-01-12T14:30:00Z',
        readingTime: 12,
        imageUrl: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true,
        views: 890,
        likes: 67,
    },
    {
        id: '3',
        title: 'Modern CSS Techniques for 2024',
        content: `<h1>Modern CSS Techniques for 2024</h1>

<p>CSS continues to evolve with new features that make styling more powerful and flexible. Let's explore the latest techniques that every developer should know.</p>

<h2>Container Queries</h2>

<p>Container queries allow styles to respond to the size of a container rather than the viewport:</p>

<pre><code>.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}</code></pre>

<h2>CSS Grid Subgrid</h2>

<p>Subgrid allows child elements to participate in their parent's grid:</p>

<pre><code>.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.child {
  display: grid;
  grid-template-columns: subgrid;
}</code></pre>

<h2>Advanced Selectors</h2>

<p>New selectors provide more precise targeting:</p>

<pre><code>/* :has() selector */
.card:has(.featured) {
  border: 2px solid gold;
}

/* :is() selector */
:is(h1, h2, h3):hover {
  color: blue;
}</code></pre>

<h2>Custom Properties (CSS Variables)</h2>

<p>Advanced usage of CSS custom properties:</p>

<pre><code>:root {
  --primary-hue: 220;
  --primary-saturation: 100%;
  --primary-lightness: 50%;
  --primary: hsl(var(--primary-hue) var(--primary-saturation) var(--primary-lightness));
}

.theme-dark {
  --primary-lightness: 70%;
}</code></pre>

<h2>Cascade Layers</h2>

<p>Control the cascade with @layer:</p>

<pre><code>@layer reset, base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .button { padding: 0.5rem 1rem; }
}</code></pre>

<p>These modern CSS features enable more maintainable and flexible stylesheets.</p>`,
        excerpt: 'Explore the latest CSS features including container queries, subgrid, advanced selectors, and cascade layers for modern web development.',
        author: authors[2],
        category: categories[0],
        tags: [tags[4], tags[7]],
        publishedAt: '2024-01-10T16:45:00Z',
        readingTime: 6,
        imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false,
        views: 445,
        likes: 32,
    },
    {
        id: '4',
        title: 'Building RESTful APIs with Node.js and Express',
        content: `<h1>Building RESTful APIs with Node.js and Express</h1>

<p>Learn how to build robust and scalable RESTful APIs using Node.js and Express framework with best practices and security considerations.</p>

<h2>Project Setup</h2>

<p>Start by initializing your Node.js project:</p>

<pre><code>npm init -y
npm install express mongoose helmet cors dotenv
npm install -D nodemon @types/node typescript</code></pre>

<h2>Basic Express Server</h2>

<pre><code>const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});</code></pre>

<h2>RESTful Route Structure</h2>

<p>Follow REST conventions for your API endpoints:</p>

<pre><code>// Users routes
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);</code></pre>

<h2>Error Handling</h2>

<p>Implement comprehensive error handling:</p>

<pre><code>class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

app.use(globalErrorHandler);</code></pre>

<h2>Input Validation</h2>

<p>Use middleware for request validation:</p>

<pre><code>const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

app.post('/api/users', validateUser, createUser);</code></pre>

<h2>Authentication with JWT</h2>

<pre><code>const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};</code></pre>

<h2>Database Integration</h2>

<p>Connect to MongoDB using Mongoose:</p>

<pre><code>const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);</code></pre>

<h2>API Documentation</h2>

<p>Document your API using tools like Swagger:</p>

<pre><code>/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */</code></pre>

<p>Building RESTful APIs requires attention to security, performance, and maintainability.</p>`,
        excerpt: 'Complete guide to building RESTful APIs with Node.js and Express, covering authentication, validation, error handling, and best practices.',
        author: authors[1],
        category: categories[1],
        tags: [tags[3], tags[6], tags[7]],
        publishedAt: '2024-01-08T09:15:00Z',
        readingTime: 15,
        imageUrl: 'https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false,
        views: 723,
        likes: 54,
    },
    {
        id: '5',
        title: 'Advanced JavaScript Patterns and Best Practices',
        content: `<h1>Advanced JavaScript Patterns and Best Practices</h1>

<p>Master advanced JavaScript concepts and patterns that will make you a more effective developer. This guide covers modern ES6+ features, design patterns, and performance optimization techniques.</p>

<h2>Modern JavaScript Features</h2>

<h3>Destructuring and Spread Operator</h3>

<pre><code>// Object destructuring with defaults
const { name = 'Anonymous', age = 0 } = user;

// Array destructuring
const [first, second, ...rest] = numbers;

// Spread operator for object merging
const updatedUser = { ...user, lastLogin: new Date() };</code></pre>

<h3>Template Literals and Tagged Templates</h3>

<pre><code>// Template literals
const message = \`Hello \${name}, you have \${count} messages\`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? \`&lt;mark&gt;\${values[i]}&lt;/mark&gt;\` : '');
  }, '');
}

const highlighted = highlight\`Search for \${term} in \${category}\`;</code></pre>

<h2>Async Programming Patterns</h2>

<h3>Promise Patterns</h3>

<pre><code>// Promise.allSettled for handling mixed results
const results = await Promise.allSettled([
  fetchUser(),
  fetchPosts(),
  fetchComments()
]);

// Promise racing with timeout
const fetchWithTimeout = (promise, timeout) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
};</code></pre>

<h3>Async Iterators</h3>

<pre><code>async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(\`\${url}?page=\${page}\`);
    const data = await response.json();
    
    if (data.length === 0) break;
    
    yield data;
    page++;
  }
}

// Usage
for await (const page of fetchPages('/api/posts')) {
  console.log('Processing page:', page);
}</code></pre>

<h2>Design Patterns</h2>

<h3>Module Pattern</h3>

<pre><code>const UserModule = (() => {
  let users = [];
  
  return {
    add(user) {
      users.push(user);
    },
    
    get(id) {
      return users.find(user => user.id === id);
    },
    
    getAll() {
      return [...users]; // Return copy to prevent mutation
    }
  };
})();</code></pre>

<h3>Observer Pattern</h3>

<pre><code>class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}</code></pre>

<h2>Performance Optimization</h2>

<h3>Memoization</h3>

<pre><code>function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFunction = memoize((n) => {
  // Expensive computation
  return n * n;
});</code></pre>

<h3>Debouncing and Throttling</h3>

<pre><code>// Debounce - delay execution until after calls have stopped
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle - limit execution to once per time period
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}</code></pre>

<h2>Error Handling Best Practices</h2>

<pre><code>// Custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// Async error handling wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ValidationError('User not found', 'id');
  }
  res.json(user);
}));</code></pre>

<h2>Testing Patterns</h2>

<pre><code>// Test utilities
const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides
});

// Async testing
describe('User Service', () => {
  test('should fetch user by id', async () => {
    const mockUser = createMockUser();
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockUser });
    
    const user = await userService.getById('1');
    
    expect(user).toEqual(mockUser);
    expect(api.get).toHaveBeenCalledWith('/users/1');
  });
});</code></pre>

<p>These advanced patterns and practices will help you write more maintainable, performant, and robust JavaScript applications.</p>`,
        excerpt: 'Master advanced JavaScript concepts including modern ES6+ features, design patterns, async programming, and performance optimization techniques.',
        author: authors[0],
        category: categories[0],
        tags: [tags[2], tags[5], tags[6]],
        publishedAt: '2024-01-05T11:20:00Z',
        readingTime: 10,
        imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false,
        views: 567,
        likes: 43,
    },
    {
        id: '6',
        title: 'Responsive Web Design: Mobile-First Approach',
        content: `<h1>Responsive Web Design: Mobile-First Approach</h1>

<p>Learn how to create responsive websites that work perfectly on all devices using a mobile-first approach. This comprehensive guide covers modern CSS techniques, flexible layouts, and performance considerations.</p>

<h2>Why Mobile-First?</h2>

<p>Mobile-first design starts with the smallest screen size and progressively enhances the experience for larger screens. This approach ensures:</p>

<ul>
<li>Better performance on mobile devices</li>
<li>Simplified design decisions</li>
<li>Progressive enhancement mindset</li>
<li>Improved accessibility</li>
</ul>

<h2>CSS Grid and Flexbox</h2>

<h3>Mobile-First Grid Layout</h3>

<pre><code>/* Mobile first - single column */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

/* Tablet - two columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop - three columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}</code></pre>

<h3>Flexible Navigation</h3>

<pre><code>/* Mobile navigation */
.nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  height: 100vh;
  background: white;
  transition: left 0.3s ease;
}

.nav.open {
  left: 0;
}

/* Desktop navigation */
@media (min-width: 768px) {
  .nav {
    position: static;
    flex-direction: row;
    width: auto;
    height: auto;
    left: 0;
  }
}</code></pre>

<h2>Responsive Typography</h2>

<pre><code>/* Fluid typography using clamp() */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}

p {
  font-size: clamp(0.875rem, 2.5vw, 1.125rem);
  line-height: 1.6;
}

/* Responsive spacing */
.container {
  padding: clamp(1rem, 5vw, 2rem);
  max-width: min(90%, 1200px);
  margin: 0 auto;
}</code></pre>

<h2>Image Optimization</h2>

<h3>Responsive Images</h3>

<pre><code>&lt;picture&gt;
  &lt;source 
    media="(min-width: 1024px)" 
    srcset="hero-large.webp 1200w, hero-large@2x.webp 2400w"
    sizes="100vw"
  &gt;
  &lt;source 
    media="(min-width: 768px)" 
    srcset="hero-medium.webp 800w, hero-medium@2x.webp 1600w"
    sizes="100vw"
  &gt;
  &lt;img 
    src="hero-small.webp" 
    srcset="hero-small.webp 400w, hero-small@2x.webp 800w"
    sizes="100vw"
    alt="Hero image"
    loading="lazy"
  &gt;
&lt;/picture&gt;</code></pre>

<h3>CSS Background Images</h3>

<pre><code>.hero {
  background-image: url('hero-small.webp');
  background-size: cover;
  background-position: center;
  min-height: 50vh;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-medium.webp');
    min-height: 60vh;
  }
}

@media (min-width: 1024px) {
  .hero {
    background-image: url('hero-large.webp');
    min-height: 70vh;
  }
}</code></pre>

<h2>Touch-Friendly Design</h2>

<pre><code>/* Minimum touch target size */
.button, .link {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Touch-friendly spacing */
.nav-item {
  margin-bottom: 8px;
}

@media (min-width: 768px) {
  .nav-item {
    margin-bottom: 0;
    margin-right: 16px;
  }
}</code></pre>

<h2>Performance Considerations</h2>

<h3>Critical CSS</h3>

<pre><code>/* Inline critical CSS for above-the-fold content */
&lt;style&gt;
  body { font-family: system-ui, sans-serif; margin: 0; }
  .header { background: #fff; padding: 1rem; }
  .hero { min-height: 50vh; background: #f0f0f0; }
&lt;/style&gt;

&lt;!-- Load non-critical CSS asynchronously --&gt;
&lt;link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'"&gt;</code></pre>

<h3>Resource Hints</h3>

<pre><code>&lt;!-- Preconnect to external domains --&gt;
&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link rel="preconnect" href="https://images.pexels.com"&gt;

&lt;!-- Preload important resources --&gt;
&lt;link rel="preload" href="hero-small.webp" as="image"&gt;
&lt;link rel="preload" href="main.js" as="script"&gt;</code></pre>

<h2>Testing Responsive Design</h2>

<h3>CSS for Testing</h3>

<pre><code>/* Debug helper - shows breakpoints */
body::before {
  content: 'Mobile';
  position: fixed;
  top: 0;
  right: 0;
  background: red;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  z-index: 9999;
}

@media (min-width: 768px) {
  body::before { content: 'Tablet'; background: orange; }
}

@media (min-width: 1024px) {
  body::before { content: 'Desktop'; background: green; }
}</code></pre>

<h3>JavaScript for Device Detection</h3>

<pre><code>// Detect touch capability
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Detect viewport size changes
const mediaQuery = window.matchMedia('(min-width: 768px)');

function handleViewportChange(e) {
  if (e.matches) {
    // Desktop layout
    document.body.classList.add('desktop');
  } else {
    // Mobile layout
    document.body.classList.remove('desktop');
  }
}

mediaQuery.addListener(handleViewportChange);
handleViewportChange(mediaQuery);</code></pre>

<h2>Accessibility in Responsive Design</h2>

<pre><code>/* Focus management for mobile navigation */
.nav-toggle:focus,
.nav-link:focus {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}</code></pre>

<p>Responsive design is essential for modern web development. By following a mobile-first approach and considering performance and accessibility, you can create websites that provide excellent user experiences across all devices.</p>`,
        excerpt: 'Complete guide to responsive web design using a mobile-first approach, covering CSS Grid, Flexbox, responsive images, and performance optimization.',
        author: authors[2],
        category: categories[0],
        tags: [tags[4], tags[5], tags[7]],
        publishedAt: '2024-01-03T13:45:00Z',
        readingTime: 9,
        imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false,
        views: 389,
        likes: 28,
    }
];

const comments = [
    {
        id: '1',
        articleId: '1',
        author: 'John Doe',
        content: 'Great article! The TypeScript patterns you shared are really helpful for large projects.',
        timestamp: '2024-01-16T08:30:00Z',
        likes: 12,
        replies: [
            {
                id: '2',
                articleId: '1',
                author: 'Sarah Chen',
                content: 'Thanks John! I\'m glad you found it useful. Let me know if you have any questions about implementing these patterns.',
                timestamp: '2024-01-16T10:15:00Z',
                likes: 5,
                replies: [],
            },
        ],
    },
    {
        id: '3',
        articleId: '1',
        author: 'Mike Wilson',
        content: 'The generic components section was particularly enlightening. I\'ve been struggling with type safety in reusable components.',
        timestamp: '2024-01-16T14:20:00Z',
        likes: 8,
        replies: [],
    },
    {
        id: '4',
        articleId: '2',
        author: 'Lisa Garcia',
        content: 'Excellent performance guide! The Core Web Vitals explanation was spot on.',
        timestamp: '2024-01-13T11:45:00Z',
        likes: 15,
        replies: [],
    },
];