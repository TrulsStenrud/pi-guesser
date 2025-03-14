import { FC } from "react";

export const Waiting: FC<{message: string}> = ({message}) => {
  return (
    <div className="flexColumn alignCenter">
      <h1 className="noMargin">{message}</h1>
    </div>
  );
}
