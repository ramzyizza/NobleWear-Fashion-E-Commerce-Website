import express from "express";
import {
  PrismaClient,
  product_data_size,
  product_data_productColor,
} from "@prisma/client";
import { url } from "inspector";

const prisma = new PrismaClient();

export const addProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  console.log(req.body);

  const PRODUCT_ID: number = parseInt(req.body.PRODUCT_ID as string);
  const NAME: string = req.body.NAME as string;
  const CATEGORY: string = req.body.CATEGORY as string;
  const PRICE: number = parseFloat(req.body.PRICE as string);
  const CURRENT_PRICE: number = parseFloat(req.body.CURRENT_PRICE as string);
  const DISCOUNT: number = parseFloat(req.body.DISCOUNT as string);
  const QUANTITY: number = parseInt(req.body.QUANTITY as string);
  const SIZE: product_data_size = req.body.SIZE as product_data_size;
  const COLOR: product_data_productColor = req.body
    .COLOR as product_data_productColor;
  try {
    const response = await prisma.product_data.upsert({
      where: {
        product_id: !isNaN(PRODUCT_ID) ? PRODUCT_ID : 0,
      },
      update: {
        name: NAME,
        quantityAvailable: QUANTITY,
        currentPrice: CURRENT_PRICE,
        discount: DISCOUNT,
        productColor: COLOR,
        size: SIZE,
        category: CATEGORY,
        price: PRICE,
      },
      create: {
        name: NAME,
        quantityAvailable: QUANTITY,
        currentPrice: CURRENT_PRICE,
        discount: DISCOUNT,
        productColor: COLOR,
        size: SIZE,
        category: CATEGORY,
        price: PRICE,
      },
    });
    res.status(200).json({ data: response, success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

export const dropProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const response = await prisma.product_data.delete({
      where: {
        product_id: parseInt(req.body.PRODUCT_ID),
      },
    });
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

export const getProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const PRODUCT_ID: number = parseInt(req.query.PRODUCT_ID as string);
  const NAME: string = req.query.NAME as string;
  const MAX: number = parseInt(req.query.MAX as string);
  const MIN: number = parseInt(req.query.MIN as string);
  const SIZE: product_data_size = req.query.SIZE as product_data_size;
  const COLOR: product_data_productColor = req.query
    .COLOR as product_data_productColor;
  try {
    const response = await prisma.product_data.findMany({
      where: {
        product_id: !isNaN(PRODUCT_ID) ? PRODUCT_ID : undefined,
        name: {
          contains: NAME,
        },
        currentPrice: {
          lte: !isNaN(MAX) ? MAX : undefined,
          gte: !isNaN(MIN) ? MIN : undefined,
        },
        size: SIZE,
        productColor: COLOR,
      },
      include: {
        product_image: {
          select: {
            url: true,
          },
        },
        product_review: true, // todos
      },
    });
    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const addImage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const PRODUCT_ID: number = parseInt(req.body.PRODUCT_ID as string);
  const data = {
    url: req.body.URL,
    product_id: PRODUCT_ID,
  };
  try {
    const response = await prisma.product_image.create({
      data: data,
    });
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
