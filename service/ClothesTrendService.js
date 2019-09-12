class ClothesTrendService {
  constructor(knex) {
    this.knex = knex;
  }

  list(id, sid) {
    // console.log("Fucntion fired");
    // console.log(id);

    let query = this.knex
      .select("clothes_id", "name", "price", "img", "style_id", "type_id")
      .from("clothes")
      .where({
        style_id: id,
        type_id: 2
      })
      .limit(24);
    console.log("Hey this is trend");
    return query.then(data => {
      console.log(data);
      return data;
    });
  }
}

module.exports = ClothesTrendService;
