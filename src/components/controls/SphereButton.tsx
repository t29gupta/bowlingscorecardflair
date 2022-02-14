import React from "react";
import "./SphereButton.css";

type CustomButtomProps = {
  value: number;
  children?: string;
} & Omit<React.ComponentProps<"button">, "children">;

export const SphereButton = ({ children, ...rest }: CustomButtomProps) => {
  return (
    <button className="pushable" {...rest}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">{rest.value}</span>
    </button>
  );
};
