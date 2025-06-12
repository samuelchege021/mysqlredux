import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/product.js';

import { sequelize } from './config/db.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import {Order,OrderItem }from './models/orderModel.js';


dotenv.config();

const importData = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Drops and recreates all tables

    // Insert users
    const createdUsers = await User.bulkCreate(users, { individualHooks: true }); // Respect bcrypt hashing

    // Get admin user ID for assigning to products
    const adminUser = createdUsers[0].id;

    // Attach adminUser ID to each product
    const sampleProducts = products.map(product => ({
      ...product,
      userId: adminUser, // assumes you have a userId foreign key in productModel
    }));

    await Product.bulkCreate(sampleProducts);

    console.log('Users and Products imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};




// Sample Order Data (you can later replace this with dynamic data if needed)
const sampleOrder = {
  userId: adminUser,
  paymentMethod: 'PayPal',
  shippingAddress: {
    address: '123 Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'USA'
  },
  taxPrice: 10.0,
  shippingPrice: 5.0,
  totalPrice: 115.0,
  isPaid: true,
  paidAt: new Date(),
  isDelivered: false,
};

// Create Order
const createdOrder = await Order.create(sampleOrder);

// Create OrderItems
const orderItems = sampleProducts.slice(0, 2).map(product => ({
  name: product.name,
  qty: 1,
  image: product.image,
  price: product.price,
  productId: product.id, // this must exist
  orderId: createdOrder.id,
}));

await OrderItem.bulkCreate(orderItems);
console.log('Users, Products, and Orders imported'.green.inverse);
const destroyData = async () => {
  try {
    await Product.destroy({ where: {} });
    await User.destroy({ where: {} });
    await OrderItem.destroy({ where: {} });
    await Order.destroy({ where: {} });

    console.log('Users and Products destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
