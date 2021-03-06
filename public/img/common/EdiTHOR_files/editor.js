$(document).ready( function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
    editor.session.setUseSoftTabs(true);

    editor.focus()

    $("#hide_file_tree").click(function(){
        $("#file_tree").hide();
        $("#editor").removeClass('col-md-10');
        $("#editor").addClass('col-md-12');
        $("#editor").removeClass('col-sm-10');
        $("#editor").addClass('col-sm-12');
        $(this).hide();
        $("#show_file_tree").show();
        editor.resize();
    });

    $("#show_file_tree").click(function(){
        $("#file_tree").show();
        $("#editor").removeClass('col-md-12');
        $("#editor").addClass('col-md-10');
        $("#editor").removeClass('col-sm-12');
        $("#editor").addClass('col-sm-10');
        $(this).hide();
        $("#hide_file_tree").show();
        editor.resize();
    });
});
