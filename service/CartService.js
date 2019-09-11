let userId;

class CartService {

  constructor(knex) {
    this.knex = knex;
  }

  queryUserId(userName) {
    this.knex
      .select('id')
      .from('userstable')
      .where('name', userName)
      .then(rows => {
        userId = rows[0].id;
      });
    return userId;
  }

  /* The list() method is fired when the user goes to /cart.
  It basically takes in the current username and uses it to query for all the clothes in the cart table */

  list(userName) {
    this.queryUserId(userName);
    console.log(userId);
    return this.knex('cart')
      .select('price')
      .where({
        'userstable_id': userId
      })
      .then((rows) => {
        let total;
        let priceArray;
        let reducer = (acc, cV) => acc + cV;
        //Converting and parsing the prices from string to numbers
        priceArray = rows.map(x => Number(x.price.split('$').pop()));
        //Calculate total price of the cart
        total = priceArray.reduce(reducer, 0).toFixed(2);
        let query = this.knex
          .select('clothes.clothes_id', 'clothes.price', 'img', 'name')
          .from('cart')
          .join('clothes', {
            'clothes.clothes_id': 'cart.clothes_id'
          })
          .where({
            'userstable_id': userId
          });
        return query.then(rows => {
          return rows.map(row => ({
            name: row.name,
            img: row.img,
            id: row.clothes_id,
            price: row.price.split('$').pop(),
            total: total
          }));
        });
      });
  };

  /* The add() method takes in:
  1) the id of whichever product that is being clicked on the /secret page
  2) the currently logged-in user's username
  and adds items to the cart table */

  add(clickedClothesId, userName) {
    //Query price of the clicked item using id
    let price;
    let res = {
      repeat: 0,
      msg: '',
      status: ''
    }
    this.knex
      .select('price')
      .from('clothes')
      .where('clothes_id', clickedClothesId)
      .then((rows) => {
        price = rows[0].price;
      })
    return this.knex
      .select('clothes_id')
      .from('cart')
      .where('clothes_id', clickedClothesId)
      .then((rows) => {
        if (rows.length < 1) {
          //Query current user id using userName
          this.queryUserId(userName);
          console.log(userId);
          //Adding clicked item to cart table
          return this.knex.insert({
            clothes_id: clickedClothesId,
            userstable_id: userId,
            price: price
          }).into('cart').then(() => {
            res.msg = 'Successfully added to your cart!'
            res.status = 'success'
            return res
          });
          // Do not allow repeated items
        } else {
          res.repeat = 1
          res.msg = 'No repeated item!'
          res.status = 'fail'
          return res
        }
      });
  };

  /* The user is able to remove any undesired items by clicking on their remove buttons on the cart page  */

  remove(clickedClothesId, userName) {
    //Query current user id using name
    this.queryUserId(userName);
    console.log(userId);
    //Adding clicked item to cart table
    return this.knex('cart')
      .where({
        'clothes_id': clickedClothesId,
        'userstable_id': userId
      })
      .del()
  };

};

module.exports = CartService;