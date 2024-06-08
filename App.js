import React, { useState } from 'react';
import Header from './Components/Header';
import InputForm from './Components/InputForm';
import ScoreBoard from './Components/ScoreBoard';
import CustomAlert from './Components/CustomAlert'; // Import the CustomAlert component
import './App.css';
import useGameLogic from './hooks/useGameLogic';

const App = () => {
  const { sum1, sum2, gameOver, handleTurn, resetGame, alertMessage, setAlertMessage } = useGameLogic(10);
  const [userRuns, setUserRuns] = useState([]);
  const [systemRuns, setSystemRuns] = useState([]);

  if (gameOver) {
    return <div>Thanks for playing!</div>;
  }

  const handleSubmit = (userInput) => {
    const userNumber = parseInt(userInput, 10);
    if (isNaN(userNumber) || userNumber < 1 || userNumber > 6) {
      setAlertMessage("Number should be between 1-6");
      return;
    }
    const systemNumber = handleTurn(userNumber);
    if (systemNumber === null) {  // Check if the game ended
      setUserRuns([]);
      setSystemRuns([]);
    } else {
      setUserRuns([userNumber]);
      setSystemRuns([systemNumber]);
    }
  };

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  return (
    <div className="App">
      <Header />
      <InputForm onSubmit={handleSubmit} />
      <div className="runs-display">
        <div className="user-runs">
          {userRuns.map((run, index) => (
            <img key={index} src={`/images/${run}.jpg`} alt={`User Run ${run}`} />
          ))}
        </div>
        <div className="system-runs">
          {systemRuns.map((run, index) => (
            <img key={index} src={`/images/${run}.jpg`} alt={`System Run ${run}`} />
          ))}
        </div>
      </div>
      <ScoreBoard sum1={sum1} sum2={sum2} />
      {alertMessage && <CustomAlert message={alertMessage} onClose={handleAlertClose} />}
    </div>
  );
};

export default App;
