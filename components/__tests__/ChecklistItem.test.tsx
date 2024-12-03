import { render } from "@testing-library/react-native";
import ChecklistItem from "../ChecklistEntryItem";

describe("<ChecklistItem />", () => {
  test("ChecklistItem renders correctly", () => {
    const tree = render(<ChecklistItem title="title" required={false}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
