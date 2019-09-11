const express = require("express");

class ProductTypeRouter {
  constructor(productTypeService) {
    this.productTypeService = productTypeService;
  }

  router() {
    let router = express.Router();
    router.get("/:id", this.get.bind(this));
    return router;
  }

  get(req, res) {
    console.log("connecting to productInfo");
    return this.productTypeService
      .list(req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ProductTypeRouter;
