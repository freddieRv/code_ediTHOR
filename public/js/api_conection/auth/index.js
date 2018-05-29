let token = localStorage.getItem('token');
let request_login = function request_login(e){
    data = {
        username: $('#username').val(),
        password: $('#password').val()
    }
    console.log(data);
    request(null, null, '/login', 'POST', data, function_succes, function_fail);
};

let function_succes = function function_succes(res){
    localStorage.setItem('username', res['user']['username']);
    localStorage.setItem('token', res['token']);
    localStorage.setItem('user_id', res['user']['id'])
    window.location.replace('../main/index.html');
};

let function_fail = function function_fail(res){
    let str = res["status"];
    if(str === 400){
        swal(
          'ERROR',
          'This credentials does not match our records',
          'error'
        );
    }
};

main_function();
