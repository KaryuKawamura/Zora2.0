var notesTemplate = Handlebars.compile(
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
    <div class="card-footer">
      <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
    </div>
  </div>
  {{/each}}
    `
);

const reloadNotes = data => {
  console.log("trying");
  console.log(data);
  $("#testing").html(
    notesTemplate({
      clothes: data
    })
  );
};

const beginSaving = target => {
  $(target).prop("disabled", true);
  $(".saving").show();
};

const endSaving = target => {
  $(target).prop("disabled", true);
  $(".saving").hide();
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

  $("#add").submit(e => {
    e.preventDefault();
    console.log("add pressed");

    var val = $("textarea[name=note]").val();
    console.log(val);
    if (val === "") {
      return;
    }
    $("textarea[name=note]").val("");
    axios
      .post("/api/notes/", {
        note: val
      })
      .then(res => {
        console.log(res.data);
        reloadNotes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  $("#notes").on("blur", "textarea", event => {
    console.log("I am editing");
    console.log($(event.currentTarget).data("id"));

    beginSaving(event.currentTarget);

    axios
      .put("/api/notes/" + $(event.currentTarget).data("id"), {
        note: $(event.currentTarget).val()
      })
      .then(res => {
        endSaving(event.currentTarget);
        reloadNotes(res.data);
      })
      .catch(e => {
        endSaving(event.currentTarget);
        alert(e);
      });
  });

  $("#notes").on("click", ".remove", event => {
    beginSaving(event.currentTarget);

    axios
      .delete("/api/notes/" + $(event.currentTarget).data("id"))
      .then(res => {
        endSaving(event.currentTarget);
        reloadNotes(res.data);
      })
      .catch(e => {
        endSaving(e.currentTarget);
        alert(e);
      });
  });
});