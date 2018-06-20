let token = localStorage.getItem('token');
if(token == null){
    console.log(token);
    console.log((token == null));
    console.log((token === null));
    window.location.replace('../auth/index.html');
}
let create_project = function create_project() {

    console.log(token);
    data = {
        name:           $('#name-project').val(),
        description:    $('#description-project').val()
    }
    console.log(data);
    request(token, null, '/projects/', 'POST', data, function_succes, function_fail);
};

let function_succes = function function_succes(res){
    window.location.replace('../projects/index.html');
};

let function_fail = function function_fail(res){
    swal(
      'ERROR',
      'Something went wrong.',
      'error'
    );
};

let create_project_code = function create_project_code(){
    return `<form action="#" method="post" id="form-project">
        <div class="row">
            <div class="col-12">
                <div class="title">
                    Create new project
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <label for="name">Name</label>
                <input type="text" name="name" id="name-project" placeholder="give your project a cool name" required>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <label for="description">Description</label>
                <textarea
                    name="description"
                    id="description-project"
                    rows="2"
                    cols="80"
                    placeholder="Describe your project in a few words"
                    required
                ></textarea>
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <br>
                <button class="btn-danger" type="button" name="cancel" id="cancel-project">Cancel</button>
            </div>
            <div class="col-6">
                <br>
                <button class="btn-success" type="submit" name="save" id="create-project">Create project</button>
            </div>
        </div>
    </form>`;
};

let load_buttons = function load_buttons(){
    $('#cancel-project').click(function(e) {
        window.location.replace('../projects/index.html');
    });
    let submit_butons = $('#create-project');
    submit_butons.on('click', validate_form);
};


append_to_body(top_nav());
append_to_body(create_project_code());
append_to_body(footer_code());
add_remaining_to_an_element();
menu_side();
load_buttons();
