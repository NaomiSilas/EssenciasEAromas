document.addEventListener('DOMContentLoaded', function () {

    const categoriaCards = document.querySelectorAll('.categoria-card[data-filtro]');
    const produtoCards   = document.querySelectorAll('.portfolio-card[data-categoria]');
    const tituloCabecalho = document.querySelector('.secao-wrapper .secao-cabecalho h2');
    const descCabecalho   = document.querySelector('.secao-wrapper .secao-cabecalho .secao-desc');

    const textos = {
        todos:     { titulo: 'Todas as Fragrâncias',   desc: 'A nossa coleção completa de fragrâncias exclusivas.' },
        feminino:  { titulo: 'Fragrâncias Femininas',  desc: 'Delicadas, florais e marcantes — escolhidas para ela.' },
        masculino: { titulo: 'Fragrâncias Masculinas', desc: 'Intensos, amadeirados e sofisticados — escolhidos para ele.' },
        tendencia: { titulo: 'Tendências',             desc: 'Para quem não segue rótulos.' }
    };

    function filtrar(categoria) {
        produtoCards.forEach(card => {
            if (categoria === 'todos' || card.dataset.categoria === categoria) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        if (tituloCabecalho) tituloCabecalho.textContent = textos[categoria].titulo;
        if (descCabecalho)   descCabecalho.textContent   = textos[categoria].desc;

        // Marca a categoria ativa
        categoriaCards.forEach(c => c.classList.remove('categoria-ativa'));
        const ativo = document.querySelector(`.categoria-card[data-filtro="${categoria}"]`);
        if (ativo) ativo.classList.add('categoria-ativa');

        // Scroll suave até à grelha de produtos
        const secao = document.querySelector('.secao-wrapper');
        if (secao) secao.scrollIntoView({ behavior: 'smooth' });
    }

    categoriaCards.forEach(card => {
        card.addEventListener('click', function () {
            const filtro = this.dataset.filtro;

            // Se já está ativa, clica de novo para mostrar todos
            if (this.classList.contains('categoria-ativa')) {
                filtrar('todos');
            } else {
                filtrar(filtro);
            }
        });
    });

});