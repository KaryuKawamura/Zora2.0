const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);
const express = require('express');

class CartRouter {
  constructor(cartService) {
    this.cartService = cartService
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    // router.post('/', this.post.bind(this));
    // router.delete('/:id', this.delete.bind(this));
    return router;
  }

  get(req, res) {
    // console.log(req.session)
    // console.log(req.session.passport.user)

    knex('userstable')
      .select('id')
      .where('name', req.session.passport.user)
      .then(rows => {
        // console.log(rows[0].id);
        this.cartService.list(rows[0].id)
          .then((cart) => res.json(cart))
          .catch((err) => res.status(500).json(err));
        })
  }


  

  // post(req, res) {
  //   return this.cartService.add(req.body.note, req.auth.user)
  //     .then(() => this.cartService.list(req.auth.user))
  //     .then((cart) => res.json(cart))
  //     .catch((err) => res.status(500).json(err));
  // }

  // delete(req, res) {
  //   return this.cartService.remove(req.params.id, req.auth.user)
  //     .then(() => this.cartService.list(req.auth.user))
  //     .then((cart) => res.json(cart))
  //     .catch((err) => res.status(500).json(err));
  // }

}

module.exports = CartRouter;