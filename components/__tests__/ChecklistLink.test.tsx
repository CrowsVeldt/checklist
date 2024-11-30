import { render } from "@testing-library/react-native";
import ChecklistLink from "../ChecklistLink";
import { ChecklistType } from "@/utils/types";

const testList: ChecklistType = {
  id: "123abc",
  title: "default checklist",
  entries: [
    {
      id: "456def",
      status: false,
      title: "item 1",
      required: true,
      childOf: undefined,
      parentTo: undefined,
    },
    {
      id: "789ghi",
      status: false,
      title: "item 2",
      required: true,
      childOf: undefined,
      parentTo: undefined,
    },
  ],
};

describe("<ChecklistLink />", () => {
  test("ChecklistLink renders correctly", () => {
    const tree = render(<ChecklistLink list={testList} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
