import { FC, useEffect, useState } from "react";

import supabase from "../../utils/supabase";
import { useSearchParams } from "react-router";
import { fasit } from "../fasit";

export const Results: FC = () => {

  const [searchParams, ] = useSearchParams();

  const gameCode = searchParams.get("gameCode");

  const [results, setResults] = useState<{username:string, correct: string, incorrect: string}[]>([])

  async function fetch() {
    const { data } = await supabase.from('answers').select('user, answer').eq('game_code',gameCode)
    return data;
  }

  async function showResult(){
    const answers = await fetch() ?? [];

    const res = answers.map((o) => {
      let split = 0;
      for(let i=0; i<o.answer.length; i++){
        if(o.answer[i] === fasit[i]){
          split = i;
        }else{
          break;
        }
      }

      const correct = o.answer.substring(0, split+1);
      const incorrect = o.answer.substring(split+1, o.answer.length);

      return {
        username: o.user,
        correct: correct,
        incorrect: incorrect,
      }
    });

    res.sort((a, b) => a.correct.length - b.correct.length);

    console.log(res);


    setResults(res);
  }

  if(gameCode === null){
    return <h1>whoot?</h1>
  }

  function renderResult(username, correct, incorrect) {
    return <p>
      <span>{username}</span>{' '} 
      <span className="green">{correct}</span>
      <span className="red">{incorrect}</span>
    </p>
  }

  return (
    <>
      {results.length > 0 && (<div className="flexColumn"> 
      {results.map((r) => renderResult(r.username, r.correct, r.incorrect))}


    </div>)}
      {results.length === 0 && <button onClick={() => showResult()}>Vis resultatet</button>} 
    </>
  );
}
