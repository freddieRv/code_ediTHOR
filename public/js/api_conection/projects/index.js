let request_projects = function request_projects() {
    let token = localStorage.getItem('token');
    data = {
    }
    $(document).ready(request(token, null, '/projects/', 'GET', data, function_succes, function_fail));
}

let function_succes = function function_succes(res){
    console.log(res);
    console.log('si se pudo');
};

let function_fail = function function_fail(res){
    console.log(res);
    console.log('kuma no ochinchi');
    // TODO: put here in case valid data but user not gegistered
};

request_projects();
