$(function(){
    $('#selecao-foto').change(function (){
        const file = $(this)[0].files[0]  
        const fileReader = new FileReader() 
        fileReader.onloadend = function(){
            $('#foto-label').attr('src', fileReader.result)
        } 
        fileReader.readAsDataURL(file)       
    })
    
    
})