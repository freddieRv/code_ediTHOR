const var API_URL   = 'http://localhost:3000';
var auth_token      = 0;

$.ajaxSetup({
  url: API_URL,
  headers: {
    'x-action-token': auth_token
  }
})
