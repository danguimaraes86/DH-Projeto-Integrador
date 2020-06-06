$('.btn-curtir').click((e)=>{
    e.preventDefault()

    let {id} = $('.post-completo')[0]
    id = id.split('-');

    fetch(`${BASE_URL}curtir/post/${id[2]}`)
    .then(resposta => resposta.json()
        .then((data) =>{
            $('#contador-curtidas').text(`${data.qtdCurtida}`)
            $('#contador-curtidas').removeClass(`curtida`)
            $('#contador-curtidas').addClass(`${data.status}`)
    }));
})

$('.btn-curtir-home').click((e)=>{
    e.preventDefault()
    
    const BASE_URL = 'http://localhost:3000/'
    const {id} = e.target.parentNode.parentNode.parentNode.parentNode

    fetch(`${BASE_URL}curtir/post/${id}`)
    .then(resposta => resposta.json()
        .then((data) =>{
            let curtida = e.target.childNodes[1]
            curtida.innerText =`${data.qtdCurtida}`
            curtida.classList.remove(`curtida`)
                if(data.status != ''){
                curtida.classList.add(`${data.status}`)
            }
    }));
})
