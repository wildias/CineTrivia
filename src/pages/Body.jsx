import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import '../style/body.css';

function Body({
    gameStarted,
    playerName,
    setPlayerName,
    startGame,
    isGameOver,
    correctAnswers,
    setGameStarted,
    questions,
    currentQuestion,
    handleOptionSelect,
    selectedOption,
    confirmAnswer,
}) {
    return (
        <div className="card-body">
            {!gameStarted ? (
                <div className="game-start">
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="input-name"
                    />
                    <button
                        onClick={startGame}
                        disabled={!playerName.trim()}
                        className="start-button"
                    >
                        Iniciar Jogo
                    </button>
                </div>
            ) : isGameOver ? (
                <div className="game-over">
                    <h1 className="game-over-title">Game Over</h1>
                    <p className="correct-answers">Respostas corretas: {correctAnswers}</p>
                    <button
                        onClick={() => setGameStarted(false)}
                        className="restart-button"
                    >
                        Jogar Novamente
                    </button>
                </div>
            ) : (
                <div className="quiz-container">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            className={`option-button ${selectedOption === index
                                    ? selectedOption === questions[currentQuestion].answer
                                        ? 'selected-correct'
                                        : 'selected-wrong'
                                    : ''
                                }`}
                        >
                            {option}
                            {selectedOption === index && (
                                <FontAwesomeIcon icon={faFilm} className="icon-film" />
                            )}
                        </button>
                    ))}

                    <button
                        onClick={confirmAnswer}
                        disabled={selectedOption === null}
                        className="confirm-button"
                    >
                        Confirmar Resposta
                    </button>
                </div>
            )}
        </div>
    );
}

export default Body;
