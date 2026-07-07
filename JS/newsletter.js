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
    let campo = document.getElementById("consentimento");

    // Se esta página não tiver campo de consentimento, considera válido
    if (!campo) return true;

    let consentimento = campo.checked;
    let spanErro = document.getElementById("valid-consentimento");

    if (!consentimento)
    {
        if (spanErro) spanErro.innerHTML = "Deve concordar com os termos para subscrever";
        return false;
    }
    else
    {
        if (spanErro) spanErro.innerHTML = "";
        return true;
    }
}


// ── Validação do reCAPTCHA ──────────────────────────────────────
function validarRecaptcha()
{
    let widget = document.querySelector(".g-recaptcha");

    // Se esta página não tiver reCAPTCHA, considera válido
    if (!widget) return true;

    let spanErro = document.getElementById("valid-recaptcha");
    let resposta = typeof grecaptcha !== "undefined" ? grecaptcha.getResponse() : "";

    if (!resposta || resposta.length === 0)
    {
        if (spanErro) spanErro.innerHTML = "Confirme que não é um robô";
        return false;
    }
    else
    {
        if (spanErro) spanErro.innerHTML = "";
        return true;
    }
}


// ── Validações dos campos ─────────────────────────────────────
function validarNome()
{
    let campo = document.getElementById("nome");

    // Se esta página não tiver campo de nome, considera válido
    if (!campo) return true;

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

    // Se esta página não tiver campo de apelido, considera válido
    if (!campo) return true;

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

    // Se por algum motivo não existir campo de email, considera válido
    if (!campo) return true;

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


// ── Limpeza do formulário após sucesso ─────────────────────────
function limparFormulario()
{
    var campoNome = document.getElementById("nome");
    var campoApelido = document.getElementById("apelido");
    var campoEmail = document.getElementById("email");
    var campoTelefone = document.getElementById("telefone");
    var campoConsentimento = document.getElementById("consentimento");
    var checkboxesInteresse = document.querySelectorAll('input[name="interesse"]');

    if (campoNome) campoNome.value = "";
    if (campoApelido) campoApelido.value = "";
    if (campoEmail) campoEmail.value = "";
    if (campoTelefone) campoTelefone.value = "";
    if (campoConsentimento) campoConsentimento.checked = false;

    checkboxesInteresse.forEach(function (checkbox)
    {
        checkbox.checked = false;
    });

    // Reinicia o reCAPTCHA para poder ser usado novamente
    if (typeof grecaptcha !== "undefined" && document.querySelector(".g-recaptcha"))
    {
        grecaptcha.reset();
    }

    consentimentoJaValidado = false;
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
    let recaptchaOk     = validarRecaptcha();

    if (nomeOk && apelidoOk && emailOk && consentimentoOk && recaptchaOk)
    {
        esconderPopup();
        alert("Subscrição realizada com sucesso!");
        limparFormulario();
    }

    return (nomeOk && apelidoOk && emailOk && consentimentoOk && recaptchaOk);
}


// ── Eventos ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function ()
{
    var campoNome = document.getElementById("nome");
    var campoApelido = document.getElementById("apelido");
    var campoEmail = document.getElementById("email");
    var campoConsentimento = document.getElementById("consentimento");

    // Popup nos campos de texto enquanto digita (só se existirem nesta página)
    if (campoNome) campoNome.addEventListener("input", validarNome);
    if (campoApelido) campoApelido.addEventListener("input", validarApelido);
    if (campoEmail) campoEmail.addEventListener("input", validarEmail);

    // Span do consentimento — só reage após o utilizador ter clicado em Subscrever
    if (campoConsentimento)
    {
        campoConsentimento.addEventListener("change", function ()
        {
            if (consentimentoJaValidado)
            {
                validarConsentimento();
            }
        });
    }

    // Liga o envio de QUALQUER formulário de newsletter presente na página
    // (funciona tanto no mini-formulário do index como no formulário completo da página newsletter.html)
    var formsNewsletter = document.querySelectorAll(".newsletter-form, .newsletter-pagina-form, #form-newsletter");
    formsNewsletter.forEach(function (form)
    {
        form.addEventListener("submit", function (e)
        {
            e.preventDefault();
            leitura();
        });
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