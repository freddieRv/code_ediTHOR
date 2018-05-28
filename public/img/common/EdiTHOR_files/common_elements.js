let top_nav = function top_nav() {
    return `<div class="row top-nav">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="topnav-icon">
                        <div class="dropdown">
                            <img onclick="myFunction()" id="img_2" border="0" src="../../public/img/common/test_1.png" alt="ediTHOR" class="dropbtn edithor-navbar">
                            <div id="myDropdown" class="dropdown-content">
                                <p>Home</p>
                                <p>About</p>
                                <p id="log-out">Log out</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <form class="#" method="post">
                        <input type="search" placeholder="Search...">
                    </form>
                </div>
            </div>
        </div>
    </div>`;
}

let search_projects = function search_projects(){
    return `<div class="row">
        <div class="col-md-3">
            <a class="btn-success" href="create.html">Create new project</a>
        </div>
    </div>
    <div class="card-actions" id="filters">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <label>
                    Name
                    <input type="text" name="" value="" placeholder="My project">
                </label>
            </div>
            <div class="col-sm-6">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <button type="button" name="button" class="btn">
                    <i class="fas fa-filter"></i>
                    <span class="btn-txt">Filter</span>
                </button>
            </div>
        </div>
    </div>
    <div class="card-actions" style="display: none;" id="actions">
        <div class="row">
            <div class="col-3">
                <button type="button" name="button" class="btn">
                    <i class="fas fa-download"></i>
                    <span class="btn-txt">Download as zip</span>
                </button>
            </div>
            <div class="col-3">
                <button type="button" name="button" class="btn" id="btnDelete">
                    <i class="fas fa-times-circle"></i>
                    <span class="btn-txt">Delete</span>
                </button>
            </div>
            <div class="col-3">
                <button type="button" name="button" class="btn" id="btnSelect">
                    <i class="fas fa-check-circle"></i>
                    <span class="btn-txt">Select all</span>
                </button>
                <button type="button" name="button" class="btn" id="btnDeselect" style="display: none;">
                    <i class="fas fa-circle"></i>
                    <span class="btn-txt">Deselect all</span>
                </button>
            </div>
        </div>
    </div>`;
}

let project_card = function project_card(data){
    return `<div class="card">
        <div class="row">
            <div class="col-sm-3">
                <img src="../../public/img/common/folder.png" alt="Project A">
            </div>
            <div class="col-sm-6">
                <div class="title">
                    <a href="show.html?project_id=${data.id}" id="project-${data.id}">${data.name}</a>
                </div>
                <div class="description">
                    Project description: ${data.description}
                </div>
            </div>
            <div class="col-sm-3 project-footer">
                <p>
                    4 participants
                </p>
                <p>
                    Updated less than 1 hour ago
                </p>
            </div>
        </div>
    </div>`;
}


let rest_code = function rest_code(){
    return `<div class="row  form-group console">
        <div class="col-3">
            <button type="button" name="button" class="btn">
                <i class="fas fa-play"></i>
                <span class="btn-txt">Run</span>
            </button>
        </div>
        <div class="col-3">
            <button type="button" name="button" class="btn">
                <i class="fas fa-cloud-download-alt"></i>
                <span class="btn-txt">Update</span>
            </button>
        </div>
        <div class="col-3">
            <button type="button" name="button" class="btn">
                <i class="fas fa-sliders-h"></i>
                <span class="btn-txt">Settings</span>
            </button>
        </div>
        <div class="col-3">
            <button type="button" name="button" class="btn" id="hide_file_tree">
                <i class="fas fa-arrow-alt-circle-left"></i>
                <span class="btn-txt">Hide file tree</span>
            </button>
            <button type="button" name="button" class="btn" style="display: none;" id="show_file_tree">
                <i class="fas fa-arrow-alt-circle-right"></i>
                <span class="btn-txt">Show file tree</span>
            </button>
        </div>
    </div>
    <div class="row  form-group">
        <div class="col-sm-2 file-tree" id="file_tree">
            <pre>
> file explorer
> what
- some
- file
            </pre>
        </div>
        <div class="col-sm-10 align-self-stretch editor" id="editor" style="height: 400px;"></div>
    </div>
    <div class="row form-group">
        <div class="col-12 form form-group console">
            <pre>
>>> console
>>>
            </pre>
        </div>
    </div>`;
}
