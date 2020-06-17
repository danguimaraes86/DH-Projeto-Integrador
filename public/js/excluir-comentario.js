

$('.btn-excluir').click((e) => {
    var id = e.target.parentNode.parentNode.parentNode.id.split('-')

    fetch(`${BASE_URL_APP}/comentario/excluir/${id[1]}`)
        .then(resposta => resposta.json()
            .then(() => {
                e.target.parentNode.parentNode.parentNode.classList.add("fadeOut")

                setTimeout(function () {
                    e.target.parentNode.parentNode.parentNode.remove()
                }, 500);
            }));

})
