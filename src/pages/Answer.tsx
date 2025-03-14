import { FC, useState } from "react";

import cx from 'classnames'
import supabase from "../../utils/supabase";
import { useLocation, useNavigate } from "react-router";

export const Answer: FC<{username: string; gameCode: string}> = ({username, gameCode}) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [answerStr, setAnswerStr] = useState("");
  const [answered, setAnswered] = useState(false);

  const inputValid = answerStr.startsWith("3.1415");

  const canSend = inputValid;

  const onSubmit = async () => {

    const obj = await supabase
      .from('answers')
      .upsert({ user: username, answer: answerStr, game_code: gameCode})

    if(obj.error){
      alert("Noe galt skjedde, ikke slå av browseren. Kan hende du må sende resultat på slack xD");
    }else{
      setAnswered(true);
    }

  }

  if(answered){
    return <h1>Svar er sendt</h1>;
  }

  return (
    <div className="flexColumn alignStart width100percent">
      <h1 className="noMargin">Skriv så mye av π som du kan..</h1>
      <div className="flexColumn alignEnd width100percent">
        <textarea onChange={(e) => setAnswerStr(e.target.value.trim())} className={cx('textarea', 'flexRest')} id="story" name="story" placeholder="3.141568...">{answerStr}</textarea>
        <button disabled={!canSend} onClick={() => onSubmit()} className={cx('button', "flexUnit", {active: canSend})}>Send inn</button>
      </div>
    </div>
  );
}
