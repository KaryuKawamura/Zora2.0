const express = require("express");

class SuggestionRouter {
    constructor(suggestionService) {
        this.suggestionService = suggestionService;
    };

    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        router.post("/:horoscope/:gender", this.post.bind(this));
        return router;
    };

    get(req, res) {
        console.log("LOADING suggestions");
        return this.suggestionService.listSuggest()
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    };

    post(req, res) {
        console.log("Posting suggestions");
        return this.suggestionService.listSuggest(req.params.horoscope, req.params.gender)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    };
};

module.exports = SuggestionRouter;