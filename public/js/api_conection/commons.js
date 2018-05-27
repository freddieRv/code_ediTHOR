const API_URL = 'http://localhost:3000'
var request = function request(auth_token, function_token, end_point, type, data, function_succ, function_fa) {
    if (auth_token != null && function_token != null) {
        function_token();
    }
    $.ajax({
        url:        API_URL + end_point,
        type:       type,
        data:       data,
        success:    function_succ,
        fail:       function_fa,
        headers: {
            'x-access-token': auth_token
        }
    });
};

let main_function = function main_function(){
    let token = localStorage.getItem('token');
    if(token != null){
        window.location.replace('../main/index.html');
    }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// FIXME: window onclick should function getting the object image

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function append_to_body(code){
    $(code).appendTo( '#container_body' );
}
$(top_nav()).appendTo( '#container_body' );
console.log(localStorage.getItem('token'));
let log_out_funct = function log_out_funct(e){
    console.log('pato');
    window.localStorage.clear();
    window.location.replace('../auth/index.html');
}

let log_out_btn = $('#log-out');
console.log(log_out_btn);
log_out_btn.on('click', log_out_funct);
