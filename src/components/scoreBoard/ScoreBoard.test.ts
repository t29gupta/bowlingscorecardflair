/* eslint-disable testing-library/await-async-query */
import { shallow } from "enzyme";
import { findByTestAttrubute } from "../../../testUtils";
import Frame, { Frame10, frameIds } from "../../Types/Frame";
import { ScoreBoard } from "./ScoreBoard";

const mockGameFrames = new Map<frameIds, Frame | Frame10>();

const fillMockGameFrames = () => {
  const FramesArr = [
    {
      Roll1: 6,
      Roll2: 4,
      IsSpare: true,
      IsStrike: false,
      IsScored: true,
      FinalFrameScore: 33,
      FrameId: 2,
    },
    {
      Roll1: 2,
      Roll2: 3,
      IsSpare: false,
      IsStrike: false,
      IsScored: true,
      FinalFrameScore: 47,
      FrameId: 4,
    },
    {
      Roll1: 6,
      Roll2: 4,
      IsSpare: true,
      IsStrike: false,
      IsScored: true,
      FinalFrameScore: 66,
      FrameId: 5,
    },
    {
      Roll1: 9,
      Roll2: 0,
      IsSpare: false,
      IsStrike: false,
      IsScored: true,
      FinalFrameScore: 75,
      FrameId: 6,
    },
    {
      Roll1: 1,
      Roll2: 9,
      IsSpare: true,
      IsStrike: false,
      IsScored: true,
      FinalFrameScore: 95,
      FrameId: 7,
    },
    {
      Roll1: 7,
      Roll2: 2,
      IsSpare: false,
      IsStrike: false,
      IsScored: true,
      FinalFrameScore: 42,
      FrameId: 3,
    },
    {
      Roll1: 5,
      Roll2: 5,
      IsSpare: true,
      IsStrike: false,
      IsScored: true,
      FinalFrameScore: 16,
      FrameId: 1,
    },
    {
      Roll1: 10,
      Roll2: {},
      IsSpare: false,
      IsStrike: true,
      IsScored: true,
      FinalFrameScore: 125,
      FrameId: 8,
    },
    {
      Roll1: 10,
      Roll2: {},
      IsSpare: false,
      IsStrike: true,
      IsScored: true,
      FinalFrameScore: 155,
      FrameId: 9,
    },
    {
      Roll1: 10,
      Roll2: 10,
      IsSpare: false,
      IsStrike: true,
      IsScored: true,
      FinalFrameScore: 185,
      FrameId: 10,
      Roll3: 10,
    },
  ];

  FramesArr.forEach((f) => {
    if (f.FrameId >= 1 && f.FrameId < 10) {
      const e = f as Frame;
      mockGameFrames.set(e.FrameId, e);
    } else if (f.FrameId === 10) {
      const e = f as Frame10;
      mockGameFrames.set(e.FrameId, e);
    }
  });
};

const setUp = (withMockData: boolean = false) => {
  let gameFrames;

  if (withMockData) {
    fillMockGameFrames();
    gameFrames = mockGameFrames;
  } else {
    gameFrames = new Map<frameIds, Frame | Frame10>();
  }

  const TotalScore = withMockData ? 185 : 0;

  const component = shallow(ScoreBoard({ gameFrames, TotalScore }));

  return component;
};

describe("ScoreBoard Render", () => {
  it("should render 10 scoreboard frame heads", () => {
    const component = setUp();

    for (let i = 1; i <= 10; i++) {
      const head = `head${i}`;

      const wrapper = findByTestAttrubute(component, head);

      expect(wrapper.length).toEqual(1);
      expect(wrapper.text()).toEqual(`Frame ${i}`);
    }
  });

  it("should render 9 scoreboard Frames with 2 empty columns", () => {
    const component = setUp();

    for (let i = 1; i < 10; i++) {
      const frameRoll1 = `ss${i}0`;
      const frameRoll2 = `ss${i}1`;

      const wrapperRoll1 = findByTestAttrubute(component, frameRoll1);
      const wrapperRoll2 = findByTestAttrubute(component, frameRoll2);

      expect(wrapperRoll1.length).toEqual(1);
      expect(wrapperRoll1.text()).toEqual("");
      expect(wrapperRoll2.length).toEqual(1);
      expect(wrapperRoll2.text()).toEqual("");
    }
  });

  it("should render 10th frame with 3 columns", () => {
    const component = setUp();

    const wrapperRoll1 = findByTestAttrubute(component, "ss100");
    const wrapperRoll2 = findByTestAttrubute(component, "ss101");
    const wrapperRoll3 = findByTestAttrubute(component, "ss102");

    expect(wrapperRoll1.length).toEqual(1);
    expect(wrapperRoll2.length).toEqual(1);
    expect(wrapperRoll3.length).toEqual(1);
  });

  it("should render Total score as 0 for newGame", () => {
    const component = setUp();

    const wrapper = findByTestAttrubute(component, "TotalScore");

    expect(wrapper.length).toEqual(1);
    expect(wrapper.text()).toEqual("0");
  });
});

describe("Should render correct scores", () => {
  const component = setUp(true);

  for (var i = 1; i <= 10; i++) {
    const frameId = i as frameIds;

    it("should render correct score for frame " + i, () => {
      let currentFrame = {} as Frame | Frame10;

      if (frameId === 10) {
        currentFrame = mockGameFrames.get(frameId) as Frame10;
      } else {
        currentFrame = mockGameFrames.get(frameId) as Frame;
      }

      const frameRoll1 = `ss${frameId}0`;
      const frameRoll2 = `ss${frameId}1`;

      const frameRoll3 = `ss${frameId}2`;

      const frameTotal = `frameScore${frameId}`;

      const wrapperRoll1 = findByTestAttrubute(component, frameRoll1);
      const wrapperRoll2 = findByTestAttrubute(component, frameRoll2);
      const wrapperRoll3 =
        frameId === 10 ? findByTestAttrubute(component, frameRoll3) : null;

      const wrapperTotal = findByTestAttrubute(component, frameTotal);

      let roll1ExpectVal = currentFrame.Roll1.toString();
      let roll2ExpectVal = currentFrame.Roll2.toString();

      let roll3ExpectVal = "";

      if (frameId !== 10) {
        if (currentFrame.IsSpare) {
          roll2ExpectVal = "/";
        } else if (currentFrame.IsStrike) {
          roll1ExpectVal = "";
          roll2ExpectVal = "X";
        }
      } else {
        // For 10th frame
        const frame10 = currentFrame as Frame10;

        if (currentFrame.Roll1 === 10) {
          roll1ExpectVal = "X";
        }
        if (currentFrame.Roll2 === 10) {
          roll2ExpectVal = "X";
        }
        if (frame10.Roll3 === 10) {
          roll3ExpectVal = "X";
        } else if (frame10.IsStrike && frame10.Roll2 + frame10.Roll3 === 10) {
          roll3ExpectVal = "/";
        } else {
          roll3ExpectVal = frame10.Roll3.toString();
        }
      }

      expect(wrapperRoll1.text()).toEqual(roll1ExpectVal);
      expect(wrapperRoll2.text()).toEqual(roll2ExpectVal);

      expect(wrapperRoll3?.text()).toEqual(
        frameId === 10 ? roll3ExpectVal : undefined
      );

      expect(wrapperTotal.text()).toEqual(
        currentFrame.FinalFrameScore.toString()
      );
    });
  }

  it("should render Total score Correctly", () => {
    const wrapper = findByTestAttrubute(component, "TotalScore");

    const lastFrameScore = mockGameFrames.get(10)?.FinalFrameScore;

    expect(wrapper.text()).toEqual(lastFrameScore?.toString());
  });
});
