let request_projects = function request_projects() {
    let token = localStorage.getItem('token');
    data = {
    }
    $(document).ready(request(token, null, '/projects/', 'GET', data, function_succes, function_fail));
    return true;
}

let function_succes = function function_succes(res){
    append_to_body(top_nav());
    append_to_body(search_projects());
    $.each(res, function(i) {
        append_to_body(project_card(res[i]));
    });
    throw_alert_func();
    menu_side();
}

let function_fail = function function_fail(res){
    console.log(res);
    console.log('kuma no ochinchi');
    // TODO: put here in case valid data but user not gegistered
};

request_projects();
