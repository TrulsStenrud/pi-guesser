import { FC, useState } from "react";

import cx from 'classnames'

export const GameCode: FC<{onSubmit: (val: string) => void}> = ({onSubmit}) => {

  const [gameCode, setGameCode] = useState("");

  const inputValid = gameCode.length > 0;

  const canSend = inputValid;

  const _onSubmit = async () => {
    onSubmit(gameCode); 
  }

  return (
    <div className="flexColumn alignCenter">
      <h1 className="noMargin">Skriv in game code :)</h1>
      <div className="flexColumn alignCenter" style={{width: 300}}>
        <input className="input width100percent" onChange={(e) => setGameCode(e.target.value.trim())} placeholder="gamecode" value={gameCode} />
        <button disabled={!canSend} onClick={() => _onSubmit()} className={cx('button', "flexUnit", "width100percent", {active: canSend})}>Send inn</button>
      </div>

    </div>
  );
}
