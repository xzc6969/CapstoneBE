import bcrypt from "bcrypt";
import compress_images from "compress-images";

import { PrismaClient } from "@prisma/client";
import { createToken, decodeToken } from "../config/jwt.js";
const prisma = new PrismaClient();
const getListUsers = async (req, res) => {
  let result = await prisma.nguoi_dung.findMany({});
  res.send(result);
};
const signUp = async (req, res) => {
  let { ho_ten, email, mat_khau, tuoi } = req.body;
  // kiểm tra email có tồn tại trong database hay chưa
  let age = parseInt(tuoi);
  let data = await prisma.nguoi_dung.findFirst({
    where: {
      email: email,
    },
  });
  if (!data) {
    // nếu chưa -> tạo user
    // mã hóa pass_word
    let hashPassword = bcrypt.hashSync(mat_khau, 10);
    // hashSync:
    // param 1: pass_word nhận từ FE, postman
    // params 2: mã hóa password mấy lần
    let newData = {
      email,
      mat_khau: hashPassword,
      ho_ten,
      tuoi: age,
      anh_dai_dien: "",
    };

    let result = await prisma.nguoi_dung.create({ data: newData });
    res.status(201).send("Đăng ký thành công");
    return;
  } else {
    res.send("Email đã tồn tại");
  }
};
const login = async (req, res) => {
  let { email, mat_khau } = req.body;

  let checkEmail = await prisma.nguoi_dung.findFirst({
    where: {
      email: email,
    },
  });
  if (checkEmail) {
    let checkPassword = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);
    if (checkPassword) {
      let token = createToken({ data: checkEmail });
      res.send(token);
      return;
    } else {
      res.send("Password không đúng");
      return;
    }
  } else {
    res.status(400).send("Email hoặc password không đúng");
  }
};
const getUserDetail = async (req, res) => {
  let { id } = req.params;
  let data = await prisma.nguoi_dung.findFirst({
    where: {
      nguoi_dung_id: parseInt(id),
    },
  });
  res.send(data);
};
const updateUser = async (req, res) => {
  let { email, mat_khau, ho_ten, tuoi } = req.body;
  let { token } = req.headers;

  let decode = decodeToken(token);
  let { nguoi_dung_id } = decode.data.data;
  let infoUser = await prisma.nguoi_dung.findUnique({
    where: {
      nguoi_dung_id: nguoi_dung_id,
    },
  });

  let hashPassword = bcrypt.hashSync(mat_khau, 10);

  if (infoUser) {
    // speard operator
    let updateData = {
      ...infoUser,
      email,
      mat_khau: hashPassword,
      ho_ten,
      tuoi,
    };

    await prisma.nguoi_dung.update({
      data: updateData,
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
    });
  } else {
    res.send("Không tồn tại user");
  }
  res.send("update thành công");
};
import fs from "fs";

const addImg = async (req, res) => {
  let file = req.file;
  let duong_dan = process.cwd() + "/public/img/" + file.filename;
  let ten_hinh = req.body.ten_hinh;
  let mo_ta = req.body.mo_ta;
  let { token } = req.headers;
  let decode = decodeToken(token);
  let { nguoi_dung_id } = decode.data.data;
  let data = await prisma.hinh_anh.create({
    data: {
      ten_hinh,
      duong_dan,
      mo_ta,
      nguoi_dung_id: nguoi_dung_id,
    },
  });
  res.send("Thêm thành công!")
};
const uploadImg = async (req, res) => {
  let file = req.file;

  compress_images(
    process.cwd() + "/public/img/" + file.filename,
    process.cwd() + "/public/file/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (error, completed, statistic) {
      if (completed) {
        fs.unlinkSync(statistic.input);
        res.send(statistic.path_out_new);
      }
    }
  );
};
export {
  getListUsers,
  signUp,
  login,
  getUserDetail,
  updateUser,
  uploadImg,
  addImg,
};
