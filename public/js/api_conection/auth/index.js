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
    console.log(res);
    let str = res["status"];
    console.log(str);
    if(str === 400){
        swal(
          'ERROR',
          'This credentials does not match our records',
          'error'
        );
    }
};

main_function();
