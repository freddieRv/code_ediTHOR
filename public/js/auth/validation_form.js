let validate_form = function validate_form(e){
    e.preventDefault();

    console.log(e);

    let valid_form = true;

    let button = $(this);

    let form = button.parent('form');

    let required = form.find('*[required]');

    valid_form = validate_required_fields(required);


}

let validate_required_fields = function validate_required_fields(fields){
    let valid_form = true;
    $.each(fields, function(){
        let element = $(this);
        if(element.is('input')){
            if(element.val() === ''){
                generate_error(element, 'This field is required');
            }
        }
    });
}

let generate_error = function generate_error(element, type_error){
    element.addClass('error');
    element.inserAfter();
    $('<span class="error-message">' + type_error + '</span>').inserAfter(element);
}
