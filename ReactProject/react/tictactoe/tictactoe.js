function TicTacToe() {
    const gridSize = 6;
    const winCondition = 4;
    const [board, setBoard] = React.useState(Array(gridSize * gridSize).fill(null));
    const [isXNext, setIsXNext] = React.useState(true);

    function handleClick(index) {
        if (board[index] || calculateWinner(board)) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    }

    function calculateWinner(squares) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                let index = row * gridSize + col;

                if (squares[index]) {
                    if (checkDirection(squares, index, 1, 0) ||
                        checkDirection(squares, index, 0, 1) ||
                        checkDirection(squares, index, 1, 1) ||
                        checkDirection(squares, index, 1, -1)) {
                        return squares[index];
                    }
                }
            }
        }
        return null;
    }

    function checkDirection(squares, index, dx, dy) {
        let symbol = squares[index];
        let count = 1;

        for (let step = 1; step < winCondition; step++) {
            let newRow = Math.floor(index / gridSize) + step * dy;
            let newCol = (index % gridSize) + step * dx;

            if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) break;

            let newIndex = newRow * gridSize + newCol;

            if (squares[newIndex] === symbol) {
                count++;
            } else {
                break;
            }
        }
        return count >= winCondition;
    }

    function resetGame() {
        setBoard(Array(gridSize * gridSize).fill(null));
        setIsXNext(true);
    }

    return (
        <div>
            <h2>Tic-Tac-Toe (6×6)</h2>
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridSize}, 60px)`,
                gap: "5px"
            }}>
                {board.map((cell, index) => (
                    <button key={index} onClick={() => handleClick(index)}
                        style={{
                            width: 60, height: 60, fontSize: "24px",
                            textAlign: "center", cursor: "pointer"
                        }}>
                        {cell}
                    </button>
                ))}
            </div>
            <p>{calculateWinner(board) ? `Nyertes: ${calculateWinner(board)}` : `Következő: ${isXNext ? "X" : "O"}`}</p>
            <button onClick={resetGame}>Újraindítás</button>
        </div>
    );
}
