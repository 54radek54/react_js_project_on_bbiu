import React, {useEffect, useState} from 'react';
import "./TicTacToe.css"

function TicTacToe() {
    const [gameBoard, setGameBoard] = useState(["", "", "", "", "", "", "", "", ""])
    const [marker, setMarker] = useState("X")
    const [winner, setWinner] = useState("")

    const winningConditions = [
        //horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        //vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //across
        [0, 4, 8], [2, 4, 6]
    ]

    function checkForWinner() {
        for (let condition in winningConditions) {
            const [first, second, third] = winningConditions[condition]
            if (gameBoard[first] === gameBoard[second] && gameBoard[second] === gameBoard[third]) {
                return gameBoard[first];
            }
        }
        return null;
    }

    function clear() {
        setGameBoard(["", "", "", "", "", "", "", "", ""]);
    }

    useEffect(() => {
        if (checkForWinner() != null) {

        }
    })

    function insert(box: number) {
        const board = [...gameBoard]
        if (gameBoard[box] === "") {
            board[box] = marker
            setGameBoard(board);
            if (marker === "X") {
                setMarker("O")
            } else {
                setMarker("X")
            }
        }
    }

    return (
        <div className={"game-content"}>
            <section>
                <h1 className={"game-title"}>Simple Tic Tac Toe Game</h1>
                <div className={"board"}>
                    {gameBoard.map((box, i) => (
                        <div key={i} className={"box"} onClick={() => insert(i)}>{box}</div>
                    ))}
                </div>
                <h2 className={"game-status"}>ss</h2>
                <div className={"game-button"} onClick={()=>clear()}>Restart</div>
            </section>
        </div>
    );
}

export default TicTacToe;
