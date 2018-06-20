let url = new URL(window.location.href);
let user_search = url.searchParams.get("user_search");
let token = localStorage.getItem('token');

let search_users_admin = function search_users_admin(){
    return `
    <div class="card-actions" id="filters">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <label>
                    Name
                    <input type="text" name="" value="" placeholder="Search users" id="search_filter">
                </label>
            </div>
            <div class="col-sm-6">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <button type="button" name="button" class="btn" id="filter-button">
                    <i class="fas fa-filter"></i>
                    <span class="btn-txt">Filter</span>
                </button>
            </div>
            <div class="col-sm-3">
                <button type="button" name="button" class="btn" id="filternt-button">
                    <i class="fas fa-filter"></i>
                    <span class="btn-txt">Show all</span>
                </button>
            </div>
        </div>
    </div>
    <div class="card-actions" style="display: none;" id="actions">
        <div class="row">
            <div class="col-3">
                <button type="button" name="button" class="btn" id="btnDelete">
                    <i class="fas fa-times-circle"></i>
                    <span class="btn-txt">Delete</span>
                </button>
            </div>
            <div class="col-3">
                <button type="button" name="button" class="btn" id="btnSelect">
                    <i class="fas fa-check-circle"></i>
                    <span class="btn-txt">Select all</span>
                </button>
                <button type="button" name="button" class="btn" id="btnDeselect" style="display: none;">
                    <i class="fas fa-circle"></i>
                    <span class="btn-txt">Deselect all</span>
                </button>
            </div>
        </div>
    </div>`;
}

let user_card_admin = function user_card_admin(data){
    console.log(data);
    return `<div class="card">
        <div class="row">
            <div class="col-sm-3">
                <img src="../../public/img/common/user.png" alt="User A">
            </div>
            <div class="col-sm-6">
                <div class="title">
                    <a href="../users/index.html?id=${data.id}" id="user-${data.id}">${data.username}</a>
                </div>
            </div>
            <div class="col-sm-3 project-footer">
            </div>
        </div>
    </div>`;
}

let request_users = function request_users() {
    // TODO: if search != null end point /users/ shold have the inpuy or something
    data = {
    }
    console.log(user_search);
    if(user_search == null){
        $(document).ready(request(token, null, '/users/', 'GET', data, function_succes, function_fail));
    }
    else{
        $(document).ready(request(token, null, '/users?filter=' + user_search, 'GET', data, function_succes, function_fail));
    }
    return true;
}

let function_succes = function function_succes(res){
    console.log(res);
    append_to_body(top_nav());
    append_to_body(search_users_admin());
    $.each(res, function(i) {
        append_to_body(user_card_admin(res[i]));
    });
    append_to_body(footer_code());
    throw_alert_func();
    menu_side();
    add_remaining_to_an_element();
    filter_users();

}

let function_fail = function function_fail(res){
    console.log(res);
    console.log('kuma no ochinchi');
    // TODO: put here in case valid data but user not gegistered
};

request_users();

let throw_alert = function(entity, action, undoable) {
    var entity_text = entity;
    var have_text   = 'has';
    var verb_text   = 'is';
    var undo_text   = undoable
                    ? ''
                    : 'This action cannot be undone';

    if ($('.card-selected').length > 1) {
        entity_text = entity + 's';
        have_text   = 'have';
        verb_text   = 'are';
    }

    swal({
        type: 'warning',
        title: 'Are you sure you want to ' + action +' this ' + entity_text +'?',
        text: undo_text,
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure',
        cancelButtonText: 'No, I changed my mind'
    }).then((result) => {
        if (result.value) {
            let users_to_delete = $('.card-selected');
            $.each(users_to_delete, function(i) {
                id_user_str = $($('.card-selected')[i]).find("a").attr("id");
                request(token, null, '/users/' + id_user_str.substring('user-'.length), 'DELETE', data, function_succes_delete, function_fail_delete);
            });
        } else if (result.dismiss === swal.DismissReason.cancel) {
            swal(
              'Cancelled',
              'Your ' + entity_text + ' ' + verb_text + ' safe :)',
              'info'
            )
        }
    });
}

let function_succes_delete = function function_succes_delete(res){
    window.location.replace('../users/index.html');
}

let function_fail_delete = function function_fail_delete(res){
    swal(
      'ERROR',
      'YOUT DONT HAVE THE PERMITIONS TO PERFOM THIS ACTION',
      'error'
    );
}


let filter_users = function filter_users(){
    $('#filter-button').click(function(e) {
        let search_value = $('#search_filter').val();
        if(search_value != ""){
            window.location.replace('../users/search_user.html?user_search=' + search_value);
        }
    });
    $('#filternt-button').click(function(e) {
        if(user_search != null){
            window.location.replace('../user/search_user.html');
        }
    });
}
