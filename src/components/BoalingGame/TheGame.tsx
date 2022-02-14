import React, { useReducer, useState } from "react";
import { ScoreBoard } from "../scoreBoard/ScoreBoard";

import Frame, { Frame10 } from "../../Types/Frame";
import BowlingGame from "../../Types/BowlingGame";
import { BowlAction, GameState } from "../../Types/GameModels";
import { PinnsDownType } from "../../Types/PinnsDown";
import { rollBowl1 } from "./RollBowl/rollBowl1";
import { rollBowl2 } from "./RollBowl/rollBowl2";
import { rollBowl3 } from "./RollBowl/rollBowl3";
import { BowlCountBar } from "../BowlCountBar";

const initialState = {
  currentGame: null,
  GameOver: false,
};

const reducer = (state: GameState, action: BowlAction) => {
  switch (action.type) {
    case "Roll1": {
      if (state.currentGame !== null) {
        const game: BowlingGame = { ...state.currentGame };
        const curFrame = { ...action.payload.frame };
        game.CurrentFrame = { ...curFrame };
        game.GameFrames.set(curFrame.FrameId, curFrame);

        return {
          GameOver: false,
          currentGame: game,
        };
      } else {
        return state;
      }
    }
    case "Roll2": {
      console.log(state.currentGame);

      if (state.currentGame !== null) {
        console.log(action.payload);

        const game: BowlingGame = { ...state.currentGame };
        const curFrame = { ...action.payload.frame };

        if (curFrame.IsScored) {
          curFrame.FinalFrameScore =
            curFrame.Roll1 + curFrame.Roll2 + game.TotalScore;
          game.TotalScore = curFrame.FinalFrameScore;
        }

        game.CurrentFrame = curFrame;
        game.GameFrames.set(curFrame.FrameId, curFrame);

        return {
          GameOver: false,
          currentGame: game,
        };
      } else {
        return state;
      }
    }
    case "Roll3": {
      if (state.currentGame !== null) {
        const game: BowlingGame = { ...state.currentGame };
        const curFrame = { ...action.payload.frame } as Frame10;

        curFrame.FinalFrameScore =
          curFrame.Roll1 + curFrame.Roll2 + curFrame.Roll3 + game.TotalScore;
        game.TotalScore = curFrame.FinalFrameScore;

        game.CurrentFrame = curFrame;
        game.GameFrames.set(curFrame.FrameId, curFrame);

        return {
          GameOver: true,
          currentGame: game,
        };
      } else {
        return state;
      }
    }
    case "SetPrevFrameScores": {
      if (state.currentGame !== null) {
        const game: BowlingGame = { ...state.currentGame };

        const oldFrame = game.GameFrames.get(action.payload.frameId) as Frame;
        const oldFrameObj = { ...oldFrame };
        oldFrameObj.FinalFrameScore = game.TotalScore + action.payload.score;
        oldFrameObj.IsScored = true;

        game.GameFrames.set(oldFrameObj.FrameId, oldFrameObj);
        game.TotalScore += action.payload.score;

        return {
          GameOver: false,
          currentGame: game,
        };
      } else {
        return state;
      }
    }
    case "New Game":
      return {
        GameOver: false,
        currentGame: new BowlingGame({ playerName: "Tushar", gameId: 1 }),
      };
    case "Game Over": {
      const Frame10 = state.currentGame?.GameFrames.get(10) as Frame10;
      if (Frame10?.IsScored) {
        return {
          ...state,
          GameOver: true,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    default:
      return state;
  }
};

export const TheGame = () => {
  const [rollNumber, setRollNumber] = useState<1 | 2 | 3>(1);

  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickBowl = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: Number
  ) => {
    event.preventDefault();

    const pinnsDropped = value as PinnsDownType;

    if (state.currentGame) {
      // console.log(state.currentGame);

      const { CurrentFrame, GameFrames } = state.currentGame;

      if (rollNumber === 1) {
        rollBowl1({
          CurrentFrame,
          pinnsDropped,
          setRollNumber,
          GameFrames,
          dispatch,
        });
      } else if (rollNumber === 2) {
        if (CurrentFrame === null) return;

        rollBowl2({
          CurrentFrame,
          pinnsDropped,
          GameFrames,
          dispatch,
          setRollNumber,
        });

        if (CurrentFrame.FrameId === 10) {
          // if 10th frame then dispatch to check game over
          dispatch({ type: "Game Over" });
        }
      } else {
        console.log(CurrentFrame as Frame10, pinnsDropped, GameFrames);
        rollBowl3(CurrentFrame as Frame10, pinnsDropped, GameFrames, dispatch);
      }
    }
  };

  const onClickNewGame = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch({ type: "New Game" });
    setRollNumber(1);
  };

  return (
    <div>
      {state.currentGame ? (
        <>
          <br />

          <button className="RestartButton" onClick={onClickNewGame}>
            Restart Game
          </button>
          <br />

          <BowlCountBar handleClick={onClickBowl} GameOver={state.GameOver} />

          <ScoreBoard
            gameFrames={state.currentGame.GameFrames}
            TotalScore={state.currentGame.TotalScore}
          />

          {state.GameOver && (
            <div className="FinalScore">
              <h2>Final Score </h2>
              <h1>{state.currentGame.TotalScore}</h1>
            </div>
          )}
        </>
      ) : (
        <button onClick={onClickNewGame}>New Game</button>
      )}
    </div>
  );
};
