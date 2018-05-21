var editor     = ace.edit("editor");
var file_tree  = $("#file_tree");

$("#hide_file_tree").click(function() {
    $("#file_tree").hide();
    $("#editor").removeClass('col-md-10');
    $("#editor").addClass('col-md-12');
    $("#editor").removeClass('col-sm-10');
    $("#editor").addClass('col-sm-12');
    $(this).hide();
    $("#show_file_tree").show();
    editor.resize();
});

$("#show_file_tree").click(function() {
    $("#file_tree").show();
    $("#editor").removeClass('col-md-12');
    $("#editor").addClass('col-md-10');
    $("#editor").removeClass('col-sm-12');
    $("#editor").addClass('col-sm-10');
    $(this).hide();
    $("#hide_file_tree").show();
    editor.resize();
});

$.url_param = function(param) {
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);

    return results[1] || 0;
}

$(document).ready( function() {
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
    editor.session.setUseSoftTabs(true);

    editor.focus();

    var project_id = $.url_param('project_id');

    var api_url = "http://localhost:3000/projects/" + project_id + "/files";

    file_tree.jstree({
        'core' : {
            'data' : $.ajaxSetup({
                type : 'GET',
                headers : {
                    // TODO: where to get this access token from?
                    'x-access-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTI2ODY1OTQxLCJleHAiOjE1MjY5NTIzNDF9.7M4OVaJHLfk2EVG19lZprDkqCZ7JUFOOI_62uGRNeKU"
                },
                'dataType' : "json",
                'url' : api_url,
            }),
        }
    });

});
