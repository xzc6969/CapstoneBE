import express from "express";

import {
  addImg,
  getListUsers,
  getUserDetail,
  login,
  signUp,
  updateUser,
  uploadImg,
} from "../controllers/userController.js";
import { upload } from "../controllers/uploadControlelr.js";
import { khoaApi } from "../config/jwt.js";
const userRoutes = express.Router();
// Lấy danh sách người dùng
userRoutes.get("/getListUsers", getListUsers);
// Đăng kí
userRoutes.post("/sign-up", signUp);
// Đăng nhập
userRoutes.post("/log-in", login);
// Lấy thông tin người dùng
userRoutes.get("/getUserDetail/:id", getUserDetail);
// Chỉnh sửa thông tin người dùng
userRoutes.put("/updateUser", khoaApi, updateUser);
// Upload ảnh (Làm thử cho biết để thêm 1 ảnh ở dưới)
userRoutes.post("/uploadImg", upload.single("file"), khoaApi, uploadImg);
// Thêm 1 ảnh
userRoutes.post("/addImg", upload.single("file"),khoaApi, addImg);

export default userRoutes;
