let add_about_us = function add_about_us(){
    return `<div class="row questions">
        <div class="col-md-4 col-sm-12 logo">
            <figure>
                <img src="../../public/img/common/thor-trans-1.png" alt="mjolnir">
            </figure>
        </div>
        <div class="col-md-8 col-sm-12">
            <h2>About us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h2>About the company</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div>`;
};
main_function();
append_to_body(top_nav());
append_to_body(add_about_us());
append_to_body(footer_code());
add_remaining_to_an_element();
menu_side();
