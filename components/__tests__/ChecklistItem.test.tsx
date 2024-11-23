import { render } from "@testing-library/react-native";
import ChecklistItem from "../ChecklistItem";

describe("<ChecklistItem />", () => {
  test("ChecklistItem renders correctly", () => {
    const tree = render(<ChecklistItem />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
