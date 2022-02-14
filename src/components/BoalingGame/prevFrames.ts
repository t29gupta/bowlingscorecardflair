import Frame, { Frame10, frameId, frameIds } from "../../Types/Frame";
import { BowlAction } from "../../Types/GameModels";

type prevFramesType = {
  last: Frame;
  secondLast: Frame | null;
};

const getUnscoredFrame = (
  curFrameId: frameIds,
  GameFrames: Map<frameIds, Frame | Frame10>
) => {
  if (curFrameId === 1) {
    return null;
  } else {
    const prevFrames: prevFramesType = {} as prevFramesType;

    const last = GameFrames.get((curFrameId - 1) as frameId) as Frame;
    if (!last.IsScored) {
      prevFrames.last = last;
      console.log(prevFrames);

      if (curFrameId - 2 > 0) {
        const secondLast = GameFrames.get((curFrameId - 2) as frameId) as Frame;
        if (!secondLast.IsScored) {
          prevFrames.secondLast = secondLast;
        }
      }
      console.log(prevFrames);
      return prevFrames;
    } else {
      return null;
    }
  }
};

export const PrevFramesScoring = (
  CurFrame: Frame | Frame10,
  GameFrames: Map<frameIds, Frame | Frame10>,
  dispatch: React.Dispatch<BowlAction>,
  rollNumber: 1 | 2 | 3
) => {
  console.log("Calculating prev frame from roll ", rollNumber);

  const prevFrame = getUnscoredFrame(CurFrame.FrameId, GameFrames);
  console.log(prevFrame);
  if (prevFrame) {
    if (prevFrame.secondLast) {
      // Scoring second last frame
      console.log("Scoring second last frame...");

      // score = Totalscore (added in dispatch) + sLast (r1+r2) + last (r1+r2) + curFrame (r1)

      const slFrameScore =
        10 + // sLast was strike (this)
        10 + // last was either strike or spare (after this)
        CurFrame.Roll1;

      dispatch({
        type: "SetPrevFrameScores",
        payload: {
          frameId: prevFrame.secondLast.FrameId,
          score: slFrameScore,
        },
      });
    }

    if (prevFrame.last) {
      // Scoring last frame
      console.log("Scoring last frame...");

      var lFrameScore = 0;

      if (prevFrame.last.IsStrike && rollNumber === 1) {
        return;
      } else if (prevFrame.last.IsStrike && rollNumber === 2) {
        // score = Totalscore (added in dispatch)  + last (r1+r2) + curFrame (r1+r2)
        console.log("in last strike with roll2", CurFrame);
        lFrameScore =
          10 + // last was strike
          CurFrame.Roll1 +
          CurFrame.Roll2;
      } else {
        // else case is spare

        if (rollNumber === 1) {
          //lFrameScore =  Totalscore (added in dispatch) + last (r1+r2) + curFrame (r1)
          lFrameScore =
            10 + // last was spare
            CurFrame.Roll1;
        }
      }

      if (lFrameScore > 0) {
        dispatch({
          type: "SetPrevFrameScores",
          payload: {
            frameId: prevFrame.last.FrameId,
            score: lFrameScore,
          },
        });
      }
    }
  }
};
