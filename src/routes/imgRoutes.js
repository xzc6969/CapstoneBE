import express from "express";

import {
  checkImgSaved,
  createComment,
  deleteImg,
  getComment,
  getImgDetail,
  getListImg,
  getListImgByName,
  getListImgCreate,
  getListImgSaved,
} from "../controllers/imgController.js";
import { khoaApi } from "../config/jwt.js";
const imgRoutes = express.Router();
// Lấy danh sách ảnh
imgRoutes.get("/getListImg", getListImg);
// Tìm kiếm ảnh theo tên
imgRoutes.get("/list-img-by-name/:name", getListImgByName);
// Lấy thông tin ảnh và người tạo ảnh
imgRoutes.get("/getImgDetail/:id", getImgDetail);
// Lấy thông tin bình luận
imgRoutes.get("/getComment/:id", getComment);
// Kiểm tra ảnh đã lưu hay chưa
imgRoutes.get("/checkImgSaved/:id", checkImgSaved);
// Lấy danh sách ảnh đã lưu theo user id
imgRoutes.get("/getListImgSaved/:id", getListImgSaved);
// Lấy danh sách ảnh đã tạo theo user id
imgRoutes.get("/getListImgCreate/:id", getListImgCreate);
// Xóa 1 ảnh
imgRoutes.delete("/deleteImg/:id", khoaApi, deleteImg);
// Luw thông tin bình luận của người dùng
imgRoutes.post("/createComment/:id", khoaApi, createComment);

export default imgRoutes;
