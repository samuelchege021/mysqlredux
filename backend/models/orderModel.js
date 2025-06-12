import { DataTypes } from 'sequelize';
import {sequelize }from "../config/db.js"; // adjust path as needed
import User from './userModel.js';
const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'User', key: 'id' },
  },
  shippingAddress: {
    type: DataTypes.JSON, // or create a separate table if you prefer normalization
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentResult: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  taxPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  shippingPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isDelivered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deliveredAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// OrderItems as a separate model with foreign key to Order
const OrderItem = sequelize.define('OrderItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Product', key: 'id' },
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Order', key: 'id' },
  },
}, {
  timestamps: true,
});

// // Associations
// Order.hasMany(OrderItem, { foreignKey: 'orderId' });
// OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
// Order.belongsTo(User, { foreignKey: 'userId' });
export { Order, OrderItem };
