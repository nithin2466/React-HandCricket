import React from 'react';

const ScoreBoard = ({ sum1, sum2 }) => {
  return (
    <div className="ScoreBoard">
      <p>Scores: {sum1} - {sum2}</p>
    </div>
  );
};

export default ScoreBoard;
