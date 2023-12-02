import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
const prisma = new PrismaClient();
const getListImg = async (req, res) => {
  let data = await prisma.hinh_anh.findMany();
  res.send(data);
};
const getListImgByName = async (req, res) => {
  let { name } = req.params;
  let listImg = await prisma.hinh_anh.findMany({
    where: {
      ten_hinh: {
        contains: name,
      },
    },
  });
  res.send(listImg);
};
const getImgDetail = async (req, res) => {
  let { id } = req.params;

  let dataImg = await prisma.hinh_anh.findUnique({
    where: {
      hinh_id: parseInt(id),
    },
    include: {
      nguoi_dung: true,
    },
  });

  res.send(dataImg);
};
const getComment = async (req, res) => {
  let { id } = req.params;
  let data = await prisma.binh_luan.findMany({
    where: {
      hinh_id: parseInt(id),
    },
  });
  res.send(data);
};
const checkImgSaved = async (req, res) => {
  let { id } = req.params;
  let data = await prisma.luu_anh.findMany({
    where: {
      hinh_id: parseInt(id),
    },
  });
  if (data) {
    res.status(200).send("Đã lưu");
  } else res.status(404).send("Lưu");
};
const getListImgSaved = async (req, res) => {
  let { id } = req.params;
  let data = await prisma.luu_anh.findMany({
    where: {
      nguoi_dung_id: parseInt(id),
    },
    include: {
      hinh_anh: true,
    },
  });

  res.send(data);
};
const getListImgCreate = async (req, res) => {
  let { id } = req.params;
  let data = await prisma.hinh_anh.findMany({
    where: {
      nguoi_dung_id: parseInt(id),
    },
  });
  res.send(data);
};
const deleteImg = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.hinh_anh.deleteMany({
    where: {
      hinh_id: parseInt(id),
    },
  });
  res.status(200).send("Đã xóa thành công!");
};
const createComment = async (req, res) => {
  let { token } = req.headers;
  let decode = decodeToken(token);
  let { nguoi_dung_id } = decode.data.data;
  let { id } = req.params;
  let ngay_binh_luan = new Date().toISOString();
  let noi_dung = req.body.noi_dung;
  const data = await prisma.binh_luan.create({
    data: {
      nguoi_dung_id: nguoi_dung_id,
      hinh_id: parseInt(id),
      ngay_binh_luan,
      noi_dung,
    },
  });
  res.send("thêm thành công");
};
export {
  getListImg,
  getListImgByName,
  getImgDetail,
  getComment,
  checkImgSaved,
  getListImgSaved,
  getListImgCreate,
  deleteImg,
  createComment,
};
