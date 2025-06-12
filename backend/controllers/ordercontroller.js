import asyncHandler from 'express-async-handler';
import { Order, OrderItem } from '../models/orderModel.js';

import { User } from '../models/index.js';


// desc create new order
// @route post/api/orders
// access private

const addOrderItems = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  if (!req.user || !req.user.id) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Create the order
  const order = await Order.create({
    userId: req.user.id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // Create associated order items
  const createdItems = await Promise.all(
    orderItems.map(async (item) => {
      return await OrderItem.create({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        productId: item.product,
        orderId: order.id,
      });
    })
  );
  order.orderItems = createdItems;
  res.status(201).json(order);

});




// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getorderbyid = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
        include: {
            model: User,
            attributes: ['name', 'email']
        }
    });

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});



export {addOrderItems,getorderbyid}