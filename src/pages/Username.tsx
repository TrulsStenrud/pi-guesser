import { FC, useState } from "react";

import cx from 'classnames'
import supabase from "../../utils/supabase";

export const Username: FC<{gameCode: string; onSubmit: (val: string) => void}> = ({gameCode, onSubmit}) => {

  const [username, setUsername] = useState("");
  const [errMessage, setErrMessage] = useState<string|undefined>();

  const inputValid = username.length > 0;

  const canSend = inputValid;

  async function fetchUsers() {
    const { data } = await supabase.from('users').select('username').eq('gamecode',gameCode)
    return data;
  }

  const _onSubmit = async () => {
    setErrMessage(undefined);
    const data = await fetchUsers() ?? [];
    const userTaken = data.filter((o) => o.username === username).length > 0;

    if(userTaken){
      setErrMessage("Bruker navnet '"+username+"' er tatt");
      return;
    }

    await supabase
      .from('users')
      .insert({ username: username, gamecode: gameCode})

    onSubmit(username); 
  }

  return (
    <div className="flexColumn alignCenter">
      <h1 className="noMargin">Velg brukernavn {'<3'}</h1>
      <div className="flexColumn alignCenter" style={{width: 300}}>
        {errMessage && <p>{errMessage}</p>}
        <input className="input width100percent" onChange={(e) => setUsername(e.target.value.trim())} placeholder="brukernavn" value={username} />
        <button disabled={!canSend} onClick={() => _onSubmit()} className={cx('button', "flexUnit", "width100percent", {active: canSend})}>Send inn</button>
      </div>

    </div>
  );
}
