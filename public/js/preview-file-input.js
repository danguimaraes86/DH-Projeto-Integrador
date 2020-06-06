$(function () {
    $('.selecao-foto').change(function (e) {
        const file = $(this)[0].files[0]

        let extensaoUpload = file.name.substring( (file.name.lastIndexOf('.')) ).toLowerCase();
        const extensaoCheck = [".jpeg", ".png", ".tiff", ".svg", ".jpg", ".jfif", ".mp4", ".mkv", ".avi", ".mov", ".m4v"];
        if (!extensaoCheck.includes(extensaoUpload)) {
            alert('ANS')
        }

        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            $('.midias .img-thumbnail').attr('src', fileReader.result)
            $('#foto-label').attr('src', fileReader.result)

        }
        fileReader.readAsDataURL(file)
    })
})