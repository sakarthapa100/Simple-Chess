const board = document.getElementById('chessboard');
const newGameBtn = document.getElementById('newGame');
let game = new Chess();
let selectedSquare = null;

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
            square.dataset.square = String.fromCharCode(97 + j) + (8 - i);
            square.addEventListener('click', handleSquareClick);
            board.appendChild(square);

            // Add a child div for showing possible moves
            const moveIndicator = document.createElement('div');
            moveIndicator.classList.add('move-indicator');
            square.appendChild(moveIndicator);
        }
    }
    updateBoard();
}

function updateBoard() {
    const squares = board.getElementsByClassName('square');
    for (let square of squares) {
        const piece = game.get(square.dataset.square);
        if (piece) {
            const symbol = getPieceSymbol(piece);
            square.textContent = symbol;
            square.style.color = piece.color === 'w' ? 'white' : 'black';
        } else {
            square.textContent = '';
            square.style.color = '';
        }
    }
}

function getPieceSymbol(piece) {
    const symbols = {
        'p': '♙', 'r': '♖', 'n': '♘', 'b': '♗', 'q': '♕', 'k': '♔',
        'P': '♟', 'R': '♜', 'N': '♞', 'B': '♝', 'Q': '♛', 'K': '♚'
    };
    return symbols[piece.type];
}

function handleSquareClick(event) {
    const square = event.target.dataset.square;
    if (selectedSquare) {
        const move = game.move({
            from: selectedSquare,
            to: square,
            promotion: 'q'
        });
        if (move) {
            updateBoard();
            setTimeout(makeRandomMove, 250);
        }
        selectedSquare = null;
    } else {
        const piece = game.get(square);
        if (piece && piece.color === 'w') {
            selectedSquare = square;
        }
    }
}

function makeRandomMove() {
    const moves = game.moves();
    if (moves.length > 0) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        updateBoard();
    }
}

function newGame() {
    game.reset();
    createBoard();
}

newGameBtn.addEventListener('click', newGame);
createBoard();
