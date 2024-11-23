import { render } from "@testing-library/react-native";
import ListEntryInput from "../ListEntryInput";

describe("<ListEntryInput />", () => {
  test("ListEntryInput renders correctly", () => {
    const tree = render(<ListEntryInput />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
