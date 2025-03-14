import { FC } from "react";
import QRCode from "react-qr-code";

import { useLocation, useSearchParams } from "react-router";
import { useFetchUsers } from "../hooks/use-fetch-users";

export const Dashboard: FC = () => {
  const location = useLocation();
  const [searchParams, ] = useSearchParams();

  const gameCode = searchParams.get("gameCode");
  const users = useFetchUsers(gameCode);

  return (
    <div className="flexColumn alignCenter">
      <h1 className="noMargin">gamecode: {gameCode}</h1>
      <QRCode value={window.location.protocol+window.location.host+location.search}/>
      <h1>[{users.join(", ")}]</h1>
    </div>
  );
}
