import Frame, { Frame10, frameIds } from "./Frame";

type newGameProps = {
  playerName: string;
  gameId: number;
};
export type GameFramesType = Map<frameIds, Frame | Frame10>;

export default class BowlingGame {
  constructor(newGameProps: newGameProps) {
    this.NewGameProps = newGameProps;
  }

  NewGameProps: newGameProps = {} as newGameProps;

  GameFrames = new Map<frameIds, Frame | Frame10>();
  CurrentFrame: Frame | Frame10 | null = null;

  TotalScore: number = 0;
}
