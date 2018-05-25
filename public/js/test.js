//const API_URL = 'http://api.code-edithor.roofs360.com'
const API_URL = 'http://localhost:3000'
/*$(document).ready(function(type, end_point, function_succes, function_fail) {

    if (!auth_token) {
        // TODO: redirect to login
    }

    $.ajax({
        url: API_URL + end_point,
        type: type
        success: function() {
            function_succes();
        },
        fail: function() {
            function_fail();
        }
    });

});*/
//--------------Auth-----------------------
pato = localStorage.getItem('token');
console.log(pato);
/*
function function_succes(res){
    console.log(res);
}

function function_fail(res){
    console.log(res);
}

var request = function request(auth_token, end_point, type, data, function_succ, function_fa) {
    if (auth_token) {

    }
    $.ajax({
        url:        API_URL + end_point,
        type:       type,
        data:       data,
        success:    function_succ(res),
        fail:       function_fa(res)
    });
}

data = {
    username: 'Rodrigoeq',
    password  '26841397Black'
}

$(document).ready(request(null, '/login', 'POST', data, function_succes, function_fail) {
});*/
