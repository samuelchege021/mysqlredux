// models/index.js
import User from './userModel.js';
import { Order, OrderItem } from './orderModel.js';

// Define relationships
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Export all models together
export { User, Order, OrderItem };
