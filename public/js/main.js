/* =========================================================================
 Building the product catalog */
var clothesTemplate = Handlebars.compile(
  `
  {{#each clothes}}
  <div class= col-lg-3>
    <a href="#"><img class="card-img-top" src={{img}}  alt=""></a>
    <div class="card-body">
      <h4 class="card-title">
        <a href="#"> {{id}}</a>
      </h4>
      <h5> {{price}}</h5>
      <p class="card-text"> {{name}}
      </p>
    </div>
    <button type="button" class="btn btn-primary cartButton" id={{id}}>Add to cart</button>
  </div>
  {{/each}}
  `
);
/* =========================================================================
 Building the user's cart page */
var cartTemplate = Handlebars.compile(
  //Table headers and structure comes first, then the actual content follows
  `
  <h1> Your Shopping Cart </h1>
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Product</th>
      <th scope="col">Size</th>
      <th scope="col">Quantity</th>
      <th scope="col">Unit Price<br><small class="text-muted">(HKD$)</small></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {{#each cart}}
  <tr>
      <th scope="row"><img src='{{img}}' id='cartThumbnail'></th>
      <td>{{name}}</td>
      <td>{{size}}</td>
      <td>
        <div class="form-group">
        <input type="number" class="form-control" value="1">
        </div>
      </td>
      <td>{{price}}</td>
      <td><button type="button" class="btn btn-primary removeButton" id={{id}}>Remove</button></td>
    </tr>
  {{/each}}
  <tr class="table-active">
      <td></td>
      <td></td>
      <td></td>
      <td>Total:</td>
      <td>{{#each cart}}{{#if @last}}{{total}}{{/if}}{{/each}}</td>
      <td>
      <div style="position: relative; margin:auto;">
       <form action="/charge" method="post">
       <article>
          <label>Checkout</this></label>
        </article>
        <script
        src="//checkout.stripe.com/v2/checkout.js"
        class="stripe-button"
        data-key="<%= keyPublishable %>"
        data-locale="auto"
        data-description="Checkout form"
        data-amount="{{#each cart}}{{#if @last}}{{total}}{{/if}}{{/each}}"
        >
        </script>
        </form>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
    `
);
/* =========================================================================
 */
const reloadClothes = data => {
  $("#testing").html(
    clothesTemplate({
      clothes: data
    })
  );
};
const reloadCart = data => {
  $("#cart").html(
    cartTemplate({
      cart: data
    })
  );
};
/* =========================================================================
Axios requests and event listeners */
$(() => {

 
  //Get clothes catalog
  axios
    .get("/api/clothes/")
    .then(res => {
      reloadClothes(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  //Getting user cart info
  axios
    .get("/api/cart/")
    .then(res => {
      reloadCart(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  //Adding product to cart function
  $('#testing').on('click', '.cartButton', function (e) {
    let that = e.currentTarget;
    let productId = $(that).attr('id');
    axios.
    post("/api/cart/", {
        clothes_id: productId
      })
      .then(res => {
        if (res.data.status == 'success') {
          $('#message').html(
            '<br><div class="alert alert-success fade show" role="alert">'
            + res.data.msg +
            '</div>'
          );
        } else if (res.data.status == 'fail') {
          $('#message').html(
            '<br><div class="alert alert-danger fade show" role="alert">' +
            res.data.msg +
            '</div>'
          );
        }

        setTimeout(function(){
          $(".alert").alert('close')
        }, 3000);
        
      })
      .catch(err => {
        console.log(err);
      });
  });

  //Remove product from cart
  $('#cart').on('click', '.removeButton', function (e) {
    let that = e.currentTarget;
    let productId = $(that).attr('id');
    axios.
    delete("/api/cart/" + productId)
      .then((res) => {
        reloadCart(res.data);
      }).catch((e) => {
        alert(e);
      }).finally(() => {
        location.reload(true);
      });
  });
});