//Seleção de Elementos do HTML

// Seleciona as principais telas do jogo, o inicio, meio e fim
let inicio = document.querySelector(`.inicio`)
let meio = document.querySelector(`main`)
let fim = document.querySelector(`.fim`)

// Seleciona as classe player para saber qual "icon" começa
let selecionaX = document.querySelector(`.opcao .playerX`)
let selecionaO = document.querySelector(`.opcao .playerO`)

// Seleciona a vez dos jogadores
let vezButtons = document.querySelectorAll(`.vez-button`) // Seleciona TODOS os "botões" de vez

// Seleciona as celulas do tabuleiro
let cell = document.querySelectorAll(`.cell`) //seleciona todas as células

// Seleciona o texto de resultado e o botão de replay
let textResult = document.querySelector(`.textoresult`)
let replay = document.querySelector(`.recomecar`)

//Cria as Variaveis para colocar o icon do jogador no tabuleiro

let playerXIcon = 'X'
let playerOIcon = 'O'
let playerSign = 'X'

//Muda Tela para o tabuleiro
window.onload = () => {
  //Vai definir quem começa de acordo com o "icon" selecionado
  selecionaO.onclick = () => {
    inicio.classList.add('hide')
    meio.classList.remove('hide')
    definePlayer(vezButtons[1]) // Define o jogador inicial como "O"
  }
  selecionaX.onclick = () => {
    inicio.classList.add('hide')
    meio.classList.remove('hide')
    definePlayer(vezButtons[0]) // Define o jogador inicial como "X"
  }
  atualizarTabuleiro()
}

//Atualizar a interface de vez do jogador
function definePlayer(clickedButton) {
  //Se o botao clicado for = O, toda if, se não, roda else
  if (clickedButton === vezButtons[1]) {
    playerSign = 'O'
    vezButtons[1].classList.add('active')
    vezButtons[0].classList.remove('active')
  } else {
    playerSign = 'X'
    vezButtons[0].classList.add('active')
    vezButtons[1].classList.remove('active')
  }
}

//Atualiza o Tabuleiro
function atualizarTabuleiro() {
  // Adiciona eventos de clique às células do tabuleiro
  cell.forEach((c) => {
    //Define que a cada vez que uma celula é clicada roda a seguinte função
    c.onclick = () => {
      if (c.textContent === '') {
        // Verifica se a célula está vazia
        c.textContent = playerSign // Define o texto da célula com o sinal do jogador atual
        definePlayer(playerSign === 'X' ? vezButtons[1] : vezButtons[0]) // Alterna a vez do jogador
        verificaVencedor() // Verifica se há um vencedor ou empate
      }
    }
  })
}

//Vai verificar se tem um vencedor
function verificaVencedor() {
  //Define em que caso as combinações são vencedoras
  const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colunas
    [0, 4, 8],
    [2, 4, 6], // Diagonais
  ]

  //Vai passar por cada combinação e verificar se ela é uma das vencedoras
  for (const combinacao of combinacoesVencedoras) {
    //Vai definir oq é uma combinação
    const [a, b, c] = combinacao

    //Vai verficar se todos os componentes da combinação são iguais
    if (
      cell[a].textContent &&
      cell[a].textContent === cell[b].textContent &&
      cell[a].textContent === cell[c].textContent
    ) {
      //Há um vencedor
      textResult.textContent = `Jogador ${cell[a].textContent} venceu!`
      fim.classList.remove('hide')
      meio.classList.add('hide')
      return // Encerra a função
    }
  }

  // Verifica se há empate
  if ([...cell].every((c) => c.textContent !== '')) {
    // Verifica se tem espaços vazios
    textResult.textContent = 'Empate!'
    //Mostra o fim
    fim.classList.remove('hide')
    meio.classList.add('hide')
  }
}

// Da F5 na pag
replay.onclick = () => {
  window.location.reload()
}
