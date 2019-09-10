const express = require("express");

class ClothesRouter {
  constructor(clothesService) {
    this.clothesService = clothesService;
  };

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    return router;
  };

  get(req, res) {
    console.log("I am routing");
    return this.clothesService
      .list(req.user.id)
      .then(clothes => res.json(clothes))
      .catch(err => res.status(500).json(err));
  };

};

module.exports = ClothesRouter;
