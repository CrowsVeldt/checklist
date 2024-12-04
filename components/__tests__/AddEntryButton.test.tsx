import { render } from "@testing-library/react-native";
import AddEntryButton from "../AddEntryButton";

describe("<AddEntryButton />", () => {
  test("AddEntryButton renders correctly", () => {
    const tree = render(<AddEntryButton add={undefined} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
