const BASE_URL_APP = window.location.hostname;

$("#btn-footer-amigos").click(function (event) {

  $('#feed').addClass('d-none');
  $('#amigos').removeClass('d-none');

})

$("#btn-footer-home").click(function (event) {

  $('#feed').removeClass('d-none');
  $('#amigos').addClass('d-none');

})

