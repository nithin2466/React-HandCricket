import { useState } from 'react';

const useGameLogic = (maxTurns) => {
  const [sum1, setSum1] = useState(0);
  const [sum2, setSum2] = useState(0);
  const [turns, setTurns] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleTurn = (userNumber) => {
    const systemNumber = Math.floor(Math.random() * 6) + 1;

    if (userNumber === systemNumber) {
      setAlertMessage(`Out! Final scores are: ${sum1} - ${sum2}`);
      displayWinner();
      return null; // Indicate the game has ended
    } else {
      setSum1((prevSum1) => prevSum1 + userNumber);
      setSum2((prevSum2) => prevSum2 + systemNumber);
      setTurns((prevTurns) => prevTurns + 1);
    }

    if (turns + 1 === maxTurns) {
      displayWinner();
      return null; // Indicate the game has ended
    }
    return systemNumber;
  };

  const displayWinner = () => {
    let message;
    if (sum1 > sum2) {
      message = "You won!";
    } else if (sum1 < sum2) {
      message = "System won!";
    } else {
      message = "It's a tie!";
    }
    setAlertMessage(`${message}\nDo you want to play again?`);
  };

  const resetGame = () => {
    setSum1(0);
    setSum2(0);
    setTurns(0);
    setGameOver(false);
    setAlertMessage(null);
  };

  return { sum1, sum2, turns, gameOver, handleTurn, resetGame, alertMessage, setAlertMessage };
};

export default useGameLogic;
