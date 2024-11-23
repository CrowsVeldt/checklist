import { render } from "@testing-library/react-native";
import Checklist from "../[checklist]";

describe("<HomeScreen />", () => {
  test("Checklist renders correctly", () => {
    const tree = render(<Checklist />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
