'use strict';

// Selecionando elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Condições Iniciais
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Função de Trocar de Jogador
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Funções do botão de Jogar o Dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gerando um jogada de dado aleatório
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Mostrando o dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Checar se o dado obtido foi 1
    if (dice !== 1) {
      // Adicionar pontuação atual à pontuação total
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Trocar de jogador
      switchPlayer();
    }
  }
});

// Função do botão de Segurar a Pontuação
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Adicionando a pontuação atual à pontuação total
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Checar se a pontuação é >= 50 (VENCEDOR DO JOGO)
    if (scores[activePlayer] >= 50) {
      // Finalizar o jogo
      playing = false;
      document.querySelector(`.dice`).classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`current--${activePlayer}`).textContent = '🏆';
      if (activePlayer === 0) {
        document.getElementById(`current--1`).textContent = '☠️';
      } else {
        document.getElementById(`current--0`).textContent = '☠️';
      }
    } else {
      // Trocar de jogador
      switchPlayer();
    }
  }
});

// Função do botão de Novo Jogo
btnNew.addEventListener('click', function () {
  // 1. Resetar as condições iniciais
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
