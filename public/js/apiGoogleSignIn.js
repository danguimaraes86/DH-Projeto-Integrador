async function onSignIn(googleUser) {
    
    const id_token = googleUser.getAuthResponse().id_token;

    const token = { token: id_token };

    const dados = JSON.stringify(token);

    const resposta = await fetch(`${BASE_URL_APP}/login/api/google`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: dados
    });    
    
    googleUser.disconnect();    
    
    window.location.href = `${BASE_URL_APP}/home`;    
}




