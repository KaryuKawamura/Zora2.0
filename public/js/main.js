var productList = Handlebars.compile(
  `
  {{#each clothes}}
  <div class="col-lg-3 col-sm-6 cards">
    <a href""><img class="card-img-top" src={{img}} alt="products" id="productThumb" data-id="{{clothes_id}}"
        gender="{{gender_id}}"></a>
    <div class="card-body">
      <h5>{{name}}</h5>
      <p class="card-text">{{price}}</p>
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div class="input-group-text">Quantity:</div>
      </div>
      <input type="number" class="form-control" href={{id}} value="1" min="1">
    </div>
    <div class="input-group mb-2 d-flex flex-nowrap">
      <div class="input-group-prepend">
        <div class="input-group-text">Size:</div>
      </div>
      <div class="dropdown input-group-prepend">
        <button class="btn dropdown-toggle input-group-text" type="button" href={{id}}ss data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">S
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id={{id}}>
          <a class="dropdown-item">XS</a>
          <a class="dropdown-item">S</a>
          <a class="dropdown-item">M</a>
          <a class="dropdown-item">L</a>
          <a class="dropdown-item">XL</a>
        </div>
      </div>
      <div class="input-group-append">
        <button type="button" class="btn btn-dark cartButton" id={{id}}><img src="../images/cart.png"></button>
      </div>
    </div>
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
      <td><button class="btn btn-link dropdown-toggle" type="button" href={{id}}ss data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{size}}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id={{id}}>
    <a class="dropdown-item">XS</a>
    <a class="dropdown-item">S</a>
    <a class="dropdown-item">M</a>
    <a class="dropdown-item">L</a>
    <a class="dropdown-item">XL</a>
  </div>
  </td>
      <td>
        <div class="form-group">
        <input type="number" class="form-control cartQuantity" id={{id}} min="1" value="{{quantity}}">
        </div>
      </td>
      <td>{{price}}</td>
      <td><button type="button" class="btn btn-dark removeButton" id={{id}}>Remove</button></td>
    </tr>
  {{/each}}
  <tr class="table-active">
      <td></td>
      <td></td>
      <td></td>     
      <td>Grand Total:</td>
      <td>{{#each cart}}{{#if @last}}{{totalPrice}}{{/if}}{{/each}}</td>    
      <td>
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
    <h4>{{id}}</h4></br>
    <h4>{{name}}</h4></br>
    <p>{{price}}</p></br>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div class="input-group-text">Quantity:</div>
      </div>
      <input type="number" class="form-control" href={{id}} value="1" min="1">
    </div>
    <div class="input-group mb-2 d-flex flex-nowrap">
      <div class="input-group-prepend">
        <div class="input-group-text">Size:</div>
      </div>
      <div class="dropdown input-group-prepend">
        <button class="btn dropdown-toggle input-group-text" type="button" href={{id}}ss data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">S
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id={{id}}>
          <a class="dropdown-item">XS</a>
          <a class="dropdown-item">S</a>
          <a class="dropdown-item">M</a>
          <a class="dropdown-item">L</a>
          <a class="dropdown-item">XL</a>
        </div>
      </div>
      <div class="input-group-append">
        <button type="button" class="btn btn-dark cartButton" id={{id}}><img src="../images/cart.png"></button>
      </div>
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
//~~~~~~~~~~~~ Suggestions ~~~~~~~~~~~~//
var suggestion = Handlebars.compile(
  `
  <h5>Other {{horoscope}} also viewed:</h5>
  <div class="row" id="horoSuggestion">
  {{#each suggestions}}
  <div class="col-lg-4 col-sm-4">
    <a href=""><img class="card-img-top" src="{{img}}" alt="products" id="productThumb" data-id="{{clothes_id}}" gender="{{gender_id}}"></a>
    <div class="card-body">
    <h6>{{name}}</h6>
    <p class="card-text">{{price}}</p>
    </div>
  </div>
  {{/each}}
  </div>
  `
);
// // // // // // // // // // // // // // // //
const reloadCart = data => {
  $("#cart").html(
    cartTemplate({
      cart: data
    })
  );
};

const toProduct = (data, horoscope) => {
  $("#suggestions").html(
    suggestion({
      suggestions: data,
      horoscope: horoscope
    })
  );
};
/* =========================================================================
Axios requests and event listeners */
//Getting user cart info
$(() => {
  //capture the horoscope
  let greeting = $(".justify-content-end span").text();
  let greetArray = greeting.trim().split(" ");
  let horoscope = greetArray[greetArray.length - 1];

  $("body").css("background-image", "url(/images/" + horoscope + "_bg.png)");

  $(".col-lg-3").on("click",".list-group-item", ()=>{
    // console.log('button click')
    $("#suggestions").hide();
  });
  console.log(horoscope)

  if (horoscope === 'Pisces') {
    $('#horoscopeIcon').attr('src', './images/pisces.png');
  } else if (horoscope === 'Aries') {
    $('#horoscopeIcon').attr('src', './images/aries.png');
  } else if (horoscope === 'Taurus') {
    $('#horoscopeIcon').attr('src', './images/taurus.png');
  } else if (horoscope === 'Gemini') {
    $('#horoscopeIcon').attr('src', './images/gemini.png');
  } else if (horoscope === 'Cancer') {
    $('#horoscopeIcon').attr('src', './images/cancer.png');
  } else if (horoscope === 'Leo') {
    $('#horoscopeIcon').attr('src', './images/leo.png');
  } else if (horoscope === 'Virgo') {
    $('#horoscopeIcon').attr('src', './images/Virgo.png');
  } else if (horoscope === 'Libra') {
    $('#horoscopeIcon').attr('src', './images/Libra.png');
  } else if (horoscope === 'Scorpio') {
    $('#horoscopeIcon').attr('src', './images/Scorpio.png');
  } else if (horoscope === 'Sagittarius') {
    $('#horoscopeIcon').attr('src', './images/sagittarius.png');
  } else if (horoscope === 'Capricorn') {
    $('#horoscopeIcon').attr('src', './images/Capricorn.png');
  };

  axios
    .get("/api/clothes", {
      horoscope: horoscope
    })
    .then(res => {
      reloadNotes(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  //Updating cart badge functionality
  axios
    .get("/api/cart")
    .then(res => {
      if (res.data !== undefined) {
      $("span.badge").html(res.data[0].totalQuantity);
      console.log(res.data);
      }
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
    let productSize = $(`[href=${productId}ss]`).text();

    // console.log(productId, productQuantity)

    axios
      .post("/api/cart/", {
        clothes_id: productId,
        quantity: productQuantity,
        size: productSize
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

   $("#displayBox, #cart").on("click", ".dropdown-item", function (e) {

     let size;
     let that = e.currentTarget;
     let productId = $(that).attr("id");

     size = $(that).text();
     productId = $(that).parent().attr("id");
     $(`[href=${productId}ss]`).text(size)

   });

  $("#displayBox").on("click", "img", function(e) {
    e.preventDefault();
    $("#suggestions").show();
    let id = e.currentTarget.getAttribute("data-id");
    let gender = e.currentTarget.getAttribute("gender");

    axios
      .get("/api/productInfo/" + id, { id: id })
      .then(res => {
        reloadPage(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("/api/suggestion/" + horoscope + "/" + gender, {
        horoscope: horoscope,
        gender: gender
      })
      .then(res => {
        toProduct(res.data, horoscope, gender);
      })
      .catch(err => {
        console.log(err);
      });
  });

  $("#suggestions").on("click", "img", function(e) {
    e.preventDefault();
    console.log(e.currentTarget.getAttribute("data-id"));
    let id = e.currentTarget.getAttribute("data-id");

    axios
      .get("/api/productInfo/" + id, { id: id })
      .then(res => {
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
