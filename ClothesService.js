class ClothesService {
  constructor(knex) {
    this.knex = knex;
  }

  list() {
    let query = this.knex
      .select("name", "price", "img")
      .from("clothesmale")
      .where({ type_id: 3 })
      .limit(12);
    console.log("additonal check?");
    console.log(query);
    return query.then(data => {
      console.log(data);
      return data;
    });
  }

  /*else {
      let query = this.knex
        .select("users.username", "notes.id", "content")
        .from("notes")
        .innerJoin("users", "notes.user_id", "users.id");

      return query.then(rows => {
        console.log(rows);
        const result = {};
        rows.forEach(row => {
          if (typeof result[row.username] === "undefined") {
            result[row.username] = [];
          }
          result[row.username].push({
            id: row.id,
            content: row.content
          });
        });
        return result;
      });
    }*/
}

module.exports = ClothesService;
