import { Request, Response } from 'express';

import mongoose from 'mongoose';
import Bike from '../bike/bike.model';
import { orderService } from './order.service';
const createOrder = async (req: Request, res: Response) => {
  try {
    // get the productId from body
    const productId = req.body.product;
    // check if the productId is valid _id from bikes collection
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid product ID',
      });
    }
    const bike = await Bike.findById(productId);
    const quantity = bike?.quantity as number;

    // check if product availabe in stock searching quantity
    if (req.body.quantity > quantity) {
      return res.status(404).json({
        success: false,
        message: 'insufficient stock',
      });
    }

    // finally order a bike
    const payload = req.body;
    const result = await orderService.createOrder(payload);

    res.status(200).json({
      status: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    // handling error for invalid input
    if (error.name === 'ValidationError' && error.errors) {
      const field = Object.keys(error.errors)[0];
      if (error.errors[field].name === 'CastError') {
        const invalidValue = error.errors[field].value;
        return res.json({
          message: `Invalid input for ${field}: ${invalidValue}`,
          success: false,
        });
      }
    }
    //handling error with giving suggesestions
    res.status(500).json({
      message: error._message,
      success: false,
      error: { name: error.name, errors: error.errors },
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

export const orderController = {
  createOrder,
};
