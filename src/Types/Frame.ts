import { PinnsDownType } from "./PinnsDown";

export type frameId10 = 10;
export type frameId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type frameIds = frameId | frameId10;
type frameScore = number;

export class BaseFrame {
  Roll1: PinnsDownType = {} as PinnsDownType;
  Roll2: PinnsDownType = {} as PinnsDownType;

  IsSpare: boolean = false;
  IsStrike: boolean = false;
  IsScored: boolean = false;

  FinalFrameScore: frameScore = 0;
}

export default class Frame extends BaseFrame {
  constructor(frameId: frameId) {
    super();
    this.FrameId = frameId;
  }

  FrameId: frameId;
}

export class Frame10 extends BaseFrame {
  FrameId: frameId10 = 10;
  Roll3: PinnsDownType = {} as PinnsDownType;
}
