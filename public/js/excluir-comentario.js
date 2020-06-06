const BASE_URL = 'http://localhost:3000/'

$('.btn-excluir').click((e) => {
    var id = e.target.parentNode.parentNode.parentNode.id.split('-')

    fetch(`${BASE_URL}comentario/excluir/${id[1]}`)
        .then(resposta => resposta.json()
            .then(() => {
                e.target.parentNode.parentNode.parentNode.remove()
            }));

})
