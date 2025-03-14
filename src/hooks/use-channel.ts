import { useEffect } from "react";
import supabase from "../../utils/supabase";

export function useChannel(gameCode: string | null, onEvent: (arg: unknown) => void) {

  useEffect(() => {
    if(gameCode === null){
      console.log("NO GAMECODE");
      return;
    }

    console.log("SUBSCRIBING");

    const taskListener = supabase.channel(gameCode).on(
      'broadcast',
      { event: 'event' },
      (payload) => onEvent(payload)
    )
    .subscribe();

    return () => { console.log("UNSUBSCRIBING"); taskListener.unsubscribe() };
  }, [gameCode, onEvent]);


  if(gameCode === null){
    return () => {};
  }

  const channel = 
    supabase.channel(gameCode);

  return (msg: string) => {
    channel.send({
      type: 'broadcast',
      event: 'event',
      payload: { message: msg },
    });
  }

}
