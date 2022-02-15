import React from "react";
import { SphereButton } from "./SphereButton";

type NumberArrType = {
  value: number;
  disabled: boolean;
};

export type ButtonProps = {
  GameOver: boolean;
  handleClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => void;
};

export const BowlCountBar = (props: ButtonProps) => {
  const numberArr: NumberArrType[] = [];

  for (let index = 0; index <= 10; index++) {
    numberArr.push({
      value: index,
      disabled: false,
    });
  }

  return (
    <div className="NumberContainer">
      <div>
        {numberArr.map((num) => (
          <SphereButton
            key={num.value}
            id={`p${num.value}`}
            disabled={num.disabled || props.GameOver}
            onClick={(event) => props.handleClick(event, num.value)}
            value={num.value}
          />
        ))}
      </div>
    </div>
  );
};
