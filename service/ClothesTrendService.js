class ClothesTrendService {
  constructor(knex) {
    this.knex = knex;
  }

  list(id) {
    console.log("Fucntion fired");

    let query = this.knex
      .select("clothes_id", "name", "price", "img", "style_id", "type_id", "gender_id")
      .from("clothes")
      .where({
        type_id: 2
      })
      .limit(360);
    console.log("Hey this is trend");
    return query.then(data => {
      // console.log(data);
      return data;
    });
  }
}

module.exports = ClothesTrendService;
