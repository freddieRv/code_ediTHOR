
let request_register = function request_register(e){
    let button = $(this);

    let form = $(button.closest('form'));

    data = {
        username: $('#username').val(),
        password: $('#password').val(),
        email:    $('#email').val(),
        password_confirmation: $('#repeat-password').val()
    }
    console.log(data);
    $(document).ready(request(null, null, '/register', 'POST', data, function_succes, function_fail));
};

let function_succes = function function_succes(res){
    window.location.replace('../main/index.html');
    localStorage.setItem('token', res['token']);
};

let function_fail = function function_fail(res){
    // TODO: put something here, in case user not registered
};


main_function();
