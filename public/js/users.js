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
        throw_alert('user', 'delete', false)
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

    $("#btnActivate").click(function() {
        throw_alert('user', 'activate', true);
    });

    $("#btnDeactivate").click(function() {
        throw_alert('user', 'deactivate', true);
    });

});
