document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA O CONTROLE DA MÚSICA ---
    const audio = document.getElementById('musica-de-fundo');
    const playPauseBtn = document.getElementById('play-pause-btn');

    if (audio && playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.textContent = '⏸️ Pausar';
            } else {
                audio.pause();
                playPauseBtn.textContent = '🎵 Tocar Música';
            }
        });
    }

    // --- LÓGICA PARA O BOTÃO "NÃO" FUGIR ---
    const noBtn = document.querySelector('.btn-no');
    if (noBtn) {
        noBtn.addEventListener('mouseover', () => {
            const card = document.querySelector('.card').getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();
            const newTop = Math.random() * (card.height - btnRect.height);
            const newLeft = Math.random() * (card.width - btnRect.width);
            noBtn.style.top = `${newTop}px`;
            noBtn.style.left = `${newLeft}px`;
        });
    }

    // --- LÓGICA PARA A TRANSIÇÃO DE PÁGINA SEM RECARREGAR ---
    const simBtn = document.getElementById('btn-sim');
    const containerPrincipal = document.querySelector('.container');

    // Função que busca o conteúdo de fotos.html e faz a transição
    async function transicaoParaFotos() {
        // 1. Some com o conteúdo atual (o pedido)
        containerPrincipal.style.transition = 'opacity 0.5s ease-out';
        containerPrincipal.style.opacity = '0';

        // Espera a animação de sumiço terminar
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            // 2. Busca o conteúdo da página de fotos em segundo plano
            const response = await fetch('fotos.html');
            const text = await response.text();

            // 3. Usa um "parser" para ler o HTML buscado
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            // 4. Pega apenas o conteúdo do cartão da galeria
            const novoConteudo = doc.querySelector('.gallery-card');

            // 5. Substitui o conteúdo antigo pelo novo e exibe
            if (novoConteudo) {
                containerPrincipal.innerHTML = novoConteudo.outerHTML;
                containerPrincipal.style.opacity = '1';
            }
        } catch (error) {
            console.error('Erro ao carregar a página de fotos:', error);
            // Caso dê erro, podemos redirecionar para a página como fallback
            window.location.href = 'fotos.html';
        }
    }

    if (simBtn) {
        simBtn.addEventListener('click', (event) => {
            // Previne qualquer comportamento padrão do botão
            event.preventDefault();
            // Inicia a nossa função de transição mágica
            transicaoParaFotos();
        });
    }
});