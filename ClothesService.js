class ClothesService {
    constructor(knex) {
      this.knex = knex;
    }

    list() {
      let query = this.knex
        .select("clothes_id", "name", "price", "img")
        .from("clothes")
        .where({ 
          type_id: 3,
          gender_id: 1
        })
        .limit(12);
      console.log("additonal check?");
      console.log(query);
      return query.then(data => {
        console.log(data);
        return data;
      });
    };
    
  };
  
  module.exports = ClothesService;
  