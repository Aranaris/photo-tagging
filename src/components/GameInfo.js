import '../styles/GameInfo.css';
import { useState } from 'react';

function GameInfo(props) {
    const [gameData, setGameData] = useState({scores:[]});

    const testData = {scores:
        [
            {
                object: "test 1",
                score: 3.5,
            },
            {
                object: "test 2",
                score: 10.5,
            }
        ]
    }

    const updateScore = () => {
        setGameData(testData);
    }

    return (
        <div className="GameInfo">
            <div className="player-score">Your Score: {props.playerScore}</div>
            <table>
                <thead>
                    <tr>
                        <th>Character</th>
                        <th>Score (sec)</th>
                    </tr>
                </thead>
                <tbody>
                    {gameData.scores.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.object}</td>
                                <td>{val.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={updateScore}>Show Test Data</button>
        </div>
    )
}

export default GameInfo;