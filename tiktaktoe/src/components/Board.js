import { Square } from './Square';

export function Board({ xIsNext, squares, onPlay }) {
    // Function that calculates who is the winner.
    function calculateWinner(squares){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    function handleClick(index){
        if (squares[index] || calculateWinner(squares)) {
            return;
        }

        // Copying the Array
        const nextSquares = squares.slice();
        
        // Makig impossible to overwrite a token.
        if(nextSquares[index]){
            return;
        }

        // Writing the proper toker whenver it should be.
        if(xIsNext){
            nextSquares[index] = "X";
        }else{
            nextSquares[index] = "O";
        }

        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if(!squares.includes(null)){
        status = "Tie!"
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

	return (
		<>
            <div className="status">
                {status}
            </div>
            <div className="board">
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
                </div>
			</div>
		</>
	);
}