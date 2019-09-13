const express = require("express");

class ClothesTrendRouter {
  constructor(clothesTrendService) {
    this.clothesTrendService = clothesTrendService;
  }

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));

    return router;
  }

  get(req, res) {
    // console.log("I am routing get");
    return this.clothesTrendService
      .list()
      .then(clothes => res.json(clothes))
      .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    // console.log(req.body.id, "<====== ID");
    // console.log("I am routing post");
    return this.clothesTrendService
      .list(req.body.id)
      .then(clothes => res.json(clothes))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ClothesTrendRouter;
