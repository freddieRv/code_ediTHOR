let throw_alert = function(entity, action, undoable) {
    var entity_text = entity;
    var have_text   = 'has';
    var verb_text   = 'is';
    var undo_text   = undoable
                    ? ''
                    : 'This action cannot be undone';

    if ($('.card-selected').length > 1) {
        entity_text = entity + 's';
        have_text   = 'have';
        verb_text   = 'are';
    }

    swal({
        type: 'warning',
        title: 'Are you sure you want to ' + action +' this ' + entity_text +'?',
        text: undo_text,
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure',
        cancelButtonText: 'No, I changed my mind'
    }).then((result) => {
        if (result.value) {
            swal(
              'Deleted!',
              'This ' + entity_text + ' ' + have_text +' been deleted.',
              'success'
            )
        } else if (result.dismiss === swal.DismissReason.cancel) {
            swal(
              'Cancelled',
              'Your ' + entity_text + ' ' + verb_text + ' safe :)',
              'error'
            )
        }
    });
}
