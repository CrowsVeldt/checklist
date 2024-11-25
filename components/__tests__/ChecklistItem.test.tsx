import { render } from "@testing-library/react-native";
import ChecklistItem from "../ChecklistEntry";

describe("<ChecklistItem />", () => {
  test("ChecklistItem renders correctly", () => {
    const tree = render(<ChecklistItem />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
