const express = require('express');

class CartRouter {
  constructor(cartService) {
    this.cartService = cartService
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.delete('/:id', this.delete.bind(this));
    return router;
  }

  get(req, res) {
    // console.log(req.session.passport.user)
    return this.cartService
    .list(req.session.passport.user)
    .then((cart) => res.json(cart))
    .catch((err) => res.status(500).json(err));
  }

  post(req, res) {
    return this.cartService
    .add(req.body.clothes_id, req.session.passport.user)
    .then((msg) => res.json(msg))
    .catch((err) => res.status(500).json(err));
  }

  delete(req, res) {
    return this.cartService
    .remove(req.params.id, req.session.passport.user)
    .then((msg) => res.json(msg))
    .catch((err) => res.status(500).json(err));
  }

}

module.exports = CartRouter;