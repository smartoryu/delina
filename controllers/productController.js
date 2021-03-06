const db = require("../connection");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getProduct: (req, res) => {
    let sql = `SELECT * FROM data_product`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      console.log(result);

      res.status(200).send({ dataProduct: result });
    });
  },

  postProduct: (req, res) => {
    // const path = "/user/images";
    // const upload = uploader(path, "ImageProduct").fields([{ name: "image" }]);
    // upload(req, res, err => {
    //   if (err)
    //     res
    //       .status(500)
    //       .json({ message: "Upload Picture Failed", error: err.message });
    //   const { image } = req.files;
    //   let imagePath = [];
    //   if (image) {
    //     image.forEach(image => {
    //       imagePath.push(path + "/" + image.fileName);
    //     });
    //   }
    //   const data = JSON.parse(req.body.data);
    //   try {
    //     let sql = "INSERT INTO data_product SET ?";
    //     db.query(sql, data, (err, resProduct) => {
    //       if (err)
    //         res
    //           .status(500)
    //           .json({
    //             message: "Upload data product failed",
    //             error: err.message
    //           });
    //       let arrImages = [];
    //       imagePath.forEach(image => {
    //         arrImages.push([resProduct, image]);
    //       });
    //       let sql = `SELECT * FROM data_product`;
    //       db.query(sql, [arrImages], (err, resImage) => {
    //         if (err)
    //           res
    //             .status(500)
    //             .json({ message: "upload product failed", error: err.message });
    //         res.status(200).send({ dataProduct: resImage });
    //       });
    //     });
    //   } catch (err) {
    //     console.log(err);
    //     image && imagePath.forEach(image => fs.unlinkSync("./public" + image));
    //     return res
    //       .status(500)
    //       .json({
    //         message:
    //           "there's something error on your server. please contact administrator"
    //       });
    //   }
    // });
    // ====================================================================
    try {
      const upload = uploader(path, "ImageProduct").fields([{ name: "image" }]);
      upload(req, res, err => {
        if (err) {
          return res
            .status(500)
            .json({ message: "upload gagal", error: err.message });
        }
        const { image } = req.files;
        const imagePath = [];
        const data = JSON.parse(req.body.data);
        image1 = data.image1;
        image2 = data.image2;
        const images = [...image1, ...image2];
        if (image) {
          images.forEach(images => {
            imagePath.push(images ? path + "/" + image.fileName : null);
          });
        }
        // const { image } = req.files;
        // const data = JSON.parse(req.body.data);
        // console.log(image);
        // if (image) {
        //   for (let i = 0; i < image.length; i++) {
        //     data[`image${i + 1}`] = path + "/" + image[i].filename;
        //   }
        // }
        var sql = "INSERT INTO data_product SET ?";
        db.query(sql, data, (err, result) => {
          if (err) {
            log(err.message);
            return res.status(500).json({
              message: "there's an error on the server",
              error: err.message
            });
          }
          sql = `SELECT * FROM data_product`;
          db.query(sql, (err, result1) => {
            if (err) res.status(500).send(err);
            res.status(200).send({ dataProduct: result1 });
          });
        });
      });
    } catch (error) {
      res.send(error);
    }
  },

  editProduct: (req, res) => {
    let userId = req.params.id;
    var sql = `SELECT * from data_product where id=${userId}`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      if (results.length) {
        const path = "/user/images";
        const upload = uploader(path, "ImageProduct").fields([
          { name: "image" }
        ]);
        upload(req, res, err => {
          if (err) {
            return res.status(500).json({
              message: "there's something error on your server",
              error: err.message
            });
          }
          const { image } = req.files;
          const imagePath = image ? path + "/" + image[0].fileName : null;
          const data = JSON.parse(req.body.data);

          try {
            if (imagePath) {
              data.image1 = imagePath;
              data.image2 = imagePath;
            }
            sql = `UPDATE data_product set ? WHERE id=${req.params.id}`;
            db.query(sql, data, (err, result) => {
              if (err) {
                if (imagePath) {
                  fs.unlinkSync("./public" + imagePath);
                }
                return res.status(500).json({
                  message: "there's an error on the server",
                  error: err.message
                });
              }
              if (imagePath) {
                if (results[0].image) {
                  fs.unlinkSync("./public" + results[0].image);
                }
              }
              sql = `SELECT * FROM data_product`;
              db.query(sql, (err, result3) => {
                if (err) res.status(500).send(err);
                res.status(200).send({ dataProduct: result3 });
              });
            });
          } catch (err) {
            console.log(err.message);
            return res.status(500).json({
              message: "there's an error",
              error: err.message
            });
          }
        });
      }
    });
  },

  deleteProduct: (req, res) => {
    var sql = `DELETE FROM data_product where id=${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({
          message: "there's an error on the server",
          err: err.message
        });
      }
      console.log(result);
      sql = `SELECT * FROM data_product`;
      db.query(sql, (err, result2) => {
        if (err) res.status(500).send(err);
        res.status(200).send({ dataProduct: result2 });
      });
    });
  }
};

// postProduct: (req, res) => {
//   try {
//     const path = "/user/images";
//     const upload = uploader(path, "ImageProduct").fields([{ name: "image" }]);

//     upload(req, res, err => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ message: "upload gagal", error: err.message });
//       }
//       // const { image } = req.files;
//       // const imagePath = image ? path + "/" + image[0].fileName : null;
//       // const imagePath1 = image ? path + "/" + image[0].fileName : null;
//       // const data = JSON.parse(req.body.data);
//       // data.image1 = imagePath;
//       // data.image2 = imagePath1;
//       const { image } = req.files;
//       const data = JSON.parse(req.body.data);
//       console.log(image);

//       if (image) {
//         for (let i = 0; i < image.length; i++) {
//           data[`image${i + 1}`] = path + "/" + image[i].filename;
//         }
//       }

//       var sql = "INSERT INTO data_product SET ?";
//       db.query(sql, data, (err, result) => {
//         if (err) {
//           log(err.message);
//           return res.status(500).json({
//             message: "there's an error on the server",
//             error: err.message
//           });
//         }
//         sql = `SELECT * FROM data_product`;
//         db.query(sql, (err, result1) => {
//           if (err) res.status(500).send(err);
//           res.status(200).send({ dataProduct: result1 });
//         });
//       });
//     });
//   } catch (error) {
//     res.send(error);
//   }
// },
