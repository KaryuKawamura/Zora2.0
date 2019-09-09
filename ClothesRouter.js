const express = require("express");

class ClothesRouter {
  constructor(clothesService) {
    this.clothesService = clothesService;
  }

  router() {
    let router = express.Router();

    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    router.delete("/:id", this.delete.bind(this));

    return router;
  }

  get(req, res) {
    console.log("I am routing");
    return this.clothesService
      .list(req.user.id)
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.clothesService
      .add(req.body.note, req.auth.user)
      .then(() => this.clothesService.list(req.auth.user))
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.clothesService
      .update(req.params.id, req.body.note, req.auth.user)
      .then(() => this.clothesService.list(req.auth.user))
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  }

  delete(req, res) {
    return this.clothesService
      .remove(req.params.id, req.auth.user)
      .then(() => this.clothesService.list(req.auth.user))
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ClothesRouter;
