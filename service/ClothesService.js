class ClothesService {
  constructor(knex) {
    this.knex = knex;
  }
  list() {
    let query = this.knex
      .select("name", "clothes_id", "price", "img", "gender_id")
      .from("clothes")
      .where({
        horoscope_id: 0,
        type_id: 2
      });
    return query.then(rows => {
      return rows.map(row => ({
        name: row.name,
        img: row.img,
        id: row.clothes_id,
        price: row.price
      }));
    });
  }
}
module.exports = ClothesService;
