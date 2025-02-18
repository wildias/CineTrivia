import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-regular-svg-icons';
import logo from './img/LogoCineTrivia.png';
import Header from './pages/Header';
import Body from './pages/Body';
import './style/CineTrivia.css';


function CineTrivia() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      question: 'Qual é o maior filme de bilheteria de todos os tempos?',
      options: ['Avatar', 'Vingadores: Ultimato', 'Titanic', 'Star Wars'],
      answer: 0,
    },
    // Outras perguntas...
  ];

  const startGame = () => {
    setGameStarted(true);
    setIsGameOver(false);
    setCorrectAnswers(0);
    setCurrentQuestion(0);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const confirmAnswer = () => {
    const isAnswerCorrect = selectedOption === questions[currentQuestion].answer;
  
    // Adiciona a classe de piscar
    const optionClass = isAnswerCorrect ? 'selected-correct confirmed' : 'selected-wrong confirmed';
    document.querySelectorAll('.option-button')[selectedOption].className = `option-button ${optionClass}`;
  
    // Aguarda o efeito de piscar antes de continuar
    setTimeout(() => {
      if (isAnswerCorrect) {
        setCorrectAnswers(correctAnswers + 1);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
        } else {
          setIsGameOver(true);
        }
      } else {
        setIsGameOver(true);
      }
    }, 2000); // Aguarda 2 segundos para exibir o efeito de piscar
  };
  

  return (
    <div className="card-container">
      <div className="card">
        {/* Header com verificação */}
        <header className='card-header'>
          <Header
            logo={logo}
            question={gameStarted && !isGameOver ? questions[currentQuestion].question : null}
          />
        </header>
        {/* Body */}
        <Body
          gameStarted={gameStarted}
          playerName={playerName}
          setPlayerName={setPlayerName}
          startGame={startGame}
          isGameOver={isGameOver}
          correctAnswers={correctAnswers}
          setGameStarted={setGameStarted}
          questions={questions}
          currentQuestion={currentQuestion}
          handleOptionSelect={handleOptionSelect}
          selectedOption={selectedOption}
          confirmAnswer={confirmAnswer}
        />
      </div>
    </div>
  );
}

export default CineTrivia;