import { render } from "@testing-library/react-native";
import Index from "..";

describe("<HomeScreen />", () => {
  test("Index renders correctly", () => {
    const tree = render(<Index />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
