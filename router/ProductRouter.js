const express = require("express");

class ProductRouter {
    constructor(productService) {
        this.productService = productService;
    };

    router() {
        let router = express.Router();
        router.get("/:id", this.get.bind(this));
        return router;
    };

    get(req, res) {
        console.log("connecting to productInfo");
        return this.productService.list(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    };

};

module.exports = ProductRouter;