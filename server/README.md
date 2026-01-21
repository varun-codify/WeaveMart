# Textile E-commerce Backend

Backend API for the Textile E-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Edit `.env` file with your settings:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/textile-ecommerce
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/textile-ecommerce

# JWT Secret (Change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=4242

# Stripe API Keys (Optional - for payment processing)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. **Start MongoDB:**

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update MONGODB_URI in .env

5. **Seed the database with products:**
```bash
npm run seed
```

6. **Start the server:**
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run at: **http://localhost:4242**

## 📁 Project Structure

```
server/
├── models/          # Mongoose schemas
│   ├── User.js      # User model
│   ├── Product.js   # Product model
│   ├── Order.js     # Order model
│   └── Cart.js      # Cart model
├── routes/          # API routes
│   ├── auth.js      # Authentication routes
│   ├── products.js  # Product CRUD routes
│   ├── orders.js    # Order management routes
│   └── cart.js      # Cart operations routes
├── middleware/      # Custom middleware
│   └── auth.js      # JWT authentication middleware
├── server.js        # Main server file
├── seed.js          # Database seeding script
├── .env             # Environment variables
└── package.json     # Dependencies
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart (requires authentication)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PATCH /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user's orders (requires auth)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status (admin only)

### Stripe Payment
- `GET /config` - Get Stripe publishable key
- `POST /create-payment-intent` - Create payment intent for Stripe

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🗃️ Database Models

### User
- name, email, password (hashed)
- isAdmin (boolean)
- timestamps

### Product
- name, price, category, image
- description, details (fabric, care, dimensions)
- featured (boolean), stock (number)
- timestamps

### Order
- orderNumber, user (ref)
- customerInfo (shipping details)
- items (array of products with quantities)
- total, paymentMethod, paymentStatus
- status (confirmed, processing, shipped, delivered, cancelled)
- timestamps

### Cart
- user (ref)
- items (array of products with quantities)
- timestamps

## 🛠️ Development

**Run in development mode with auto-reload:**
```bash
npm run dev
```

**Reseed database:**
```bash
npm run seed
```

## 🚀 Production Deployment

1. Set strong JWT_SECRET in .env
2. Use MongoDB Atlas for production database
3. Enable HTTPS
4. Set up proper CORS configuration
5. Add rate limiting and security middleware
6. Use environment-specific configs

## 📝 Notes

- Default admin user needs to be created manually or via seed script
- Products are seeded from seed.js file
- LocalStorage is used as fallback if API fails on frontend
- CORS is enabled for all origins (restrict in production)

## 🐛 Troubleshooting

**MongoDB connection failed:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, whitelist your IP address

**Port already in use:**
- Change PORT in .env file
- Kill process using port 4242

**Authentication errors:**
- Verify JWT_SECRET is set in .env
- Check token is being sent in Authorization header

## 📧 Support

For issues and questions, please open an issue on GitHub.
