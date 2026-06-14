function leitura()
{
   let nome = document.getElementById("nome").value.trim();
   let apelido = document.getElementById("apelido").value.trim();
   let email = document.getElementById("email").value.trim();
   let consentimento = document.getElementById("consentimento").checked;

   let palavrasNome = nome.split(/\s+/);
   let palavrasApelido = apelido.split(/\s+/);
   let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   let regexNome = /^[A-Za-zÀ-ÿ]+$/;
   let regexApelido = /^[A-Za-zÀ-ÿ]+$/;

   //_______________________NOME___________________________

    if(nome === "")
    {
        document.getElementById("valid-nome").innerHTML = "Campo do Nome vazio";
    }
    else if(palavrasNome.length !== 1 || palavrasNome[0] === "")
    {
        document.getElementById("valid-nome").innerHTML = "Insira apenas um nome sem espaços";
    }
    else if(!regexNome.test(nome))
    {
        document.getElementById("valid-nome").innerHTML = "O nome deve conter apenas letras";
    }
    else
    {
        document.getElementById("valid-nome").innerHTML = "";
    }

    //_______________________APELIDO_________________________

    if(apelido === "")
    {
        document.getElementById("valid-apelido").innerHTML = "Campo do Apelido vazio";
    }
    else if(palavrasApelido.length !== 1 || palavrasApelido[0] === "")
    {
        document.getElementById("valid-apelido").innerHTML = "Insira apenas um apelido sem espaços";
    }
    else if(!regexApelido.test(apelido))
    {
        document.getElementById("valid-apelido").innerHTML = "O apelido deve conter apenas letras";
    }
    else
    {
        document.getElementById("valid-apelido").innerHTML = "";
    }

    //_______________________EMAIL___________________________
    if(email === "")
    {
        document.getElementById("valid-email").innerHTML = "Campo do Email vazio";
    }
    else if(!regexEmail.test(email))
    {
        document.getElementById("valid-email").innerHTML = "Insira um email válido (ex.: nome@email.com)"
    }
    else
    {
        document.getElementById("valid-email").innerHTML = "";
    }

    //_______________________CONSENTIMENTO___________________________
    if (!consentimento) 
    {
        document.getElementById("valid-consentimento").innerHTML = "Deve concordar com os termos para subscrever";
    } 
    else 
    {
    document.getElementById("valid-consentimento").innerHTML = "";
    }
}