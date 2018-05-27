let url = new URL(window.location.href);
let project_id = url.searchParams.get("project_id");
let request_projects = function request_projects() {
    let url = new URL(window.location.href);
    let project_id = url.searchParams.get("project_id");
    let token = localStorage.getItem('token');
    data = {
    }
    $(document).ready(request(token, null, '/projects/' + project_id, 'GET', data, function_succes, function_fail));
    return true;
}

let function_succes = function function_succes(res){
    console.log(res['users']);
    append_to_body(top_nav());
    append_to_body(show_project(res));
    //append_to_body(search_projects());
    //$.each(res, function(i) {
    //    append_to_body(project_card(res[i]));
    //})
    menu_side();
    add_user();
}

let function_fail = function function_fail(res){
    console.log(res);
    console.log('kuma no ochinchi');
    // TODO: put here in case valid data but user not gegistered
};

let add_user = function add_user(){

    $('#add-user').click(function(e) {
        const {value: formValues} =  swal({
            title: 'Introduce user/email and select a role',
            html:
            '<input id="swal-input1" class="swal2-input">' +
            `<select name="roles" id="swal-input2">
                <option value="3">Project admin</option>
                <option value="4">Project tester</option>
                <option value="5">Project developer</option>
            </select>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                data = {
                    user: $('#swal-input1').val(),
                    role: $('#swal-input2 option:selected').val()
                }
                // TODO: correct if user doesn't exist
                console.log(data);
                let token = localStorage.getItem('token');
                request(token, null, '/projects/' + project_id + "/add_user", 'POST', data, function_succes_add_user, function_fail_add_user);
            }
        })
    });
}

let function_succes_add_user = function function_succes_add_user(res){

}

let function_fail_add_user =  function function_fail_add_user(res){

}

request_projects();

let show_project = function show_project(data){
    return `<div class="title">
        <p>Name: ${data['data']['name']}</p>
    </div>

    <div class="title">
        <p>Description: ${data['data']['description']}</p>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="row form-group">
                    <div class="col-12">
                        <div class="card-header">Members</div>
                    </div>
                </div>` +

                add_users(data['users']) +

                `<div class="row form-group">
                        <div class="col-12">
                            <button class="btn btn-success" type="button" name="button" id="add-user">Add member</button>
                        </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="row">
                    <div class="col-12 form-group">
                        <div class="card-header">
                            Files
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-6">
            <div class="card">
                <div class="row form-group">
                    <div class="col-12">
                        <div class="card-header">Stats</div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-12">
                        Some stats
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="row form-group">
                    <div class="col-12">
                        <div class="card-header">Recent activity</div>
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-12">
                        <ul>
                            <li>
                                Someone updated /src/css/style.css an hour ago.
                            </li>
                            <li>
                                Someone else deleted /src/js/script.js a day ago.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-12">
            <a href="index.html">Back to project list</a>
        </div>
    </div>`;
}

let add_users = function add_users(data){
    let user_card_str = ``;
    $.each(data, function(i) {
        user_card_str += user_card(data[i]);
    });
    return user_card_str;
}

let user_card = function user_card(data){
    return `<div class="row form-group">
        <div class="col-md-4">
            <img src="../../public/img/common/user.png" alt="Project A">
        </div>
        <div class="col-md-4">
            <div>
                <a href=""><h3>${data['username']}</h3></a>
            </div>
            <div class="description">
                ${data['role']}
            </div>
        </div>
        <div class="col-md-4">
            <p>
                <a href="">remove from project</a>
            </p>
            <p>
                Active less than 1 hour ago
            </p>
        </div>
    </div>`;
}
