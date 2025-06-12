import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { sequelize } from './config/db.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/UserRoute.js';
import orderRoute from './Routes/orderRoute.js'
import { notfound, errorhandler } from './middleware/errormiddleware.js';
import { Order,OrderItem } from './models/orderModel.js';
import './models/index.js'
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send("API is running");
});

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoute);

// Error middleware
app.use(notfound);
app.use(errorhandler);

// Start the server AFTER defining app and middleware
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.bgYellow);
    });
  })
  .catch(err => {
    console.error('DB sync error:', err);
  });
