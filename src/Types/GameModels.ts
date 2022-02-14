import BowlingGame from "./BowlingGame";
import Frame, { Frame10, frameId } from "./Frame";

export type GameState = {
  currentGame: BowlingGame | null;
  GameOver: boolean;
};

export type RollAction = {
  type: "Roll1" | "Roll2" | "Roll3";
  payload: { frame: Frame | Frame10 };
};

export type NewGameAction = {
  type: "New Game" | "Game Over";
};

export type UpdatePrevFramesAction = {
  type: "SetPrevFrameScores";
  payload: {
    frameId: frameId;
    score: number;
  };
};

export type BowlAction = RollAction | NewGameAction | UpdatePrevFramesAction;
