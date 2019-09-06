class ClothesService {
  constructor(knex) {
    this.knex = knex;
  }

  list(user) {
    if (typeof user !== 'undefined') {
      let query = this.knex.select('name', 'price')
        .from('clothesmale')
        .orderBy('clothes.id', 'asc')

      return query.then((rows) => {
        console.log(rows, 'pp');
        return rows.map(row => ({
          id: row.id,
          content: row.content
        }));
      });
    } else {
      let query = this.knex.select('users.username', 'notes.id', 'content')
        .from('notes')
        .innerJoin('users', 'notes.user_id', 'users.id');

      return query.then((rows) => {
        console.log(rows)
        const result = {};
        rows.forEach(row => {
          if (typeof result[row.username] === 'undefined') {
            result[row.username] = [];
          }
          result[row.username].push({
            id: row.id,
            content: row.content
          });
        });
        return result;
      });
    }
  }

};

module.exports = ClothesService;