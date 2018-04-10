$(document).ready( function() {
    $("#hide_file_tree").click(function(){
        $("#file_tree").hide();
        $("#editor").removeClass('col-md-10');
        $("#editor").addClass('col-md-12');
        $("#editor").removeClass('col-xs-11');
        $("#editor").addClass('col-xs-12');
        $(this).hide();
        $("#show_file_tree").show();
    });

    $("#show_file_tree").click(function(){
        $("#file_tree").show();
        $("#editor").removeClass('col-md-12');
        $("#editor").addClass('col-md-10');
        $("#editor").removeClass('col-xs-12');
        $("#editor").addClass('col-xs-11');
        $(this).hide();
        $("#hide_file_tree").show();
    });
});
