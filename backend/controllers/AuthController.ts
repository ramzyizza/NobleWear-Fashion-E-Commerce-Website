import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwtAuth from "../utils/jwtAuth";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.EMAIL === undefined)
      throw createHttpError.Unauthorized("Email is invalid!");
    const user = await prisma.user_data.findFirst({
      where: {
        user_email: req.body.EMAIL,
      },
    });
    if (user === null)
      throw createHttpError.Unauthorized("Email does not match any user!");
    const checkPassword = bcrypt.compareSync(
      req.body.PASSWORD,
      user!.user_pass!
    );
    if (!checkPassword)
      throw createHttpError.Unauthorized("Password is wrong!");
    const accessToken = await jwtAuth.signAccessToken(user);
    res.status(200).json({ ...user, accessToken, success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    req.body.user_pass = bcrypt.hashSync(req.body.user_pass, 8);
    const user = await prisma.user_data.create({
      data: req.body,
    });
    // req.body.ACCESS_TOKEN = await jwtAuth.signAccessToken(user);
    // res.status(200).json(req.body);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

export const forgot = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    if (req.body.EMAIL === undefined)
      throw createHttpError.Unauthorized("Email is invalid!");
    req.body.PASSWORD = bcrypt.hashSync(req.body.PASSWORD, 8);
    const user = await prisma.user_data.update({
      where: {
        user_email: req.body.EMAIL as string,
      },
      data: { user_pass: req.body.PASSWORD },
    });
    if (user === null)
      throw createHttpError.Unauthorized("Email does not match any user!");

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, success: false });
  }
};
