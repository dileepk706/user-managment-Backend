const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder for storing uploaded files
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb('ERROR : Only image files are allowed!');
    }
    cb(null, true);
  };



const upload = multer({ storage: storage,fileFilter:imageFilter });

module.exports=upload