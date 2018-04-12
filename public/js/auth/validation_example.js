.manual_lead_error {
    border: 1px solid red;
    border-radius: 5px;
}

============================================================================================

<form class="" action="index.html" method="post">
    <div class="col-md-4 col-xs-6">
        <label for="roof_type"> Roof type: </label>
        <div class="form_group" id="roof_types">
            <label>
                Something
                <input type="radio" name="roof_type_id" value="0">
            </label>
            <label>
                Something else
                <input type="radio" name="roof_type_id" value="1">
            </label>
            <label>
                what
                <input type="radio" name="roof_type_id" value="2">
            </label>
        </div>
        <div style="display: none;" id="roof_types_error">
            <strong>This field is required</strong>
        </div>
    </div>
    <div class="row">
        <div class="pull-right">
            <div class="col-md-3 col-xs-6">
                <button type="button" class="btn btn-fill btn-success" name="button" id="btn_submit">Submit</button>
            </div>
        </div>
    </div>
</form>

==========================================================================================

$("input[name=roof_type_id]").click(function() {
    $("#roof_types_error").hide();
    $("#roof_types").removeClass("manual_lead_error");
});

$("#btn_submit").click(function() {
    errors = false;

    if (!$("input[name=roof_type_id]:checked").val()) {
        $("#roof_types_error").show();
        $("#roof_types").addClass("manual_lead_error");
        errors = true;
    }

    if (!errors) {
        $("#appointment").submit();
    }

});
