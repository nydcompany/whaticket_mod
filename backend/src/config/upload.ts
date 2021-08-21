import path from "path";
import multer from "multer";

const publicFolder = path.resolve(__dirname, "..", "..", "public");

export default {
  directory: publicFolder,

  storage: multer.diskStorage({
    destination: publicFolder,
    filename(req, file, cb) {
      // const fileName = new Date().getTime() + path.extname(file.originalname);
      // Send file starting with filename #120 by esteves67: https://github.com/canove/whaticket/pull/120/commits/584b962d1d9f677cf2154028f826d2ad0c758231
      var arquivo = file.originalname;
      const fileName = arquivo.substring(0, arquivo.lastIndexOf(".")) + '-' + new Date().getTime() + path.extname(file.originalname);

      return cb(null, fileName);
    }
  })
};
