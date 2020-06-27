const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers");

router.get("/product", ProductController.getProduct);
router.post("/postProduct", ProductController.postProduct);
router.put("/editProduct/:id", ProductController.editProduct);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);

module.exports = router;
