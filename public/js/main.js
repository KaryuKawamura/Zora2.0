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
    <button type="button" class="btn btn-primary cartButton" id={{id}}>Add to cart</button>
      <h5>{{name}}</h5>
      <p class="card-text">{{price}}</p>
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

const reloadNotes = data => {
  $("#displayBox").html(
    productList({
      clothes: data
    })
  );
};

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
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Please select size
          <span id="selected"></span><span class="caret"></span>
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

var productListTrend = Handlebars.compile(
  `
  {{#each clothes}}
  <div class="col-lg-3 col-sm-6 cards">
    <a href""><img class="card-img-top" src={{img}} alt="products" id="productThumb" data-id="{{clothes_id}}"></a>
    <div class="card-body">
      <h4 class="card-title">
        <a href="#"> {{id}}</a>
      </h4>
      <h5> {{price}}</h5>
      <p class="card-text"> {{name}}
      </p>
    </div>
    <button type="button" class="btn btn-primary cartButton" id={{id}}>Add to cart</button>
      <h5>{{name}}</h5>
      <p class="card-text">{{price}}</p>
    </div>
  </div>
  {{/each}}
    `
);
const reloadTrend = data => {
  let realDataTrend = [];
  data.forEach(element => {
    if (element.style_id == 3) {
      realDataTrend.push(element);
    }
  });
  $("#displayBoxTrend").html(
    productListTrend({
      clothes: realDataTrend
    })
  );
  return realDataTrend;
};
const reloadTrendPage = data => {
  $("#displayBoxTrend").html(
    productInfo({
      clothes: data
    })
  );
};
var productListCasual = Handlebars.compile(
  `
  {{#each clothes}}
  <div class="col-lg-3 col-sm-6 cards">
    <a href""><img class="card-img-top" src={{img}} alt="products" id="productThumb" data-id="{{clothes_id}}"></a>
    <div class="card-body">
      <h5>{{name}}</h5>
      <p class="card-text">{{price}}</p>
    </div>
  </div>
  {{/each}}
    `
);
const reloadCasual = data => {
  let realDataCasual = [];
  data.forEach(element => {
    if (element.style_id == 1) {
      realDataCasual.push(element);
    }
  });
  $("#displayBoxCasual").html(
    productListCasual({
      clothes: realDataCasual
    })
  );
};

const reloadCasualPage = data => {
  $("#displayBoxCasual").html(
    productInfo({
      clothes: data
    })
  );
};

var productListFormal = Handlebars.compile(
  `
  {{#each clothes}}
  <div class="col-lg-3 col-sm-6 cards">
    <a href""><img class="card-img-top" src={{img}} alt="products" id="productThumb" data-id="{{clothes_id}}"></a>
    <div class="card-body">
      <h5>{{name}}</h5>
      <p class="card-text">{{price}}</p>
    </div>
  </div>
  {{/each}}
    `
);
const reloadFormal = data => {
  let realDataFormal = [];
  data.forEach(element => {
    if (element.style_id == 0) {
      realDataFormal.push(element);
    }
  });
  $("#displayBoxFormal").html(
    productListFormal({
      clothes: realDataFormal
    })
  );
};
const reloadFormalPage = data => {
  $("#displayBoxFormal").html(
    productInfo({
      clothes: data
    })
  );
};
var productListOut = Handlebars.compile(
  `
  {{#each clothes}}
  <div class="col-lg-3 col-sm-6 cards">
    <a href""><img class="card-img-top" src={{img}} alt="products" id="productThumb" data-id="{{clothes_id}}"></a>
    <div class="card-body">
      <h5>{{name}}</h5>
      <p class="card-text">{{price}}</p>
    </div>
  </div>
  {{/each}}
    `
);

const reloadOut = data => {
  let realDataOut = [];
  data.forEach(element => {
    if (element.style_id == 2) {
      realDataOut.push(element);
    }
  });
  $("#displayBoxOut").html(
    productListOut({
      clothes: realDataOut
    })
  );
};
const reloadOutPage = data => {
  $("#displayBoxOut").html(
    productInfo({
      clothes: data
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
  axios
    .get("/api/clothes/trend")
    .then(res => {
      reloadTrend(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  axios
    .get("/api/clothes/trend")
    .then(res => {
      reloadCasual(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  axios
    .get("/api/clothes/trend")
    .then(res => {
      reloadFormal(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  axios
    .get("/api/clothes/trend")
    .then(res => {
      reloadOut(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  //Adding product to cart function
  $("#displayBox").on("click", ".cartButton", function(e) {
    let that = e.currentTarget;
    let productId = $(that).attr("id");
    axios
      .post("/api/cart/", {
        clothes_id: productId
      })
      .then(res => {
        if (res.data.status == "success") {
          $("#message").html(
            '<br><div class="alert alert-success fade show" role="alert">' +
              res.data.msg +
              "</div>"
          );
        } else if (res.data.status == "fail") {
          $("#message").html(
            '<br><div class="alert alert-danger fade show" role="alert">' +
              res.data.msg +
              "</div>"
          );
        }

        setTimeout(function() {
          $(".alert").alert("close");
        }, 3000);
      });
  });

  $("#displayBox").on("click", "img", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productInfo/" + id, { id: id })
      .then(res => {
        // console.log(res.data);
        reloadPage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  $("#productStyle").on("click", "a", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productTypeInfo/" + id, { id: id })
      .then(res => {
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
      .get("/api/productTypeInfo/" + id, { id: id })
      .then(res => {
        // console.log(res.data);
        reloadNotes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  $("#displayBoxTrend").on("click", "img", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productInfo/" + id, { id: id })
      .then(res => {
        // console.log(res.data);
        reloadTrendPage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  $("#displayBoxFormal").on("click", "img", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productInfo/" + id, { id: id })
      .then(res => {
        // console.log(res.data);
        reloadFormalPage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  $("#displayBoxOut").on("click", "img", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productInfo/" + id, { id: id })
      .then(res => {
        // console.log(res.data);
        reloadOutPage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  $("#displayBoxCasual").on("click", "img", function(e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productInfo/" + id, { id: id })
      .then(res => {
        // console.log(res.data);
        reloadCasualPage(res.data);
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
