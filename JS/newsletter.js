// ── Popup de erro ─────────────────────────────────────────────
var popupErro = document.createElement("div");
popupErro.id = "popup-erro";
popupErro.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span id="popup-erro-texto"></span>';
document.body.appendChild(popupErro);

function mostrarPopup(campo, mensagem)
{
    var rect = campo.getBoundingClientRect();
    var texto = document.getElementById("popup-erro-texto");

    texto.textContent = mensagem;
    popupErro.style.display = "flex";

    // Posiciona por cima do campo
    popupErro.style.top  = (window.scrollY + rect.top - popupErro.offsetHeight - 10) + "px";
    popupErro.style.left = rect.left + "px";
    popupErro.style.width = rect.width + "px";
}

function esconderPopup()
{
    popupErro.style.display = "none";
}


// ── Controlo do span do consentimento ─────────────────────────
var consentimentoJaValidado = false;

function validarConsentimento()
{
    let consentimento = document.getElementById("consentimento").checked;

    if (!consentimento)
    {
        document.getElementById("valid-consentimento").innerHTML = "Deve concordar com os termos para subscrever";
        return false;
    }
    else
    {
        document.getElementById("valid-consentimento").innerHTML = "";
        return true;
    }
}


// ── Validações dos campos ─────────────────────────────────────
function validarNome()
{
    let campo = document.getElementById("nome");
    let nome = campo.value.trim();
    let palavrasNome = nome.split(/\s+/);
    let regexNome = /^[A-Za-zÀ-ÿ]+$/;

    if (nome === "")
    {
        mostrarPopup(campo, "Campo do Nome vazio");
        return false;
    }
    else if (palavrasNome.length !== 1 || palavrasNome[0] === "")
    {
        mostrarPopup(campo, "Insira apenas um nome sem espaços");
        return false;
    }
    else if (!regexNome.test(nome))
    {
        mostrarPopup(campo, "O nome deve conter apenas letras");
        return false;
    }
    else
    {
        esconderPopup();
        return true;
    }
}

function validarApelido()
{
    let campo = document.getElementById("apelido");
    let apelido = campo.value.trim();
    let palavrasApelido = apelido.split(/\s+/);
    let regexApelido = /^[A-Za-zÀ-ÿ]+$/;

    if (apelido === "")
    {
        mostrarPopup(campo, "Campo do Apelido vazio");
        return false;
    }
    else if (palavrasApelido.length !== 1 || palavrasApelido[0] === "")
    {
        mostrarPopup(campo, "Insira apenas um apelido sem espaços");
        return false;
    }
    else if (!regexApelido.test(apelido))
    {
        mostrarPopup(campo, "O apelido deve conter apenas letras");
        return false;
    }
    else
    {
        esconderPopup();
        return true;
    }
}

function validarEmail()
{
    let campo = document.getElementById("email");
    let email = campo.value.trim();
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "")
    {
        mostrarPopup(campo, "Campo do Email vazio");
        return false;
    }
    else if (!regexEmail.test(email))
    {
        mostrarPopup(campo, "Insira um email válido (ex.: nome@email.com)");
        return false;
    }
    else
    {
        esconderPopup();
        return true;
    }
}


// ── Botão Subscrever ──────────────────────────────────────────
function leitura()
{
    // Marca que o consentimento já foi validado uma vez
    consentimentoJaValidado = true;

    let nomeOk          = validarNome();
    let apelidoOk       = validarApelido();
    let emailOk         = validarEmail();
    let consentimentoOk = validarConsentimento();

    if (nomeOk && apelidoOk && emailOk && consentimentoOk)
    {
        esconderPopup();
        alert("Subscrição realizada com sucesso!");
    }
}


// ── Eventos ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function ()
{
    // Popup nos campos de texto enquanto digita
    document.getElementById("nome").addEventListener("input", validarNome);
    document.getElementById("apelido").addEventListener("input", validarApelido);
    document.getElementById("email").addEventListener("input", validarEmail);

    // Span do consentimento — só reage após o utilizador ter clicado em Subscrever
    document.getElementById("consentimento").addEventListener("change", function ()
    {
        if (consentimentoJaValidado)
        {
            validarConsentimento();
        }
    });

    // Esconde o popup ao clicar fora dos campos de texto
    document.addEventListener("click", function (e)
    {
        var campos = ["nome", "apelido", "email"];
        var dentroDeUmCampo = campos.some(function (id)
        {
            return document.getElementById(id) === e.target;
        });

        if (!dentroDeUmCampo)
        {
            esconderPopup();
        }
    });
});