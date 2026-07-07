function abrirCheckout() {
  document.getElementById("modal-checkout").classList.remove("oculto");

  const modalCarrinho = document.getElementById("janela-carrinho");
  if (modalCarrinho) {
    modalCarrinho.style.display = "none";
  }
}

function fecharCheckout() {
  document.getElementById("modal-checkout").classList.add("oculto");
}

document.getElementById("btn-finalizar-compra")
  .addEventListener("click", abrirCheckout);

// Alternar entre Cartão e Multicaixa Express
const tabs = document.querySelectorAll(".tab-pagamento");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("ativo"));
    tab.classList.add("ativo");

    document.getElementById("form-cartao").classList.toggle(
      "oculto", tab.dataset.metodo !== "cartao"
    );
    document.getElementById("form-multicaixa").classList.toggle(
      "oculto", tab.dataset.metodo !== "multicaixa"
    );
  });
});

// Formatar número do cartão automaticamente (0000 0000 0000 0000)
document.getElementById("numero-cartao").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "").slice(0, 16);
  e.target.value = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
});

// Formatar validade automaticamente (MM/AA)
document.getElementById("validade-cartao").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "").slice(0, 4);
  if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2);
  e.target.value = valor;
});

// Simulação de envio
document.getElementById("form-cartao").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Pagamento simulado com sucesso! (demonstração)");
  fecharCheckout();
});

document.getElementById("form-multicaixa").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Pedido de confirmação enviado ao telemóvel! (demonstração)");
  fecharCheckout();
});