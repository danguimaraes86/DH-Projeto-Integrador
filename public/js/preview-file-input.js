$(function(){
    $('.selecao-foto').change(function (e){
        const file = $(this)[0].files[0]  
        const fileReader = new FileReader() 
        fileReader.onloadend = function(e){
            $('.midias .img-thumbnail').attr('src', fileReader.result)
        } 
        fileReader.readAsDataURL(file)       
    })
})

$(function(){
    $('.selecao-foto').change(function (e){
        const file = $(this)[0].files[0]  
        const fileReader = new FileReader() 
        fileReader.onloadend = function(e){
            $('#foto-label').attr('src', fileReader.result)
        } 
        fileReader.readAsDataURL(file)       
    })
})