const express = require("express");

class ClothesTrendRouter {
  constructor(clothesTrendService) {
    this.clothesTrendService = clothesTrendService;
  }

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    return router;
  }

  get(req, res) {
    console.log("I am routing");
    return this.clothesTrendService
      .list(req.user.id)
      .then(clothes => res.json(clothes))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ClothesTrendRouter;
