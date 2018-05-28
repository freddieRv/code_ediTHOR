let create_project = function create_project() {
    let token = localStorage.getItem('token');
    console.log(token);
    data = {
        name:           $('#name-project').val(),
        description:    $('#description-project').val()
    }
    console.log(data);
    $(document).ready(request(token, null, '/projects/', 'POST', data, function_succes, function_fail));
}

let function_succes = function function_succes(res){
    console.log(res);
    // TODO: etwas
    window.location.replace('../projects/index.html');
};

let function_fail = function function_fail(res){
    console.log(res);
    console.log('kuma no ochinchi');
    // TODO: put here in case valid data but user not gegistered
};
