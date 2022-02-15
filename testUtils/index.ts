import { ShallowWrapper, ReactWrapper } from "enzyme";
import { ReactElement } from "react";

export const findByTestAttrubute = <P>(
  component:
    | ShallowWrapper<ReactElement<P>, any>
    | ReactWrapper<ReactElement<P>, any>,
  attr: string
) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
