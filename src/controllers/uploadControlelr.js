import multer, { diskStorage } from 'multer';
export const upload = multer({
    storage: diskStorage({
        //http://localhost:8080/public/img/tên hình
        // node36/public/img
        // process.cwd() -> /duyphuong/Desktop/node38
        // 20_10 -> 20_10_1
        // 20_10 -> 20_10_2
        // getTime => lấy ngày để đặt tên cho image
        // time_image_name
        destination: process.cwd() + "/public/img",
        filename: (req, file, callback) => {
            callback(null, new Date().getTime() + `_${file.originalname}`)
        }
    })
});