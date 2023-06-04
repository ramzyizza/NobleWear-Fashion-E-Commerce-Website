// import express from "express";
// import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const getCartItems = async (
//   req: express.Request,
//   res: express.Response
// ): Promise<void> => {
//   try {
//     const response = await prisma.SHOPPING_CART.findMany({
//       where: {
//         USER_ID: req.body.USER_ID,
//       },
//     });
//     res.status(200).json(response);
//   } catch (error: any) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // // query
// // export const addCartItems = async (
// //   req: express.Request,
// //   res: express.Response
// // ): Promise<void> => {
// //   try {
// //     const response = await prisma.SHOPPING_CART.upsert({
// //       where: {
// //         USER_ID_PRODUCT_ID: {
// //           USER_ID: req.body.USER_ID,
// //           PRODUCT_ID: req.body.PRODUCT_ID,
// //         },
// //       },
// //       update: {
// //         QUANTITY: req.body.QUANTITY,
// //         SIZE: req.body.SIZE,
// //         COLOR: req.body.COLOR,
// //       },
// //       create: req.body,
// //     });
// //     res.status(200).json(response);
// //   } catch (error: any) {
// //     res.status(500).json({ msg: error.message });
// //   }
// // };

// // // query
// // export const dropCartItems = async (
// //   req: express.Request,
// //   res: express.Response
// // ): Promise<void> => {
// //   try {
// //     const response = await prisma.SHOPPING_CART.delete({
// //       where: {
// //         USER_ID_PRODUCT_ID: {
// //           USER_ID: req.body.USER_ID,
// //           PRODUCT_ID: req.body.PRODUCT_ID,
// //         },
// //       },
// //     });
// //     res.status(200).json(response);
// //   } catch (error: any) {
// //     res.status(500).json({ msg: error.message });
// //   }
// // };

// // // query
// // export const editCartItems = async (
// //   req: express.Request,
// //   res: express.Response
// // ): Promise<void> => {
// //   try {
// //     const response = await prisma.SHOPPING_CART.update({
// //       where: {
// //         USER_ID_PRODUCT_ID: {
// //           USER_ID: req.body.USER_ID,
// //           PRODUCT_ID: req.body.PRODUCT_ID,
// //         },
// //       },
// //       data: {
// //         QUANTITY: req.body.QUANTITY,
// //         SIZE: req.body.SIZE,
// //         COLOR: req.body.COLOR,
// //       },
// //     });
// //     res.status(200).json(response);
// //   } catch (error: any) {
// //     res.status(500).json({ msg: error.message });
// //   }
// // };
