import { useSearchParams } from 'react-router';
import { Answer } from '../pages/Answer';

import { GameCode } from '../pages/GameCode';
import { Username } from '../pages/Username';
import { useCheckForRunningGame } from '../hooks/use-check-for-game-running';
import { Waiting } from '../pages/Waiting';

function AnswerWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const gameCode = searchParams.get("gameCode");
  const username = searchParams.get("username");

  const gameIsRunning = useCheckForRunningGame(gameCode);

  if(gameCode === null){
    return <GameCode onSubmit={(val) => {
      setSearchParams((searchParams) => {
        searchParams.append("gameCode", val);
        return searchParams;
      });
    }}/>;
  }
  
  if(username === null){
    return <Username 
      gameCode={gameCode}
      onSubmit={(val) => {
      setSearchParams((searchParams) => {
        searchParams.append("username", val);
        return searchParams;
      });
    }}/>;
  }

  if(!gameIsRunning){
    return <Waiting  message={"Venter på at quizen starter ..."}/>;
  }

  return (
      <Answer username={username} gameCode={gameCode}/>
  )
}

export default AnswerWrapper
