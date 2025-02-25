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
    questions,
    currentQuestion,
    handleOptionSelect,
    selectedOption,
    confirmAnswer,
    answerStatus,
    resetGame,
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
                        onClick={resetGame}
                        className="restart-button"
                    >
                        Jogar Novamente
                    </button>
                </div>
            ) : (
                <div className="quiz-container">
                    <div className="opcoes">
                        {[questions[currentQuestion]?.opcao_1,
                          questions[currentQuestion]?.opcao_2,
                          questions[currentQuestion]?.opcao_3,
                          questions[currentQuestion]?.opcao_4,
                        ].map((opcao, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(opcao)}
                                className={`option-button 
                                    ${selectedOption === opcao ? "selected" : ""} 
                                    ${
                                        answerStatus
                                            ? opcao === questions[currentQuestion]?.respostaCorreta
                                                ? "selected-correct blink"
                                                : opcao === selectedOption
                                                ? "selected-wrong blink"
                                                : ""
                                            : ""
                                    }`}
                                disabled={answerStatus !== null}
                            >
                                {opcao}
                                {selectedOption === opcao && (
                                    <FontAwesomeIcon icon={faFilm} className="icon-film" />
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={confirmAnswer}
                        disabled={selectedOption === null || answerStatus !== null}
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
