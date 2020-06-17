//Metodo que cuida da ação curtir, do PostCompleto
const curtirPostCompleto = () => {
    let { id } = $('.post-completo')[0]
    id = id.split('-');

    fetch(`${BASE_URL_APP}/curtir/post/${id[2]}`)
        .then(resposta => resposta.json()
            .then((data) => {

                $('#contador-curtidas').text(`${data.qtdCurtida}`)
                $('#contador-curtidas').removeClass(`curtida`)
                $('#contador-curtidas').addClass(`${data.status}`)
            }));
}

$('.btn-curtir').click((e) => {
    e.preventDefault()
    curtirPostCompleto();
})

const curtirPostHome = (e) => {

    const { id } = e.target.parentNode.parentNode.parentNode.parentNode

    fetch(`${BASE_URL_APP}/curtir/post/${id}`)
        .then(resposta => resposta.json()
            .then((data) => {
                let curtida = e.target.childNodes[1]
                curtida.innerText = `${data.qtdCurtida}`
                curtida.classList.remove(`curtida`)
                if (data.status != '') {
                    curtida.classList.add(`${data.status}`)
                }
            }));
}
$('.btn-curtir-home').click((e) => {
    e.preventDefault();

    curtirPostHome(e);
})


$('.contador-curtidas').click((e) => {
    e.preventDefault()

    const { id } = e.target.parentNode.parentNode.parentNode.parentNode.parentNode

    fetch(`${BASE_URL_APP}/curtir/post/${id}`)
        .then(resposta => resposta.json()
            .then((data) => {
                let curtida = e.target;
                curtida.innerText = `${data.qtdCurtida}`
                curtida.classList.remove(`curtida`)
                if (data.status != '') {
                    curtida.classList.add(`${data.status}`)
                }
            }));
})

// Mostrar quem curtiu o post
$(function () {
    $('[data-toggle="popover"]').popover()
})

$('.btn-curtidas').click((e) => {
    e.preventDefault()

    let { id } = $('.post-completo')[0]
    id = id.split('-');
    let curtidas = [];

    fetch(`${BASE_URL_APP}/curtir/${id[2]}`)
        .then(resposta => resposta.json()
            .then((data) => {

                let curtidas = [];
                
                data.forEach(usuario => {
                    
                    if(usuario.foto_perfil.indexOf("https") >= 0){
                        let divCurtida =
                        $(`<div class ="d-flex align-items-center mb-2" p-2 >                        
                            <img class="pr-1"src="${usuario.foto_perfil}" width="40" height="40" alt="...">
                            ${usuario.nome}
                        </div> `); 
                        curtidas.push(divCurtida);                       
                    }else{
                        let divCurtida =
                        $(`<div class ="d-flex align-items-center mb-2" p-2 >                        
                            <img class="pr-1"src="/${usuario.foto_perfil}" width="40" height="40" alt="...">
                            ${usuario.nome}
                        </div> `); 
                        curtidas.push(divCurtida); 
                    }                    
                });

                $('.popover-body').append(curtidas)

            }));
})


