document.addEventListener('DOMContentLoaded', function () {
    let carrinhoGuardado;
    try {
        carrinhoGuardado = JSON.parse(localStorage.getItem('carrinho-perfumes')) || [];
        // Filtra itens inválidos sem preço
        carrinhoGuardado = carrinhoGuardado.filter(p => p && p.preco && p.nome);
    } catch(e) {
        carrinhoGuardado = [];
    }
    let carrinho = carrinhoGuardado;

    const contadorElemento = document.getElementById('contador-carrinho');
    const modal = document.getElementById('janela-carrinho');
    const btnAbrirCarrinho = document.getElementById('btn-carrinho-topo');
    const btnFecharCarrinho = document.getElementById('fechar-carrinho');
    const containerItens = document.getElementById('itens-do-carrinho');
    const elementoTotal = document.getElementById('preco-total');

    function atualizarContadorMenu() {
        if (contadorElemento) {
            contadorElemento.textContent = carrinho.length;
        }
    }

    function renderizarItensCarrinho() {
        if (!containerItens) return;
        containerItens.innerHTML = "";

        if (carrinho.length === 0) {
            containerItens.innerHTML = '<p style="color: #666; text-align: center;">O carrinho está vazio.</p>';
            if (elementoTotal) elementoTotal.textContent = "0,00 Kz";
            return;
        }

        let totalGeral = 0;

        carrinho.forEach((produto, index) => {
            const divItem = document.createElement('div');
            divItem.classList.add('item-carrinho-linha');

            divItem.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" class="item-carrinho-img">
                <div class="item-carrinho-detalhes">
                    <strong>${produto.nome}</strong>
                    <span class="item-carrinho-preco">${produto.preco}</span>
                </div>
                <button onclick="removerItem(${index})" class="btn-remover-item">❌</button>
            `;

            containerItens.appendChild(divItem);

            let precoNumerico = parseFloat(produto.preco.replace(/[^0-9]/g, '')) / 100;
            if (isNaN(precoNumerico)) precoNumerico = parseFloat(produto.preco.replace(/[^0-9]/g, ''));
            totalGeral += precoNumerico;
        });

        if (elementoTotal) {
            elementoTotal.textContent = totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + " Kz";
        }
    }

    document.querySelectorAll('.btn-add-carrinho').forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const card = evento.target.closest('.portfolio-card');

            if (!card) {
                console.error("Erro: Não encontrou '.portfolio-card' acima do botão.");
                return;
            }

            const tagNome   = card.querySelector('h3');
            const tagPreco  = card.querySelector('.preco');
            const tagImagem = card.querySelector('img');

            if (!tagNome || !tagPreco) {
                alert("Erro no HTML: não achou h3 ou .preco dentro do card.");
                return;
            }

            const produtoObj = {
                nome:   tagNome.textContent.trim(),
                preco:  tagPreco.textContent.trim(),
                imagem: tagImagem ? tagImagem.src : ''
            };

            carrinho.push(produtoObj);
            localStorage.setItem('carrinho-perfumes', JSON.stringify(carrinho));
            atualizarContadorMenu();
            alert(`${produtoObj.nome} adicionado ao carrinho!`);
        });
    });

    window.removerItem = function(index) {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho-perfumes', JSON.stringify(carrinho));
        atualizarContadorMenu();
        renderizarItensCarrinho();
    };

    if (btnAbrirCarrinho && modal) {
        btnAbrirCarrinho.addEventListener('click', () => {
            renderizarItensCarrinho();
            modal.style.display = 'block';
        });
    }

    if (btnFecharCarrinho && modal) {
        btnFecharCarrinho.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (evento) => {
        if (modal && evento.target === modal) {
            modal.style.display = 'none';
        }
    });

    atualizarContadorMenu();

}); // fim do DOMContentLoaded

