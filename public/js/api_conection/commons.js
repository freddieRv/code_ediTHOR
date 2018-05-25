var request = function request(auth_token, function_token, end_point, type, data, function_succ, function_fa) {
    if (auth_token != null && function_token != null) {
        function_token();
    }
    $.ajax({
        url:        API_URL + end_point,
        type:       type,
        data:       data,
        success:    function_succ,
        fail:       function_fa
    });
};
