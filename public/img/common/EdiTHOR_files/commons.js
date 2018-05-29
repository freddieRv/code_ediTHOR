const API_URL = 'http://api.code-edithor.harveyhurricanerelief.com';
var request = function request(auth_token, function_token, end_point, type, data, function_succ, function_fa) {
    if (auth_token != null && function_token != null) {
        function_token();
    }
    $.ajax({
        url:        API_URL + end_point,
        type:       type,
        data:       data,
        success:    function_succ,
        error:       function_fa,
        dataType:   "json",
        headers: {
            'x-access-token': auth_token
        }
    });
};

let main_function = function main_function(){
    let token = localStorage.getItem('token');
    if(token != null){
        window.location.replace('../main/index.html');
    }
}
function append_to_body(code){
    $(code).appendTo( '#container_body' );
}
