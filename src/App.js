import React, { useState, useEffect } from 'react';
import Header from './pages/Header';
import Body from './pages/Body';
import logo from './img/LogoCineTrivia.png';
import resultado1 from './img/framboesa.jpg';
import resultado2 from './img/cinema.jpg';
import resultado3 from './img/Oscar.jpg';
import './style/CineTrivia.css';
import background from './img/background.jpg'; // Importa a imagem de fundo

function CineTrivia() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      var requestOptions = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      };

      try {
        const response = await fetch("https://localhost:5000/api/Jogos", requestOptions);

        if (!response.ok) {
          throw new Error("Erro ao carregar perguntas");
        }

        const data = await response.json();

        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 15);
        setQuestions(shuffled);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error.message);
      }
    };

    fetchQuestions();
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setIsGameOver(false);
    setCorrectAnswers(0);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswerStatus(null);
  };

  const handleOptionSelect = (option) => {
    if (answerStatus === null) {
      setSelectedOption(option);
    }
  };

  const confirmAnswer = () => {
    if (!questions.length || selectedOption === null) return;

    const current = questions[currentQuestion];
    const isCorrect = selectedOption === current.respostaCorreta;

    setAnswerStatus(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswerStatus(null);
      } else {
        setIsGameOver(true);
      }
    }, 2000);
  };


  const getResultImage = () => {
    if (correctAnswers <= 5) return resultado1;
    if (correctAnswers <= 10) return resultado2;
    return resultado3;
  };

  return (
    
      <div 
      className="card-container"
      style={{
        backgroundImage: `url(${background})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <div className="card">
        <header className="card-header">
          <Header
            logo={isGameOver ? getResultImage() : logo}
            question={gameStarted && !isGameOver ? questions[currentQuestion]?.pergunta : null}
          />
        </header>
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
          answerStatus={answerStatus}
        />
      </div>
    </div>
  );
}

export default CineTrivia;
