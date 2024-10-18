document.addEventListener('DOMContentLoaded', () => {
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedPairs = 0;
    let timerInterval;
    let startTime = null;
    let totalPairs;
    let gameFinished = false; // Variável para verificar se o jogo terminou

    function startTimer() {
        if (!startTime) {
            startTime = Date.now(); // Inicializa o cronômetro no início
            console.log("Cronômetro iniciado:", startTime);
        }
        timerInterval = setInterval(() => {
            let elapsed = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById("timer").textContent = new Date(elapsed * 1000).toISOString().substr(14, 5);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        console.log("Cronômetro parado");
    }

    function updateTempoFinal() {
        if (startTime) {
            const tempoFinal = Math.floor((Date.now() - startTime) / 1000);
            const tempoFinalField = document.getElementById('tempoFinal');

            if (tempoFinalField) {
                tempoFinalField.value = tempoFinal;
                console.log("Tempo Final salvo:", tempoFinal);
            } else {
                console.error("Campo tempoFinal não encontrado no HTML.");
            }
        } else {
            console.error("Erro: O cronômetro não foi iniciado corretamente.");
        }
    }

    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('flip')) return;

        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        setTimeout(() => {
            const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
            if (isMatch) {
                disableCards();
            } else {
                unflipCards();
            }
        }, 1000); // Simula o tempo de animação das cartas
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            setTimeout(endGame, 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function endGame() {
        stopTimer();
        updateTempoFinal();
        gameFinished = true;  // Marca o jogo como finalizado

        const allCards = document.querySelectorAll('.memory-card');
        allCards.forEach(card => card.removeEventListener('click', flipCard));

        alert("Parabéns, vá conferir sua posição no ranking!");
        document.querySelector('form').submit();  // Envia o formulário com o tempo final salvo
    }

    function generateCards(level) {
        const memoryGame = document.querySelector('.memory-game');
        memoryGame.innerHTML = '';

        memoryGame.classList.remove('nivel-facil', 'nivel-medio', 'nivel-dificil');

        let numCards;
        let cardTypes = [];
        let frontFaceImage;

        const cardTypesMap = {
            'Fácil': ['react', 'angular', 'ember'],
            'Médio': ['react', 'angular', 'ember', 'vue', 'svelte', 'lit'],
            'Difícil': ['react', 'angular', 'ember', 'vue', 'svelte', 'lit', 'next', 'nuxt', 'gatsby', 'backbone', 'jquery', 'meteor']
        };

        const imageMap = {
            'react': '/images/carta1.png',
            'angular': '/images/carta3.png',
            'ember': '/images/carta5.png',
            'vue': '/images/carta7.png',
            'svelte': '/images/carta9.png',
            'lit': '/images/carta11.png',
            'next': '/images/carta13.png',
            'nuxt': '/images/carta15.png',
            'gatsby': '/images/carta17.png',
            'backbone': '/images/carta19.png',
            'jquery': '/images/carta21.png',
            'meteor': '/images/carta23.png'
        };

        switch (level) {
            case 'Fácil':
                numCards = 6;
                memoryGame.classList.add('nivel-facil');
                cardTypes = cardTypesMap['Fácil'];
                frontFaceImage = '/images/fronte-face.png';
                break;
            case 'Médio':
                numCards = 12;
                memoryGame.classList.add('nivel-medio');
                cardTypes = cardTypesMap['Médio'];
                frontFaceImage = '/images/fronte-facee.png';
                break;
            case 'Difícil':
                numCards = 24;
                memoryGame.classList.add('nivel-dificil');
                cardTypes = cardTypesMap['Difícil'];
                frontFaceImage = '/images/fronte-faceee.png';
                break;
            default:
                throw new Error('Nível de dificuldade desconhecido');
        }

        let cards = [];
        const availableTypes = cardTypes.slice(0, Math.ceil(numCards / 2));

        availableTypes.forEach(type => {
            cards.push(type, type); // Adiciona dois pares de cada tipo
        });

        cards = cards.slice(0, numCards);

        // Embaralha o array de cartas
        cards = shuffleArray(cards);

        // Adicionar as cartas ao DOM
        cards.forEach(type => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.framework = type;
            card.innerHTML = `
                <img class="front-face" src="${frontFaceImage}"  alt="Face da Carta">
                <img class="back-face" src="${imageMap[type]}" alt="${type}">
            `;
            memoryGame.appendChild(card);
        });

        const allCards = document.querySelectorAll('.memory-card');
        allCards.forEach(card => card.addEventListener('click', flipCard));

        totalPairs = numCards / 2;

        startTimer(); // Inicia o cronômetro quando as cartas são geradas
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
        }
        return array;
    }

    // Verifica se o jogador terminou o jogo antes de enviar o formulário
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        if (!gameFinished) {
            event.preventDefault();  // Impede o envio do formulário
            alert("Termine o jogo antes de salvar o resultado.");
        }
    });

    const difficulty = document.querySelector('input[name="nivel"]').value;
    if (difficulty) {
        generateCards(difficulty);
    } else {
        console.error('Nível de dificuldade não encontrado.');
    }
});
