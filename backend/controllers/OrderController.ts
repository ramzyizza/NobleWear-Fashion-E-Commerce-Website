import express from "express";
import {
  PrismaClient,
  product_data_size,
  product_data_productColor,
} from "@prisma/client";

const prisma = new PrismaClient();

export const getOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const order_id: number = parseInt(req.query.order_id as string);
    const response = await prisma.order_data.findFirst({
      where: {
        order_id: order_id,
      },
    });
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const createOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const orderData = {
      transaction_status: req.body.transaction_status as string,
      quantity: parseInt(req.body.quantity as string),
      total_price: parseFloat(req.body.total_price as string),
      product_id: parseInt(req.body.product_id as string),
      shipper_id: parseInt(req.body.shipper_id as string),
      seller_id: parseInt(req.body.seller_id as string),
      user_id: parseInt(req.body.user_id as string),
      order_date: new Date(),
    };
    const response = await prisma.order_data.create({ data: orderData });
    res.status(200).json({ data: response, success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

export const updateOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const order_id: number = parseInt(req.body.order_id as string);
    const response = await prisma.order_data.update({
      where: {
        order_id: order_id,
      },
      data: {
        transaction_status: req.body.transaction_status,
      },
    });
    res.status(200).json({ data: response, success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
