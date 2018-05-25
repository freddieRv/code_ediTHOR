const API_URL = 'http://localhost:3000'
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
    console.log('si se pudo');
    console.log(res['token']);
    localStorage.setItem('token', res['token']);
    perro = localStorage.getItem('token');
    console.log(perro);
};

let function_fail = function function_fail(res){
    console.log('ni pedo');
};
