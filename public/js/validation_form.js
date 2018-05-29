let validate_form = function validate_form(e){
    e.preventDefault();

    var valid_form = true;

    let button = $(this);

    let form = button.closest('form');

    let required = form.find('*[required]');
    console.log(required);

    spans = form.find('.error-message')

    remove_errors(spans, required);

    valid_form = validate_required_fields(required);
    if(valid_form){
        fuction_form(form.attr('id'));
    }
}

let validate_required_fields = function validate_required_fields(fields){
    let valid_form = true;
    let regex_var;
    let password = '';
    $.each(fields, function(){

        let element = $(this);
        if(element.is('input') || element.is('textarea')){
            if(element.val() === ''){
                generate_error(element, 'This field is required');
                valid_form = false;
            }
            else {
                switch (element.attr('id')) {
                    case 'username':
                        regex_var = /^[a-zA-Z_][a-zA-Z_0-9]{4,11}$/;
                        if (!element.val().match(regex_var)){
                            generate_error(element, 'Please enter a valid username');
                            valid_form = false;
                        }
                        break;
                    case 'password':
                        regex_var   = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/;
                        password    = element.val();
                        if (!element.val().match(regex_var)){
                            generate_error(element, 'Please enter a valid password');
                            valid_form = false;
                        }
                        break;
                    case 'email':
                        regex_var = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (!element.val().match(regex_var)){
                            generate_error(element, 'Please enter a valid email');
                            valid_form = false;
                        }
                        break;
                    case 'repeat-password':
                        if(element.val() !== password){
                            generate_error(element, 'Password does not match with previous password');
                            valid_form = false;
                        }
                        break;
                    case 'name-project':
                        regex_var = /^\w+([\/\.-]?\w+)*$/;
                        if (!element.val().match(regex_var)){
                            generate_error(element, 'Please enter a valid name for your project');
                            valid_form = false;
                        }
                        break;
                    default:
                }
            }
        }
    });
    return valid_form;
}

let generate_error = function generate_error(element, type_error){
    element.addClass('error');
    $('<span class="error-message"><br>' + type_error + '</span>').insertAfter(element);
}

let remove_errors = function remove_errors(fields, required){
    $.each(fields, function(){
        required.removeClass('error');
        let element = $(this);
        element.remove();
    });
}

let fuction_form = function fuction_form(type){
    switch (type) {
        case 'form-login':
            request_login();
            break;
        case 'form-register':
            request_register();
            break;
        case 'form-project':
            create_project();
            break;
        case 'form-update':{
            data = {
                username: $('#username').val(),
                password: $('#password').val(),
                email:    $('#email').val(),
                password_confirmation: $('#repeat-password').val()
            }
            console.log(data);
            request(token, null, '/users/' + user_id, 'PUT', data, function_succes_update, function_fail_update);
            break;
        }
        default:

    }
}

let function_fail_update = function function_fail_update(){

};

let function_succes_update = function function_succes_update(){
    window.location.replace('../users/index.html?id=' + user_id);
};
