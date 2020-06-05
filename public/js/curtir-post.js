

$('.btn-curtir').click((e)=>{
    e.preventDefault()
    var {id} = $('.post-completo')[0]
    id = id.split('-');


    fetch(`${BASE_URL}curtir/post/${id[2]}`)
    .then(resposta => resposta.json()
        .then((data) =>{

            $('#contador-curtidas').text(`${data.qtdCurtida}`)
            
            
    }));
})

