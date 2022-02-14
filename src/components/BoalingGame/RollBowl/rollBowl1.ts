import React from "react";
import { GameFramesType } from "../../../Types/BowlingGame";
import Frame, { Frame10, frameId, frameIds } from "../../../Types/Frame";
import { BowlAction } from "../../../Types/GameModels";
import { PinnsDownType } from "../../../Types/PinnsDown";
import { PrevFramesScoring } from "../prevFrames";

type rollBowlProps = {
  CurrentFrame: Frame | Frame10 | null;
  pinnsDropped: PinnsDownType;
  setRollNumber: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  GameFrames: GameFramesType;
  dispatch: React.Dispatch<BowlAction>;
};

export const rollBowl1 = ({
  CurrentFrame,
  pinnsDropped,
  setRollNumber,
  GameFrames,
  dispatch,
}: rollBowlProps) => {
  console.log("Calculating Roll1...");

  let newFrame: Frame | Frame10;
  var newFrameId: frameIds;

  // Its a new game
  if (CurrentFrame === null) {
    console.log("New Game");
    newFrameId = 1;
    newFrame = new Frame(1);
  } else {
    newFrameId = (CurrentFrame.FrameId + 1) as frameIds;
    // for on-going game
    if (newFrameId < 10) {
      newFrame = new Frame(newFrameId as frameId);
    } else {
      newFrame = new Frame10();
    }
  }

  newFrame.Roll1 = pinnsDropped;

  if (pinnsDropped !== 10) {
    setRollNumber(2);
  } else {
    newFrame.IsStrike = true;
    if (newFrameId === 10) {
      setRollNumber(2);
    } else {
      setRollNumber(1);
    }
  }

  // Calculate prev frames
  PrevFramesScoring(newFrame, GameFrames, dispatch, 1);

  dispatch({
    type: "Roll1",
    payload: {
      frame: newFrame,
    },
  });
};
