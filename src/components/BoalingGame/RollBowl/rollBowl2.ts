import { GameFramesType } from "../../../Types/BowlingGame";
import Frame, { Frame10 } from "../../../Types/Frame";
import { BowlAction } from "../../../Types/GameModels";
import { PinnsDownType } from "../../../Types/PinnsDown";
import { PrevFramesScoring } from "../prevFrames";

type rollBowlProps = {
  CurrentFrame: Frame | Frame10;
  pinnsDropped: PinnsDownType;
  setRollNumber: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  GameFrames: GameFramesType;
  dispatch: React.Dispatch<BowlAction>;
  setInValidPinsCountPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const rollBowl2 = ({
  CurrentFrame,
  pinnsDropped,
  setRollNumber,
  GameFrames,
  dispatch,
  setInValidPinsCountPressed,
}: rollBowlProps) => {
  const curFrame = { ...CurrentFrame };

  // validate pinnes dropped
  if (
    (curFrame.FrameId !== 10 || !curFrame.IsStrike) &&
    curFrame.Roll1 + pinnsDropped > 10
  ) {
    setInValidPinsCountPressed(true);
    return;
  } else {
    setInValidPinsCountPressed(false);
  }
  curFrame.Roll2 = pinnsDropped;

  // Get previous unscored frames
  PrevFramesScoring(curFrame, GameFrames, dispatch, 2);

  console.log("Calculating roll2...");

  if (curFrame.FrameId < 10) {
    if (curFrame.Roll1 + pinnsDropped === 10) {
      curFrame.IsSpare = true;
    } else {
      curFrame.IsScored = true;
    }

    setRollNumber(1);
  } else {
    // First check if its a strike
    if (curFrame.IsStrike) {
      setRollNumber(3);
    } else {
      // validate pinnes dropped
      if (CurrentFrame.Roll1 + pinnsDropped > 10) {
        setInValidPinsCountPressed(true);
        return;
      } else {
        setInValidPinsCountPressed(false);
      }

      if (curFrame.Roll1 + pinnsDropped === 10) {
        curFrame.IsSpare = true;
        setRollNumber(3);
      } else {
        curFrame.IsScored = true;
      }
    }
  }

  dispatch({
    type: "Roll2",
    payload: {
      frame: curFrame,
    },
  });
};
