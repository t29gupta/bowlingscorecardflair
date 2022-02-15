/* eslint-disable testing-library/await-async-query */
import { shallow } from "enzyme";
import { findByTestAttrubute } from "../../../testUtils";
import Frame, { Frame10, frameIds } from "../../Types/Frame";
import { TheGame } from "./TheGame";

const mockGameFrames = new Map<frameIds, Frame | Frame10>();

const setUp = (withMockData: boolean = false) => {
  let gameFrames;

  if (withMockData) {
    //fillMockGameFrames();
    gameFrames = mockGameFrames;
  } else {
    gameFrames = new Map<frameIds, Frame | Frame10>();
  }

  const TotalScore = withMockData ? 185 : 0;

  const component = shallow(TheGame());

  return component;
};

describe("Render all components correctlly", () => {
  it("Happy test", () => {
    expect(true).toBe(true);
  });
});
