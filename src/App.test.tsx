import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders App component", () => {
  test("Renders New Game in start", () => {
    render(<App />);
    const linkElement = screen.getByText(/New Game/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Renders Game after clicking on "New Gme"', () => {
    render(<App />);
    const linkElement = screen.getByText(/New Game/i);
    linkElement.click();

    const restartButton = screen.getByText(/Restart Game/i);
    expect(restartButton).toBeInTheDocument();
  });
});
