$(document).ready( function() {
    $(".card").click(function() {

        if ($(this).hasClass('card-selected')) {
            $(this).removeClass('card-selected');
        } else {
            $(this).addClass('card-selected');
        }

        if ($('.card-selected').length) {
            $('#actions').show();
        } else {
            $('#actions').hide();
        }

    });

    $("#btnDelete").click(function() {
        project_text = '';
        have_text    = '';
        are_text     = '';

        if ($('.card-selected').length > 1) {
            project_text = 'users';
            have_text    = 'have';
            are_text     = 'are';
        } else {
            project_text = 'user';
            have_text    = 'has';
            are_text     = 'is';
        }

        swal({
            type: 'warning',
            title: 'Are you sure you want to delete this ' + project_text +'?',
            text: 'This action cannot be undone',
            showCancelButton: true,
            confirmButtonText: 'Yes, I am sure',
            cancelButtonText: 'No, I changed my mind'
        }).then((result) => {
            if (result.value) {
                swal(
                  'Deleted!',
                  'Your ' + project_text + ' ' + have_text +' been deleted.',
                  'success'
                )
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swal(
                  'Cancelled',
                  'Your ' + project_text + ' ' + are_text + ' safe :)',
                  'error'
                )
            }
        });
    });

    $('#btnSelect').click(function() {
        $(".card").addClass('card-selected');
        $(this).hide();
        $('#btnDeselect').show();
    });

    $('#btnDeselect').click(function() {
        $(".card").removeClass('card-selected');
        $(this).hide();
        $('#btnSelect').show();
        $('#actions').hide();
    });

});
