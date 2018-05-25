require('./config.js')
require('./auth.js')

$(document).ready(function(type, end_point) {

    if (!auth_token) {
        // redirect to login
    }

    $.ajax({
        url: API_URL + end_point,
        type: type
        success: function() {
            // TODO: llenar templates con función
        },
        fail: function() {
            // TODO: mostrar swal de error funcion
        }
    });

});
