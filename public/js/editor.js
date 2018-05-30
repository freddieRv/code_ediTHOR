$('#user-link').append(localStorage.getItem('username'));
let kepp_size = function kepp_size(){
    let body_height = document.getElementById('super-body').offsetHeight;
    let window_height = $(window).height();
    let current_height = $('#console').height();
    if (body_height < window_height){
        $('#console').height(window_height - body_height + current_height)
    }
}
const LANG_HIGHLIGHT = {
    'cpp':  'ace/mode/c_cpp',
    'c':    'ace/mode/c_cpp',
    'java': 'ace/mode/java',
    'py':   'ace/mode/python',
}

var editor       = ace.edit("editor");
var file_tree    = $("#file_tree");
var current_file = 0;
var auth_token   = localStorage.getItem('token');
var mousedown    = 0;

document.body.onmousedown = function() {
    mousedown++;
}

document.body.onmouseup = function() {
    mousedown--;
}

$("#btn_save").click(function() {
    if (!current_file) {
        swal({
            type:  "warning",
            title: "Nothing to save"
        });
        return;
    }

    $.ajax({
        url: API_URL + '/files/' + current_file,
        type: 'PUT',
        dataType: 'json',
        headers: {
            'x-access-token': auth_token
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
        url: API_URL + '/files/' + current_file,
        type: 'GET',
        headers: {
            'x-access-token': auth_token
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

    $.ajax({
        url: API_URL + '/files/' + current_file,
        type: 'PUT',
        dataType: 'json',
        headers: {
            'x-access-token': auth_token
        },
        data: {
            content: btoa(editor.getValue()),
        },
        success: function(res) {
            $.ajax({
                url: API_URL + '/files/' + current_file + '/exec',
                type: 'GET',
                headers: {
                    'x-access-token': auth_token
                },
                dataType: 'json',
                success: function(res) {
                    var html = "";

                    for (var i = 0; i < res.console_log.length; i++) {
                        html += res.console_log[i] + "\n";
                    }

                    $("#console").html(html);
                    kepp_size();
                },
                fail: function(err) {
                    console.log(err);
                }
            });
        },
        error: function(err) {
            swal({
                type: 'error',
                title: 'There was an error saving the file, please try again'
            });
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

function create_file(type, name, father_id)
{
    switch (type) {
        case "default":
            $.ajax({
                url: API_URL + '/projects/' + $.url_param('project_id') + '/dir',
                type: 'POST',
                dataType: 'json',
                headers: {
                    'x-access-token': auth_token
                },
                data: {
                    name: name,
                    father_id: father_id,
                },
                success: function(res) {
                    file_tree.jstree(true).refresh();
                },
                error: function(err) {
                    swal({
                        type:  "error",
                        title: "There was an error creating the directory"
                    });

                    file_tree.jstree(true).refresh();
                }
            });
            break;
        case "file":
            $.ajax({
                url: API_URL + '/projects/' + $.url_param('project_id') + '/files',
                type: 'POST',
                dataType: 'json',
                headers: {
                    'x-access-token': auth_token
                },
                data: {
                    name: name,
                    father_id: father_id,
                    file: "",
                },
                success: function(res) {
                    file_tree.jstree(true).refresh();
                },
                error: function(err) {
                    swal({
                        type:  "error",
                        title: "There was an error creating your file"
                    });

                    file_tree.jstree(true).refresh();
                }
            });
            break;
    }

}

file_tree.on("select_node.jstree", function (e, data) {
    if (data.node.original.type == 'file') {
        $.ajax({
            url: API_URL + '/files/' + data.node.original.id,
            type: 'GET',
            headers: {
                'x-access-token': auth_token
            },
            success: function(res) {
                var decoded_content = atob(res.content);
                var file_name       = res.name;
                var file_ext        = file_name.split(".")[1];

                current_file = res.id;

                editor.setValue(decoded_content);
                editor.session.setMode(LANG_HIGHLIGHT[file_ext]);
                editor.setReadOnly(false)
            },
            fail: function(err) {
                console.log(err);
            }
        });
    }
});

function update_file(id, data)
{
    $.ajax({
        url: API_URL + '/files/' + id,
        type: 'PUT',
        dataType: 'json',
        headers: {
            'x-access-token': auth_token
        },
        data: data,
        error: function(err) {
            swal({
                type:  "error",
                title: "There was an error renaming this file/directory"
            });
        }
    });
}

$(document).ready( function() {
    editor.setTheme("ace/theme/monokai");
    editor.session.setUseSoftTabs(true);
    editor.setReadOnly(true);

    var project_id = $.url_param('project_id');

    file_tree.jstree({
        'core' : {
            'data' : $.ajaxSetup({
                type : 'GET',
                headers : {
                    'x-access-token': auth_token
                },
                'dataType' : "json",
                'url' : API_URL + "/projects/" + project_id + "/files",
            }),
            'check_callback' : function(o, n, p, i, m) {
                if(m && m.dnd && m.pos !== 'i') {
                    return false;
                }

                if (o === "delete_node") {
                    $.ajax({
                        url: API_URL + '/files/' + n.id,
                        type: 'DELETE',
                        dataType: 'json',
                        headers: {
                            'x-access-token': auth_token
                        },
                        data: {
                            name: i,
                            father_id: p.id,
                        },
                        error: function(err) {
                            swal({
                                type:  "error",
                                title: "There was an error deleting this file/directory"
                            });


                        }
                    });
                }

                if(o === "move_node" || o === "copy_node") {
                    if (this.get_node(n).parent === this.get_node(p).id) {
                        return false;
                    }

                    if (!mousedown) {
                        update_file(n.id, {father_id: p.id});
                    }
                }

                if (o == "rename_node") {
                    var search = n.id.search("_");

                    if (search == -1) {
                        update_file(n.id, {name: i});
                    } else {
                        create_file(n.type, i, p.id);
                    }

                }

                return true;
            },
            'themes' : {
                'responsive' : false,
                'variant' : 'small',
                'stripes' : true
            }
        },
        'sort' : function(a, b) {
            return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
        },
        'contextmenu' : {
            'items' : function(node) {
                var tmp = $.jstree.defaults.contextmenu.items();

                delete tmp.create.action;
                tmp.create.label = "New";

                tmp.create.submenu = {
                    "create_folder" : {
                        "separator_after" : true,
                        "label" : "Folder",
                        "action" : function (data) {
                            var inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            inst.create_node(
                                obj,
                                {
                                    type : "default"
                                },
                                "last",
                                function (new_node) {
                                    setTimeout(function () {
                                        inst.edit(new_node);
                                    },
                                    0
                                );
                            });

                        }
                    },
                    "create_file" : {
                        "label" : "File",
                        "action" : function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj  = inst.get_node(data.reference);

                            inst.create_node(
                                obj,
                                {
                                    type : "file"
                                },
                                "last",
                                function (new_node) {
                                    setTimeout(function () {
                                        inst.edit(new_node);
                                    },
                                    0
                                );
                            });
                        }
                    }
                };

                if(this.get_type(node) === "file") {
                    delete tmp.create;
                }

                return tmp;
            }
        },
        'types' : {
            'default' : {
                'icon' : 'fa fa-folder'
            },
            'file' : {
                'valid_children' : [],
                'icon' : 'fa fa-file'
            }
        },
        'unique' : {
            'duplicate' : function (name, counter) {
                return name + ' ' + counter;
            }
        },
        'plugins' : [
            'state',
            'dnd',
            'sort',
            'types',
            'contextmenu',
            'unique'
        ]
    })

});

menu_side();
kepp_size();
