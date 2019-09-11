class ClothesService {
  constructor(knex) {
    this.knex = knex;
  }

  list() {
    let query = this.knex
      .select("clothes_id", "name", "price", "img")
      .from("clothes")
      .where({
        horoscope_id: 0,
        type_id: 2
      })
      .limit(300);
    return query.then(data => {
      return data;
    });
  }
}

module.exports = ClothesService;
