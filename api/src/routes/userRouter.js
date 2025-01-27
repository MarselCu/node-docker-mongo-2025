import express from "express";
import { UserService } from "../services/user/UserService.js";
import { PayloadError, InternalError } from "../errors/index.js";
import mongoose from "mongoose";

const userRouter = express.Router();

export const userRoutes = (router) => {
  router.use("/user", userRouter);

  userRouter.get("/:id", (req, res) => {
    const userId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json(new PayloadError('id', 'Invalid id', 'user'));
      return;
    }

    UserService.get(userId)
      .then((user) => res.status(200).json(user))
      .catch((err) =>
        res.status(500).json(new InternalError(`failed to get user`, "user"))
      );
  });

  userRouter.post("/", async (req, res) => {
    UserService.create(req.body)
      .then((user) => res.status(201).json(user))
      .catch((err) => {
        if (err.code === 11000) {
          const msg = `User ${err.keyValue.email} already exists.`;
          const key = Object.keys(err.keyPattern)[0] || "email";
          res.status(400).json(new PayloadError(key, msg, "user"));
          return;
        }

        if (err.name === "ValidationError") {
          const msg = Object.values(err.error).map((e) => e.message);
          const key = Object.keys(err.errors)[0];
          res.status(400).json(new PayloadError(key, msg, "user"));
          return;
        }

        return res
          .status(500)
          .json(new InternalError(`failed to create user`, "user"));
      });
  });

  userRouter.put("/:id", (req, res) => {
    const userId = req.params.id;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json(new PayloadError('id', 'Invalid id', 'user'));
      return;
    }

    UserService.update(userId, data)
      .then((user) => res.status(200).json(user))
      .catch((err) =>
        res.status(500).json(new InternalError(`failed to update user`, "user"))
      );
  });

  userRouter.delete("/:id", (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json(new PayloadError('id', 'Invalid id', 'user'));
      return;
    }
      
    UserService.delete(userId)
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ message: `User ${userId} deleted successfully` });
        } else {
          res.status(404).json({ message: `User ${userId} not found` });
        }
      })
      .catch((err) =>
        res.status(500).json(new InternalError("failed to delete user", "user"))
      );
  });
};
