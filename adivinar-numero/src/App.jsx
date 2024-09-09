import React, { useState } from 'react';
import './App.css';
import espadaEnPiedra from './assets/espadaEnPiedra.png';
import espada from './assets/espada.png';

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 20) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(10);
  const [highScore, setHighScore] = useState(0);
  const [won, setWon] = useState(false);
  const [victoryMessage, setVictoryMessage] = useState('¡Has liberado la Espada Mágica de la piedra! Úsala con valor.');

  const handleGuess = () => {
    if (parseInt(guess) === number) {
      setMessage('¡La Espada Mágica ha sido liberada de la piedra!');
      setWon(true); 
      if (score > highScore) {
        setHighScore(score);
      }
    } else if (score <= 1) {
      setMessage(`Has perdido. El número era ${number}.`);
      resetGame();
    } else {
      setScore(score - 1);
      if (parseInt(guess) < number) {
        setMessage('El número es más alto. Intenta de nuevo.');
      } else {
        setMessage('El número es más bajo. Intenta de nuevo.');
      }
    }
  };

  const resetGame = () => {
    setNumber(Math.floor(Math.random() * 20) + 1);
    setScore(10);
    setGuess('');
    setWon(false);
    setMessage('');
  };

  return (
    <div className="app-container">
      <h1 className="title">¡Adivina el número para sacar la Espada Mágica de la piedra!</h1>
      <p className="instruction">Introduce un número entre 1 y 20</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="input"
        min="1"
        max="20"
        disabled={won} // Deshabilita el input si se ha ganado
      />
      <div className="button-container">
        {won ? (
          <>
            <img src={espada} alt="Espada sacada de la piedra" className="sword" />
            <p className="victory-message">{victoryMessage}</p>
            <button onClick={resetGame} className="button">
              Jugar de nuevo
            </button>
          </>
        ) : (
          <button onClick={handleGuess} className="button">
            Adivinar
          </button>
        )}
      </div>
      <p className="message">{message}</p>
      <p className="score">Puntaje: {score}</p>
      <p className="high-score">Puntaje más alto: {highScore}</p>
      {!won && (
        <div className="contenedor-espada">
          <img src={espadaEnPiedra} alt="Espada en la piedra" className="sword" />
        </div>
      )}
    </div>
  );
}

export default App;
