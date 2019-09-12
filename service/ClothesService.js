class ClothesService {
  constructor(knex) {
    this.knex = knex;
  }
  list() {
    let query = this.knex
      .select("name", "clothes_id", "price", "img")
      .from("clothes")
      // .where({ horoscope_id: 0 })
      .limit(12);
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
