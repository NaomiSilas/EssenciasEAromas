document.addEventListener('DOMContentLoaded', function () {

    // ─────────────────────────────────────────────
    // CARROSSEL GENÉRICO (PORTFÓLIO / PRODUTOS)
    // ─────────────────────────────────────────────
    function iniciarCarrossel(wrapper, opcoes) {
        const faixa     = wrapper.querySelector('.carrossel-faixa');
        const btnPrev   = wrapper.querySelector('.carrossel-btn.prev');
        const btnNext   = wrapper.querySelector('.carrossel-btn.next');
        const dotsWrap  = wrapper.querySelector('.carrossel-dots');
        const itens     = Array.from(faixa.children);
        const visiveis  = opcoes.visiveis || 4;
        const gap       = opcoes.gap || 20;

        let atual = 0;

        function larguraItem() {
            return (wrapper.offsetWidth - gap * (visiveis - 1)) / visiveis;
        }

        function aplicarLarguras() {
            const larg = larguraItem();
            itens.forEach(item => {
                item.style.width = larg + 'px';
                item.style.marginRight = gap + 'px';
            });
        }

        function totalPosicoes() {
            return Math.max(0, itens.length - visiveis);
        }

        function mover(index) {
            atual = Math.max(0, Math.min(index, totalPosicoes()));
            const offset = atual * (larguraItem() + gap);
            faixa.style.transform = `translateX(-${offset}px)`;

            if (btnPrev) btnPrev.disabled = atual === 0;
            if (btnNext) btnNext.disabled = atual >= totalPosicoes();

            if (dotsWrap) {
                dotsWrap.querySelectorAll('.carrossel-dot').forEach((d, i) => {
                    d.classList.toggle('ativo', i === atual);
                });
            }
        }

        function criarDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = '';
            const total = totalPosicoes() + 1;

            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.className = 'carrossel-dot' + (i === 0 ? ' ativo' : '');
                dot.addEventListener('click', () => mover(i));
                dotsWrap.appendChild(dot);
            }
        }

        aplicarLarguras();
        criarDots();
        mover(0);

        if (btnPrev) btnPrev.addEventListener('click', () => mover(atual - 1));
        if (btnNext) btnNext.addEventListener('click', () => mover(atual + 1));

        window.addEventListener('resize', () => {
            aplicarLarguras();
            mover(atual);
        });
    }


    // ─────────────────────────────────────────────
    // HERO CARROSSEL (CORRIGIDO)
    // ─────────────────────────────────────────────
    const hero = document.querySelector('.hero-carrossel');

    if (hero) {
        const slides = hero.querySelectorAll('.carrossel-slide');
        const btnPrev = hero.querySelector('.carrossel-prev');
        const btnNext = hero.querySelector('.carrossel-next');
        const dotsWrap = hero.querySelector('.carrossel-dots');

        let index = 0;

        function mostrarSlide(i) {
            slides.forEach(s => s.classList.remove('ativo'));

            index = (i + slides.length) % slides.length;

            slides[index].classList.add('ativo');

            // dots
            if (dotsWrap) {
                dotsWrap.querySelectorAll('.carrossel-dot').forEach((d, j) => {
                    d.classList.toggle('ativo', j === index);
                });
            }
        }

        function criarDotsHero() {
            if (!dotsWrap) return;

            dotsWrap.innerHTML = '';

            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'carrossel-dot' + (i === 0 ? ' ativo' : '');
                dot.addEventListener('click', () => mostrarSlide(i));
                dotsWrap.appendChild(dot);
            });
        }

        criarDotsHero();
        mostrarSlide(0);

        if (btnPrev) btnPrev.addEventListener('click', () => mostrarSlide(index - 1));
        if (btnNext) btnNext.addEventListener('click', () => mostrarSlide(index + 1));

        setInterval(() => {
            mostrarSlide(index + 1);
        }, 5000);
    }


    // ─────────────────────────────────────────────
    // CARROSSEL DE PRODUTOS / PORTFÓLIO
    // ─────────────────────────────────────────────
    document.querySelectorAll('.carrossel-bloco').forEach(bloco => {
        const visiveis = parseInt(bloco.dataset.visiveis) || 4;
        iniciarCarrossel(bloco, { visiveis, gap: 20 });
    });

});