var notesTemplate = Handlebars.compile(
  `
    {{#each notes}}
    <div class="note">
        <span class="input"><textarea data-id="{{ id }}">{{ content }}</textarea></span>
        <button class="remove btn btn-xs" data-id="{{ id }}"><i class = "fa fa-trash" aria-hidden="true"></i></button>
        </div>
        {{/each}}
    `
);

const reloadNotes = (data) => {
  console.log('trying')
  console.log(data);
  $('#notes').html(notesTemplate({
    notes: data
  }));
}

const beginSaving = (target) => {
  $(target).prop('disabled', true);
  $('.saving').show();
}

const endSaving = (target) => {
  $(target).prop('disabled', true);
  $('.saving').hide();
}

$(() => {

  axios.get('/api/notes/')
    .then((res) => {
      console.log(res.data, 'X')
      reloadNotes(res.data)
    }).catch((err) => {
      console.log(err)
    });

  $('#add').submit((e) => {
    e.preventDefault();
    console.log('add pressed')

    var val = $('textarea[name=note]').val();
    console.log(val)
    if (val === '') {
      return;
    }
    $('textarea[name=note]').val('');
    axios.post('/api/notes/', {
      note: val
    }).then((res) => {
      console.log(res.data)
      reloadNotes(res.data);
    }).catch((err) => {
      console.log(err)
    })
  });

  $('#notes').on('blur', 'textarea', (event) => {
    console.log('I am editing')
    console.log($(event.currentTarget).data('id'))

    beginSaving(event.currentTarget);

    axios.put('/api/notes/' + $(event.currentTarget).data('id'), {
      note: $(event.currentTarget).val()
    }).then((res) => {
      endSaving(event.currentTarget);
      reloadNotes(res.data);
    }).catch((e) => {
      endSaving(event.currentTarget);
      alert(e);
    });
  });

  $('#notes').on('click', '.remove', (event) => {
    beginSaving(event.currentTarget);

    axios.delete('/api/notes/' + $(event.currentTarget).data('id')).then((res) => {
      endSaving(event.currentTarget);
      reloadNotes(res.data);
    }).catch((e) => {
      endSaving(e.currentTarget);
      alert(e);
    });
  });
});