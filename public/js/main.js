var productList = Handlebars.compile(
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

const reloadNotes = data => {
  console.log("trying");
  console.log(data);
  $("#displayBox").html(
    productList({
      clothes: data
    }));
};

const reloadPage = data => {
  $("#displayBox").html(
    productInfo({
      clothes: data
    }));
};

const toProduct = data => {
  console.log('loading suggestions in MAIN')
  $("#suggestions").html(
    suggestion({
      suggestions: data
    }));
};

$(() => {
  axios
    .get("/api/clothes/")
    .then(res => {
      console.log(res.data, "X");
      reloadNotes(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  $("#displayBox").on('click', 'img', function (e) {
    // e.preventDefault();
    console.log(e.currentTarget.getAttribute('data-id'));
    let id = e.currentTarget.getAttribute('data-id');

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
});
