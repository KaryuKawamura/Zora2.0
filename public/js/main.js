var productList = Handlebars.compile(
  `
  {{#each clothes}}
  <div class="col-lg-3 col-sm-6 cards">
    <a href""><img class="card-img-top" src={{img}} alt="products" id="productThumb" data-id="{{clothes_id}}"></a>
    <div class="card-body">
      <h5> {{price}}</h5>
      <p class="card-text"> {{name}}
      </p>
    </div>
    <div class="form-group">
      <label>Quantity:</label>
        <input type="number" class="form-control" href={{id}} value="1" min="1">
    </div>
    <br>
    <div class="dropdown">
    <label>Size:</label>
  <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">S
   
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">XS</a>
    <a class="dropdown-item" href="#">S</a>
    <a class="dropdown-item" href="#">M</a>
    <a class="dropdown-item" href="#">L</a>
    <a class="dropdown-item" href="#">XL</a>
  </div>
</div>
<br>
    <button type="button" class="btn btn-primary cartButton" id={{id}}>Add to cart</button>
    </div>
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
        <input type="number" class="form-control cartQuantity" id={{id}} min="1" value="{{quantity}}">
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
      
      <td>Grand Total:</td>
      
    

      <td id='total'>{{#each cart}}{{#if @last}}{{totalPrice}}{{/if}}{{/each}}</td>
     
      <td>
      <div style="position: relative; margin:auto;">
       <form action="/charge" method="post">
       <article>
          <label>Checkout</this></label>
        </article>
        </form>
        </div>
      </td>
    </tr>
  </tbody>

  </table>
    `
);
var productInfo = Handlebars.compile(
  `
  {{#each clothes}}
  <div class="col-lg-6 col-md-6">
  <img class="card-img-top" src="{{img}}" alt="{{name}}">
  </div>
  <div class="col-lg-6 col-md-6">
  <h4>{{name}}</h4></br>
  <p>{{price}}</p></br>
  <div class="dropdown text-left" id="selectSize">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenu2"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span id="selected">Please select size</span><span class="caret"></span>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button class="dropdown-item" type="button">XS</button>
          <button class="dropdown-item" type="button">S</button>
          <button class="dropdown-item" type="button">M</button>
          <button class="dropdown-item" type="button">L</button>
          <button class="dropdown-item" type="button">XL</button>
      </div>
  </div>
</div>
{{/each}}
  `
);
const reloadNotes = data => {
  console.log("reloading");
  $("#displayBox").html(
    productList({
      clothes: data
    })
  );
};
const reloadPage = data => {
  $("#displayBox").html(
    productInfo({
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

const toProduct = data => {
  $("#suggestions").html(
    suggestion({
      suggestions: data
    })
  );
};
/* =========================================================================
Axios requests and event listeners */
//Getting user cart info
$(() => {
  axios
    .get("/api/clothes")
    .then(res => {
      reloadNotes(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  axios
    .get("/api/cart")
    .then(res => {
      reloadCart(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  $("#cart").on("change", ".cartQuantity", function(e) {
    let that = e.currentTarget;
    let productQuantity = $(that).val();
    let productId = $(that).attr("id");

    // console.log(productId, productQuantity);

    axios
      .put("/api/cart/", {
        clothes_id: productId,
        quantity: productQuantity
      })
      .finally(() => {
        location.reload(true);
      });
  });

  //Adding product to cart function
  $("#displayBox").on("click", ".cartButton", function(e) {
    let that = e.currentTarget;
    let productId = $(that).attr("id");
    let productQuantity = $(`[href=${productId}]`).val();

    // console.log(productId, productQuantity)

    axios
      .post("/api/cart/", {
        clothes_id: productId,
        quantity: productQuantity
      })
      .then(res => {
        // console.log(res.data.quantity)

        if (res.data.status == "success") {
          $("#message").html(
            '<br><div class="alert alert-success fade show" role="alert">' +
              res.data.msg +
              "</div>"
          );

          setTimeout(function() {
            location.reload(true);
          }, 1000);
        } else if (res.data.status == "fail") {
          $("#message").html(
            '<br><div class="alert alert-danger fade show" role="alert">' +
              res.data.msg +
              "</div>"
          );
        }
        setTimeout(function() {
          $(".alert").alert("close");
        }, 500);
      })
      .then(() => {});
  });

  $("#displayBox").on("click", "img", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productInfo/" + id, {
        id: id
      })
      .then(res => {
        // console.log(res.data);
        reloadPage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  $("#productStyle").on("click", "button", function(e) {
    // e.preventDefault();
    // console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");
    // console.log("This is a post request");
    axios
      .post("/api/clothes/trend", {
        id: id
      })
      .then(res => {
        // console.log("Got");
        // console.log(res.data);
        reloadNotes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  $("#productType").on("click", "button", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productTypeInfo/" + id, {
        id: id
      })
      .then(res => {
        // console.log(res.data);
        reloadNotes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //Remove product from cart
  $("#cart").on("click", ".removeButton", function(e) {
    let that = e.currentTarget;
    let productId = $(that).attr("id");
    axios
      .delete("/api/cart/" + productId)
      .then(res => {
        reloadCart(res.data);
      })
      .catch(e => {
        alert(e);
      })
      .finally(() => {
        location.reload(true);
      });
  });
});
