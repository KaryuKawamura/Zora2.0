class ProductService {
  constructor(knex) {
    this.knex = knex;
  }

  list(id) {
    let query = this.knex
      .select("name", "price", "img", "gender_id")
      .from("clothes")
      .where({ clothes_id: id });
    // console.log(query);
    return query.then(data => {
      // console.log(data);
      return data.map(row => ({
        name: row.name,
        img: row.img,
        id: row.clothes_id,
        price: row.price
      }));
    });
  }
}

module.exports = ProductService;
