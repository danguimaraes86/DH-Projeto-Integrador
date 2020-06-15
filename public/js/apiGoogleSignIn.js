const { noExtendLeft } = require("sequelize/types/lib/operators");

async function onSignIn(googleUser) {

    const id_token = googleUser.getAuthResponse().id_token;    

    const token = { token: id_token };
    
    const dados = JSON.stringify(token);

    const resposta = await fetch('http://localhost:3000/login/api/google', {  
        headers:{
        'Content-Type': 'application/json'
        },      
        method: "POST",
        body: dados
    });   
    
    window.location.href="http://localhost:3000/home";
}


