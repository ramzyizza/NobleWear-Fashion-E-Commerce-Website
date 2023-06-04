import express from "express";
import {
  PrismaClient,
  product_data_size,
  product_data_productColor,
} from "@prisma/client";

const prisma = new PrismaClient();

export const addProducts = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
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
    res.status(200).json({ success: true });
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
  const NAME: string = req.query.NAME as string;
  const MAX: number = parseInt(req.query.MAX as string);
  const MIN: number = parseInt(req.query.MIN as string);
  const SIZE: product_data_size = req.query.SIZE as product_data_size;
  const COLOR: product_data_productColor = req.query
    .COLOR as product_data_productColor;
  const page: number = parseInt(req.query.PAGE as string);
  const perPage: number = 10;
  try {
    const count = await prisma.product_data.count({
      where: {
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
    });
    const totalProduct = count;
    const totalPages = Math.ceil(count / perPage);
    const response = await prisma.product_data.findMany({
      skip: !isNaN(page) ? page * perPage : 0,
      take: perPage,
      where: {
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
    });
    res.status(200).json({ data: response, totalPages, totalProduct });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
