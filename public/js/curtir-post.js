$('.btn-curtir').click((e) => {
    e.preventDefault()

    let { id } = $('.post-completo')[0]
    id = id.split('-');

    fetch(`${BASE_URL}curtir/post/${id[2]}`)
        .then(resposta => resposta.json()
            .then((data) => {
                $('#contador-curtidas').text(`${data.qtdCurtida}`)
                $('#contador-curtidas').removeClass(`curtida`)
                $('#contador-curtidas').addClass(`${data.status}`)
            }));
})

$('.btn-curtir-home').click((e) => {
    e.preventDefault()

    const BASE_URL = 'http://localhost:3000/'
    const { id } = e.target.parentNode.parentNode.parentNode.parentNode

    fetch(`${BASE_URL}curtir/post/${id}`)
        .then(resposta => resposta.json()
            .then((data) => {
                let curtida = e.target.childNodes[1]
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

    fetch(`${BASE_URL}curtir/show/post/${id[2]}`)
        .then(resposta => resposta.json()
            .then((data) => {
                let curtidas = []
                data.forEach(usuario => {
                    let element = $(`
                <div class ="d-flex align-items-center mb-2" p-2 >
                    <img class="pr-1"src="/${usuario.foto_perfil}" width="50" height="50" alt="...">
                    ${usuario.nome}
                </div>
                `
                    );
                    curtidas.push(element)
                });

                $('.popover-body').append(curtidas)

            }));
})


