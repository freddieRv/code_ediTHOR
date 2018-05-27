let search_projects = function search_projects(){
    return "<div class=\"row\"> \
        <div class=\"col-md-3\"> \
            <a class=\"btn-success\" href=\"create.html\">Create new project</a> \
        </div> \
    </div> \
    <div class=\"card-actions\" id=\"filters\"> \
        <div class=\"row justify-content-center\"> \
            <div class=\"col-sm-6\"> \
                <label> \
                    Name \
                    <input type=\"text\" name=\"\" value=\"\" placeholder=\"My project\"> \
                </label> \
            </div> \
            <div class=\"col-sm-6\"> \
                <label> \
                    Status \
                    <input type=\"text\" name=\"\" value=\"\" placeholder=\"active | archived\"> \
                </label> \
            </div> \
        </div> \
        <div class=\"row\"> \
            <div class=\"col-sm-2\"> \
                <button type=\"button\" name=\"button\" class=\"btn\"> \
                    <i class=\"fas fa-filter\"></i> \
                    <span class=\"btn-txt\">Filter</span> \
                </button> \
            </div> \
        </div> \
    </div>";
}
