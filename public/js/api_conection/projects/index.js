let url = new URL(window.location.href);
let project_search = url.searchParams.get("project_search");
let token = localStorage.getItem('token');
let request_projects = function request_projects() {
    // TODO: if search != null end point /projects/ shold have the inpuy or something
    data = {
    }
    console.log(project_search);
    if(project_search == null){
        $(document).ready(request(token, null, '/projects/', 'GET', data, function_succes, function_fail));
    }
    else{
        $(document).ready(request(token, null, '/projects?filter=' + project_search, 'GET', data, function_succes, function_fail));
    }
    return true;
}

let function_succes = function function_succes(res){
    append_to_body(top_nav());
    append_to_body(search_projects());
    $.each(res, function(i) {
        append_to_body(project_card(res[i]));
    });
    append_to_body(footer_code());
    throw_alert_func();
    menu_side();
    add_remaining_to_an_element();
    filter_projects();
}

let function_fail = function function_fail(res){
    console.log(res);
    console.log('kuma no ochinchi');
    // TODO: put here in case valid data but user not gegistered
};

request_projects();

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
            let projects_to_delete = $('.card-selected');
            $.each(projects_to_delete, function(i) {
                id_project_str = $($('.card-selected')[i]).find("a").attr("id");
                request(token, null, '/projects/' + id_project_str.substring('project-'.length), 'DELETE', data, function_succes_delete, function_fail_delete);
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
    window.location.replace('../projects/index.html');
}

let function_fail_delete = function function_fail_delete(res){
    swal(
      'ERROR',
      'YOUT DONT HAVE THE PERMITIONS TO PERFOM THIS ACTION',
      'error'
    );
}


let filter_projects = function filter_projects(){
    $('#filter-button').click(function(e) {
        let search_value = $('#search_filter').val();
        if(search_value != ""){
            window.location.replace('../projects/index.html?project_search=' + search_value);
        }
    });
    $('#filternt-button').click(function(e) {
        if(project_search != null){
            window.location.replace('../projects/index.html');
        }
    });
}
