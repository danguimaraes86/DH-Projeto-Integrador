const BASE_URL_APP = 'https://veg-me.herokuapp.com';

$("#btn-footer-amigos").click(function (event) {

  $('#feed').addClass('d-none');
  $('#amigos').removeClass('d-none');

})

$("#btn-footer-home").click(function (event) {

  $('#feed').removeClass('d-none');
  $('#amigos').addClass('d-none');

})

