/* =====================================================
   Essências & Aromas — Validação do Formulário de Contactos
   Ficheiro: JS/contactos.js
===================================================== */

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

function validarAssunto()
{
    let campo = document.getElementById("assunto");
    let assunto = campo.value.trim();

    if (assunto === "")
    {
        mostrarPopup(campo, "Campo do Assunto vazio");
        return false;
    }
    else
    {
        esconderPopup();
        return true;
    }
}

function validarMensagem()
{
    let campo = document.getElementById("mensagem");
    let mensagem = campo.value.trim();

    if (mensagem === "")
    {
        mostrarPopup(campo, "Campo da Mensagem vazio");
        return false;
    }
    else if (mensagem.length < 10)
    {
        mostrarPopup(campo, "A mensagem deve ter pelo menos 10 caracteres");
        return false;
    }
    else
    {
        esconderPopup();
        return true;
    }
}


// ── Botão Enviar ──────────────────────────────────────────────
function enviarFormulario()
{
    let nomeOk     = validarNome();
    let apelidoOk  = validarApelido();
    let emailOk    = validarEmail();
    let assuntoOk  = validarAssunto();
    let mensagemOk = validarMensagem();

    if (nomeOk && apelidoOk && emailOk && assuntoOk && mensagemOk)
    {
        esconderPopup();

        var form = document.querySelector(".form-contacto");
        var sucesso = document.createElement("div");
        sucesso.className = "msg-sucesso-contacto";
        sucesso.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>' +
            '<strong>Mensagem enviada!</strong>' +
            '<p>Obrigado pelo contacto. Responderemos em até 24 horas.</p>';

        form.parentNode.insertBefore(sucesso, form);
        form.style.display = "none";

        sucesso.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}


// ── Eventos ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function ()
{
    // Popup nos campos enquanto digita
    document.getElementById("nome").addEventListener("input", validarNome);
    document.getElementById("apelido").addEventListener("input", validarApelido);
    document.getElementById("email").addEventListener("input", validarEmail);
    document.getElementById("assunto").addEventListener("input", validarAssunto);
    document.getElementById("mensagem").addEventListener("input", validarMensagem);

    // Submissão do formulário
    var form = document.querySelector(".form-contacto");
    form.addEventListener("submit", function (e)
    {
        e.preventDefault();
        enviarFormulario();
    });

    // Esconde o popup ao clicar fora dos campos
    document.addEventListener("click", function (e)
    {
        var ids = ["nome", "apelido", "email", "assunto", "mensagem"];
        var dentroDeUmCampo = ids.some(function (id)
        {
            return document.getElementById(id) === e.target;
        });

        if (!dentroDeUmCampo)
        {
            esconderPopup();
        }
    });
});