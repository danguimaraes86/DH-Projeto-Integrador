$(function () {
    $('.selecao-foto').change(function (e) {
    const file = $(this)[0].files[0]

    let extensaoUpload = file.name.substring((file.name.lastIndexOf('.'))).toLowerCase();
    const extensaoCheck = [".jpeg", ".png", ".tiff", ".svg", ".jpg", ".jfif", ".mp4", ".mkv", ".avi", ".mov", ".m4v"];
    if (!extensaoCheck.includes(extensaoUpload)) {
       $('#alert-ans').append(
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Alerta!</strong> Tipo de arquivo não suportado. Favor selecionar outro.
            <button type="button" class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`
       )
    } else {
        $('#alert-ans').text('')
    }

    const fileReader = new FileReader()
    fileReader.onloadend = function (e) {
        $('.midias .img-thumbnail').attr('src', fileReader.result)
        $('#foto-label').attr('src', fileReader.result)
    }
    fileReader.readAsDataURL(file)
})
})