import React, {useEffect, useState} from 'react';
import "./TicTacToe.css"

function TicTacToe() {
    const [gameBoard, setGameBoard] = useState(["", "", "", "", "", "", "", "", ""])
    const [marker, setMarker] = useState("X")
    const [winner, setWinner] = useState("")
    const [first, setFirst] = useState(-1)
    const [second, setSecond] = useState(-1)
    const [third, setThird] = useState(-1)
    const [draw,setDraw]=useState(false)

    const winningConditions = [
        //horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        //vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //across
        [0, 4, 8], [2, 4, 6]
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function checkForWinner(){
        for (let condition in winningConditions) {
            let [first, second, third]= winningConditions[condition]
            if (gameBoard[first] === gameBoard[second] && gameBoard[second] === gameBoard[third]) {
                if(winner!==""){
                    setFirst(first)
                    setSecond(second)
                    setThird(third)
                }
                return gameBoard[first]
            }
        }
        return ""
    }

    function clear() {
        setGameBoard(["", "", "", "", "", "", "", "", ""]);
        setMarker("X")
        setFirst(-1)
        setSecond(-1)
        setThird(-1)
    }

    useEffect(() => {
        setWinner(checkForWinner)
    }, [checkForWinner])

    useEffect(()=>{
        setDraw(checkForDraw)
    }, [checkForDraw])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function checkForDraw() {
        if(winner===""){
            return !gameBoard.includes("")
        }else return false
    }

    function insert(box: number) {
        if(first!==-1 || draw){
            clear()
        }
        if (winner === "" && gameBoard[box] === "") {
            const board = [...gameBoard]
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
                <div className={"board"}>
                    {gameBoard.map((box, i) => (
                        <div key={i}
                             className={"box " + ((first === i || second === i || third === i) ? "active " : null)}
                             onClick={() => insert(i)}>{box}</div>
                    ))}
                </div>
                <h2 className={"game-status"}>{draw ? "It's a draw!" : winner !== "" ? winner + " has won!" : marker + " is next"}</h2>
                <div className={"game-button"} onClick={() => {clear()}}>Restart</div>
            </section>
        </div>
    );
}

export default TicTacToe;
