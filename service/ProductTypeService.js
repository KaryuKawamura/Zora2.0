class ProductTypeService {
  constructor(knex) {
    this.knex = knex;
  }

  list(id) {
    let query = this.knex
      .select("name", "price", "img", "gender_id")
      .from("clothes")
      .where({
        style_id: 3,
        type_id: id
      });
    // console.log(query);
    return query.then(data => {
      // console.log(data);
      return data;
    });
  }
}

module.exports = ProductTypeService;
