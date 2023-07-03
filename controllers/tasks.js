import errorhandler from "../middlewares/error.js";
import { Task } from "../models/tasks.js";
export const newtask = async (req, res, next) => {
  const { title, description } = req.body;
  await Task.create({
    title,
    description,
    user: req.user,
  });
  res.status(201).json({
    success: true,
    message: "task completed",
  });
};
export const getmytask = async (req, res, next) => {
  const userid = req.user._id;
  const tasks = await Task.find({ user: userid });
  res.status(200).json({
    success: true,
    tasks,
  });
};
export const updatetask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    task.iscompleted = !task.iscompleted;
    if (!task) return next(errorhandler("task not found", 404));
    await task.save();
    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deletetask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(errorhandler("task not found", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    next(error);
  }
};
