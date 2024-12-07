import { render } from "@testing-library/react-native";
import AddButton from "../NewListButton";

describe("<AddButton />", () => {
  test("AddButton renders correctly", () => {
    const tree = render(<AddButton />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
