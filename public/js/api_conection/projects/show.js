let url                 = new URL(window.location.href);
let project_id          = url.searchParams.get("project_id");
let users_in_project    = []; // TODO: it was var and then let
let token               = localStorage.getItem('token');
let url_download        = API_URL + '/projects/' + project_id + '/download?token=' + token
let request_projects = function request_projects() {
    request(token, null, '/projects/' + project_id, 'GET', null, function_succes, function_fail);
}

let function_succes = function function_succes(res){
    console.log(res);
    console.log('nkdfjh');
    append_to_body(top_nav());
    append_to_body(show_project(res));
    //append_to_body(search_projects());
    //$.each(res, function(i) {
    //    append_to_body(project_card(res[i]));
    //})
    menu_side();
    add_user();
    download_project();
    remove_user();
}

let function_fail = function function_fail(res){
    window.location.replace('../projects/index.html');
};

let download_project = function download_project(){
    $('#download-project').click(function(e){
            request(token, null, '/projects/' + project_id + "?token=" + token, 'GET', null, null, null);
    });
}

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
                console.log(data);
                let token = localStorage.getItem('token');
                request(token, null, '/projects/' + project_id + "/add_user", 'POST', data, function_succes_add_user, function_fail_add_user);
            }
        })
    });
}

let remove_user = function remove_user(){
    let i;
    for (i = 0; i < users_in_project.length; i++) {
        $('#remove-user-' + users_in_project[i]).click(function(e) {
                let id_str = e.target.id;
            swal({
                title: 'Are you sure you want to remove this user?',
                text: "If you remove this user he will not longer be able to contribute to the project",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove him!'
                }).then((result) => {
                if (result.value) {
                    console.log(token);
                    data = {
                        user_id: id_str.substring('remove-user-'.length)
                    }
                    console.log(data);
                    request(token, null, '/projects/' + project_id + "/remove_user", 'POST', data, function_succes_remove_user, function_fail_remove_user);
                }
            })
        });
    }
}

let function_succes_add_user = function function_succes_add_user(res){
    location.reload();
}

let function_fail_add_user =  function function_fail_add_user(res){
    let str = res["status"];
    if(str === 400){
        swal(
          'ERROR',
          'User is already on the project.',
          'error'
        );
    } if(str === 401){
        swal(
            'ERROR!',
            'YOUT DONT HAVE THE PERMITIONS TO PERFOM THIS ACTION',
            'warning'
        );
    }
    else {
        swal(
            'ERROR!',
            'We couldn\'t find a user with that data.',
            'error'
        );
    }

}

let function_succes_remove_user = function function_succes_remove_user(res){
    location.reload()
}

let function_fail_remove_user =  function function_fail_remove_user(res){
    swal(
        'ERROR!',
        'YOUT DONT HAVE THE PERMITIONS TO PERFOM THIS ACTION',
        'warning'
    );
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
            <div class="col-md-6">
                <a href="${url_download}" target="_blank" class="btn btn-success" type="button" name="button" id="download-project">Download project</a>
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
    </div>`;
}

let add_users = function add_users(data){
    let user_card_str = ``;
    $.each(data, function(i) {
        user_card_str += user_card(data[i]);
        users_in_project.push(data[i]["id"]);
    });
    console.log(users_in_project);
    return user_card_str;
}

let user_card = function user_card(data){
    return `<div class="row form-group">
        <div class="col-md-4">
            <img src="../../public/img/common/user.png" alt="Project A">
        </div>
        <div class="col-md-4">
            <div>
                <a href="../users/index.html?id=${data['id']}"><h3>${data['username']}</h3></a>
            </div>
            <div class="description">
                ${data['role']}
            </div>
        </div>
        <div class="col-md-4">
            <button class="btn btn-success" type="button" name="button" id="remove-user-${data['id']}">Remove</button>
        </div>
    </div>`;
}
