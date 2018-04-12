let validate_form = function validate_form(e){
    e.preventDefault();

    // console.log(e);

    let valid_form = true;

    let button = $(this);

    let form = button.parent('form');

    let required = form.find('*[required]');

    spans = form.find('.error-message')

    remove_errors(spans, required);

    valid_form = validate_required_fields(required);


}

let validate_required_fields = function validate_required_fields(fields){
    let valid_form = true;
    let regex_var;
    $.each(fields, function(){
        let element = $(this);
        if(element.is('input')){
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
                        }
                        break;
                    case 'password':
                        regex_var = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/;
                        if (!element.val().match(regex_var)){
                            generate_error(element, 'Please enter a valid password');
                        }
                        break;
                    case 'email':
                        regex_var = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                        if (!element.val().match(regex_var)){
                            generate_error(element, 'Please enter a valid password');
                        }
                        break;
                    default:

                }
            }
        }
    });
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
