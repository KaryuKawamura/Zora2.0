class CartService {
  constructor(knex) {
    this.knex = knex;
  }

  list(user) {
    if (typeof user !== 'undefined') {
      let query = this.knex.select('clothes_id', 'price')
        .from('cart')
        .orderBy('cart_id', 'asc')

      return query.then((rows) => {
        // console.log(rows, 'pp');
        return rows.map(row => ({
          id: row.clothes_id,
          price: row.price
        }));
      });
    }
  }

};

module.exports = CartService;