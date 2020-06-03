
let btnExcluir = document.querySelectorAll('.btn-exlcuir')

btnExcluir.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        btn.parentNode.parentNode.parentNode.remove()
    })
})