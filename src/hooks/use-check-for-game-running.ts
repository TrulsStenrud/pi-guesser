import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";

export function useCheckForRunningGame(gameCode: string | null) {

  async function checkForRunningGame() {
    const { data } = await supabase.from('running_games').select('gamecode').eq('gamecode',gameCode)
    return (data?.length ?? 0) > 0;
  }

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if(gameCode === null){
      return;
    }

    console.log("START POLLING");

    const interval = setInterval(async function(){
      console.log("checking game start");
      const _isRunning = await checkForRunningGame()
      setIsRunning(_isRunning);

      if(_isRunning){
        console.log("STOPPING POLLING: game is runnning");
        clearInterval(interval);
      }
    }, 1000)

    return () => { console.log("STOPPING POLLING: unloaded"); clearInterval(interval); };
  }, [gameCode]);


  return isRunning;

}
