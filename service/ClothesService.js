class ClothesService {
  constructor(knex) {
    this.knex = knex;
  }

  list() {

    // let horoscopeIdQuery = this.knex
    //   .select('id')
    //   .from('horoscope')
    //   .where('horoscope', horoscope)

    // return horoscopeIdQuery.then(data => {

      let query = this.knex
        .select("name", "clothes_id", "price", "img", "gender_id", "horoscope_id")
        .from("clothes")
        // .join("horoscope", { horoscope_id: data[0].id })
        .where({
          horoscope_id: 1,
          type_id: 2
        });

      return query.then(rows => {
        // console.log(rows)
        return rows.map(row => ({
          name: row.name,
          img: row.img,
          id: row.clothes_id,
          price: row.price
        }));
      });
    // });
  }


}
module.exports = ClothesService;
