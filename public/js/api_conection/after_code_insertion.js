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
let log_out_funct = function log_out_funct(e){
    window.localStorage.clear();
    window.location.replace('../auth/index.html');
}

let menu_side = function menu_side(){
    let log_out_btn = $('#log-out');
    log_out_btn.on('click', log_out_funct);
}
