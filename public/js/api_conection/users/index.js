let url             = new URL(window.location.href);
let user_id         = url.searchParams.get("id");
let edit            = url.searchParams.get("edit");
let token           = localStorage.getItem('token');
let current_user_id = localStorage.getItem('user_id');
user_role       = localStorage.getItem('user_role');
let edit_button     = ``
let user_details_func
let request_user = function request_user(e){
    request(token, null, '/users/' + user_id, 'GET', null, function_succes, function_fail);
};

let function_succes = function function_succes(res){
    append_to_body(top_nav());
    if (res['id'] == current_user_id || user_role == 1){
        edit_button = `<button class="col-md-3 col-sm-6" type="button" name="button" id="edit-info">Edit</button>`;
    }
    console.log(res);
    append_to_body(user_details_func(res));
    append_to_body(footer_code());
    load_buttons();
    add_remaining_to_an_element();
    menu_side();
};

let function_fail = function function_fail(res){
    // TODO:
};



let load_buttons = function load_buttons(){
    $('#edit-info').click(function(e) {
        window.location.replace('../users/index.html?id=' + user_id + '&edit=true');
    });
    $('#cancel-changes').click(function(e) {
        window.location.replace('../users/index.html?id=' + user_id);
    });
    let submit_butons = $('#save-changes');
    submit_butons.on('click', validate_form);
}

let user_details = function user_details(data) {
    return `<div class="row justify-content-center flex-grow" id="filled-element">
        <div class="col-md-6 col-sm-12 logo justify-content-center">
            <figure>
                <br>
                <img src="../../public/img/common/user_2.png" alt="mjolnir">
            </figure>
        </div>
        <div class="col-md-6 col-sm-12 side-form">
            <br>
            <section class="side-logo">
                <!-- TODO: make h2 and h3 different -->
                <h2 class="col-sm-12">Name</h2>
                <h3 class="col-sm-12">${data['username']}</h3>
                <h2 class="col-sm-12">Email</h2>
                <h3 class="col-sm-12">${data['email']}</h3>
                <h2 class="col-sm-12">Something</h2>
                <h3 class="col-sm-12">Web project is a project that is slowly killing us :)</h3>
                <br>` +
                edit_button +
            `<br>
        </div>
    </div>`;
}

let user_details_edit = function user_details_edit(data) {
    return `<div class="row justify-content-center flex-grow" id="filled-element">
        <div class="col-md-6 col-sm-12 logo justify-content-center">
            <figure>
                <br>
                <img src="../../public/img/common/user_2.png" alt="mjolnir">
            </figure>
        </div>
        <div class="col-md-6 col-sm-12 side-form">
            <br>
            <section class="side-logo">
                <!-- TODO: make h2 and h3 different -->
                <h2 class="col-sm-12">Change information:</h2>
                <form class="col-sm-12" action="#" method="post" id='form-update'>
                    <h2 class="col-sm-12">Name</h2>
                    <input class="col-lg-6 col-sm-12" type="text" name="username" id="username" value="${data['username']}" required>
                    <h2 class="col-sm-12">Email</h2>
                    <input class="col-lg-6 col-sm-12" type="text" name="email" id="email" value="${data['email']}" required>
                    <label class="col-lg-6 col-sm-12" for="password">Password</label>
                    <input class="col-lg-6 col-sm-12" type="password" name="password" id="password" placeholder="Password" required>

                    <label class="col-lg-6 col-sm-12" for="repeat-password">Repeat password</label>
                    <input class="col-lg-6 col-sm-12" type="password" name="repeat-password" id="repeat-password" placeholder="Repeat previous password" required>
                    <br>
                    <br>
                    <button class="col-md-3 col-sm-6" type="button" name="button" id="cancel-changes">Cancel</button>
                    <button class="col-md-3 col-sm-6" type="submit" name="button" id="save-changes">Save</button>
                </form>
            </section>
            <br>
        </div>
    </div>`;
}


if(current_user_id != null){
    console.log(user_id);
    if(user_id == null){
        user_id = current_user_id;
    }
    console.log(user_id);
    if (edit){
        user_details_func = user_details_edit;
    }
    else{
        user_details_func = user_details;
    }
    request_user();
}
else{
    window.location.replace('../auth/index.html');
}
