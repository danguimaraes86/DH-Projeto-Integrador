$("#btn-footer-amigos").click(function (event) {

  $('#feed').addClass('d-none');
  $('#amigos').removeClass('d-none');

})

$("#btn-footer-home").click(function (event) {

  $('#feed').removeClass('d-none');
  $('#amigos').addClass('d-none');

})

// $(document).ready(function () {
//   $([name='publico-favoritos']).click(function () {
//     var vMostrar = $('input:radio:checked').val();
//     alert(vMostrar);
//   });
// })