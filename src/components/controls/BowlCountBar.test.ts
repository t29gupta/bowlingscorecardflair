/* eslint-disable testing-library/await-async-query */
import { mount, ReactWrapper } from "enzyme";
import { ReactElement } from "react";
import { findByTestAttrubute } from "../../../testUtils";
import { BowlCountBar, ButtonProps } from "./BowlCountBar";

const setUp = (props: ButtonProps) => {
  const component = mount(BowlCountBar({ ...props }));

  return component;
};

describe("Render Score button correctly", () => {
  let component: ReactWrapper<ReactElement, any>;
  const mockonClick = jest.fn();

  beforeEach(() => {
    component = setUp({ GameOver: false, handleClick: mockonClick });
  });

  it("should render 11 buttons 1 for each number", () => {
    for (let i = 0; i <= 10; i++) {
      const data_test = `btn${i}`;

      const wrapper = findByTestAttrubute(component, data_test);

      expect(wrapper.length).toEqual(1);
      expect(wrapper.text()).toEqual(i.toString());
    }
  });
});
