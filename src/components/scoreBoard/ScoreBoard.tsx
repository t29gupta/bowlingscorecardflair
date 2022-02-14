import Frame, { Frame10, frameId, frameIds } from "../../Types/Frame";
import "./ScoreBoard.css";

type ScoreBoardProps = {
  TotalScore: number;
  gameFrames: Map<frameIds, Frame | Frame10>;
};

export const ScoreBoard = ({ gameFrames, TotalScore }: ScoreBoardProps) => {
  const frames = 10;

  return (
    <div className="Container">
      <table
        id="scoreTable"
        className="ScoreTable"
        cellPadding={2}
        cellSpacing="0"
      >
        <tbody>
          {/* Frame Row */}
          <tr>
            {getFrameHeaders(frames)}
            <th id="TotalScoreHead" colSpan={6}>
              Total Score
            </th>
          </tr>

          <tr>
            {getFrameSubScoreRow(gameFrames)}
            <td id="TotalScoreRow" colSpan={6}>
              {TotalScore}
            </td>
          </tr>

          <tr>
            {getFrameScoreRow(gameFrames)}
            <td id="TotalScoreRow1" colSpan={6}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const getFrameHeaders = (
  frameCount: number
): React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>[] => {
  var thArr: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >[] = [];

  for (let i = 1; i <= frameCount; i++) {
    thArr.push(
      <th key={`head${i}`} id={`head${i}`} colSpan={6}>
        {`Frame ${i}`}
      </th>
    );
  }

  return thArr;
};

const getFrameSubScoreRow = (
  gameFrames: Map<frameIds, Frame | Frame10>
): React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>[] => {
  var tdArr: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >[] = [];

  for (let i = 1; i <= 10; i++) {
    const frame = gameFrames.get(i as frameId) || new Frame(i as frameId);

    tdArr.push(
      <td
        key={`ss${frame.FrameId}0`}
        id={`ss${frame.FrameId}0`}
        colSpan={frame.FrameId === 10 ? 2 : 3}
      >
        {frame.FrameId === 10
          ? frame.IsStrike
            ? "X"
            : isNaN(frame.Roll1)
            ? ""
            : frame.Roll1
          : frame.IsStrike
          ? ""
          : isNaN(frame.Roll1)
          ? ""
          : frame.Roll1}
      </td>
    );

    tdArr.push(
      <td
        key={`ss${frame.FrameId}1`}
        id={`ss${frame.FrameId}1`}
        colSpan={frame.FrameId === 10 ? 2 : 3}
      >
        {frame.FrameId === 10
          ? frame.IsSpare
            ? "/"
            : frame.Roll2 === 10
            ? "X"
            : isNaN(frame.Roll2)
            ? ""
            : frame.Roll2
          : frame.IsStrike
          ? "X"
          : frame.IsSpare
          ? "/"
          : isNaN(frame.Roll2)
          ? ""
          : frame.Roll2}
      </td>
    );
    frame.FrameId === 10 &&
      tdArr.push(
        <td key={`ss${frame.FrameId}2`} id={`ss${frame.FrameId}2`} colSpan={2}>
          {frame.Roll3 === 10
            ? "X"
            : frame.Roll2 + frame.Roll3 === 10
            ? "/"
            : isNaN(frame.Roll3)
            ? ""
            : frame.Roll3}
        </td>
      );
  }

  return tdArr;
};

const getFrameScoreRow = (
  gameFrames: Map<frameIds, Frame | Frame10>
): React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>[] => {
  var tdArr: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >[] = [];

  for (let i = 1; i <= 10; i++) {
    const frame = gameFrames.get(i as frameId) || new Frame(i as frameId);

    tdArr.push(
      <td
        key={`frameScore${frame.FrameId}`}
        id={`frameScore${frame.FrameId}`}
        colSpan={6}
      >
        {frame.IsScored && frame.FinalFrameScore}
      </td>
    );
  }

  return tdArr;
};
