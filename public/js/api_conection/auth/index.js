let request_login = function request_login(e){
    let button = $(this);

    let form = $(button.closest('form'));

    data = {
        username: $('#username').val(),
        password: $('#password').val()
    }
    console.log(data);
    $(document).ready(request(null, null, '/login', 'POST', data, function_succes, function_fail));
};

let function_succes = function function_succes(res){
    window.location.replace('../main/index.html');
    localStorage.setItem('token', res['token']);
};

let function_fail = function function_fail(res){
    // TODO: put here in case valid data but user not gegistered
};

main_function();
