const LANG_HIGHLIGHT = {
    'cpp':  'ace/mode/c_cpp',
    'c':    'ace/mode/c_cpp',
    'java': 'ace/mode/java',
    'py':   'ace/mode/python',
}

var editor       = ace.edit("editor");
var file_tree    = $("#file_tree");
var current_file = 0;

$("#btn_save").click(function() {
    if (!current_file) {
        swal({
            type:  "warning",
            title: "Nothing to save"
        });
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/files/' + current_file,
        type: 'PUT',
        dataType: 'json',
        headers: {
            'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NDMxODYzLCJleHAiOjE1Mjc1MTgyNjN9.kXiWL-4qMCpkP3qjIhswOGP4vJUqclfbyogiwizXmVc"
        },
        data: {
            content: btoa(editor.getValue()),
        },
        success: function(res) {
            swal({
                type:  "success",
                title: "File successfuly saved"
            });
        },
        fail: function(err) {
            console.log(err);
        }
    });

});

$("#btn_update").click(function() {
    if (!current_file) {
        swal({
            type:  "warning",
            title: "Nothing to update"
        });
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/files/' + current_file,
        type: 'GET',
        headers: {
            'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NDMxODYzLCJleHAiOjE1Mjc1MTgyNjN9.kXiWL-4qMCpkP3qjIhswOGP4vJUqclfbyogiwizXmVc"
        },
        success: function(res) {
            var decoded_content = atob(res.content);
            var file_name       = res.name;
            var file_ext        = file_name.split(".")[1];

            current_file = res.id;

            editor.setValue(decoded_content);
            editor.session.setMode(LANG_HIGHLIGHT[file_ext]);
        },
        fail: function(err) {
            console.log(err);
        }
    });

});

$("#btn_run").click(function() {
    if (!current_file) {
        swal({
            type:  "warning",
            title: "Nothing to execute"
        });
        return;
    }

    // Save file
    $.ajax({
        url: 'http://localhost:3000/files/' + current_file,
        type: 'PUT',
        dataType: 'json',
        headers: {
            'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NDMxODYzLCJleHAiOjE1Mjc1MTgyNjN9.kXiWL-4qMCpkP3qjIhswOGP4vJUqclfbyogiwizXmVc"
        },
        data: {
            content: btoa(editor.getValue()),
        },
        fail: function(err) {
            swal({
                type: 'error',
                title: 'There was an error saving the file, please try again'
            });
        }
    });

    $.ajax({
        url: 'http://localhost:3000/files/' + current_file + '/exec',
        type: 'GET',
        headers: {
            'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NDMxODYzLCJleHAiOjE1Mjc1MTgyNjN9.kXiWL-4qMCpkP3qjIhswOGP4vJUqclfbyogiwizXmVc"
        },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var html = "";

            for (var i = 0; i < res.console_log.length; i++) {
                html += res.console_log[i] + "\n";
            }

            $("#console").html(html);
        },
        fail: function(err) {
            console.log(err);
        }
    });

});

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
    editor.session.setUseSoftTabs(true);
    editor.focus();

    var project_id = $.url_param('project_id');

    var api_url = "http://localhost:3000/projects/" + project_id + "/files";

    file_tree.jstree({
        'core' : {
            'check_callback' : true ,
            'data' : $.ajaxSetup({
                type : 'GET',
                headers : {
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NDMxODYzLCJleHAiOjE1Mjc1MTgyNjN9.kXiWL-4qMCpkP3qjIhswOGP4vJUqclfbyogiwizXmVc"
                },
                'dataType' : "json",
                'url' : api_url,
            }),
            'contextmenu': {
                'items': [
                    {
                        'label': 'Test',
                        'action': function(e) {console.log(e);},
                    }
                ]
            },
            'types': {
                'd': {
                    'icon': "fa folder",
                },
                'f': {
                    'icon': "fa file-code-o",
                }
            },
            'plugins' : [
                "contextmenu",
                "types",
            ],
        }
    });

    file_tree.on("select_node.jstree", function (e, data) {
        if (data.node.original.type == 'f') {
            $.ajax({
                url: 'http://localhost:3000/files/' + data.node.original.id,
                type: 'GET',
                headers: {
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NDMxODYzLCJleHAiOjE1Mjc1MTgyNjN9.kXiWL-4qMCpkP3qjIhswOGP4vJUqclfbyogiwizXmVc"
                },
                success: function(res) {
                    var decoded_content = atob(res.content);
                    var file_name       = res.name;
                    var file_ext        = file_name.split(".")[1];

                    current_file = res.id;

                    editor.setValue(decoded_content);
                    editor.session.setMode(LANG_HIGHLIGHT[file_ext]);
                },
                fail: function(err) {
                    console.log(err);
                }
            });
        }
    });

});
