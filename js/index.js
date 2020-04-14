
$("#btnFooterAmigos").click(function(event) {
   
    $('#feed').toggleClass('d-none');
    $('#amigos').toggleClass('d-none');

    let str = $('#btnFooterAmigos')[0].innerText;

    if( str == 'Amigos') {
      $('#btnFooterAmigos').text('Feed')
    }

    if(str == 'Feed') {
      $('#btnFooterAmigos').text('Amigos')
    }    
    
  });