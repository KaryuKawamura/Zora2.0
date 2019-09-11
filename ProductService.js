class ProductService {
    constructor(knex) {
        this.knex = knex;
    };

    list(id) {
        let query = this.knex
            .select("name", "price", "img")
            .from("clothes")
            .where({clothes_id: id});
        // console.log(query);
        return query.then(data => {
            // console.log(data);
            return data;
        });
    };
};

module.exports = ProductService;