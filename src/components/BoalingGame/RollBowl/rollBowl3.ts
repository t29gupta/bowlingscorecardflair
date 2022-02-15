import Frame, { Frame10, frameIds } from "../../../Types/Frame";
import { BowlAction } from "../../../Types/GameModels";
import { PinnsDownType } from "../../../Types/PinnsDown";

export const rollBowl3 = (
  CurrentFrame: Frame10,
  pinnsDropped: PinnsDownType,
  GameFrames: Map<frameIds, Frame | Frame10>,
  dispatch: React.Dispatch<BowlAction>,
  setInValidPinsCountPressed: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const curFrame = { ...CurrentFrame };

  // validate pinnes dropped. Roll3 is only possible if roll1 was strike
  if (
    curFrame.Roll1 === 10 &&
    curFrame.Roll2 !== 10 &&
    curFrame.Roll2 + pinnsDropped > 10
  ) {
    setInValidPinsCountPressed(true);
    return;
  } else {
    setInValidPinsCountPressed(false);
  }

  curFrame.Roll3 = pinnsDropped;

  console.log("Calculating roll3...");

  if (curFrame.Roll2 + pinnsDropped === 10) {
    curFrame.IsSpare = true;
  }
  curFrame.IsScored = true;

  dispatch({
    type: "Roll3",
    payload: {
      frame: curFrame,
    },
  });
};
