import express from "express";
import jwt from "jsonwebtoken";
import { adminModel } from "../model/adminModel.js";

export const adminMiddleware = async (req, res, next) => {
  const headers = req.header.authorization;

  if (!headers || !headers.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "please login first" });
  }

  const token = headers.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const isAdmin = await adminModel.findOne({
      email: data.email,
      _id: data._id,
    });
    console.log(isAdmin);

    if (!isAdmin) {
      return res
        .status(401)
        .json({ msg: "only administator can perform this" });
    }

    req.admin = { adminId: isAdmin._id.toString(), email: isAdmin.email };
    next();
  } catch (error) {
    console.log(error);
  }
};
