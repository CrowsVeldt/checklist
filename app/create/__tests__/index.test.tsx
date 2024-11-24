import { render } from "@testing-library/react-native";
import CreateChecklist from "..";

describe("<CreateChecklist />", () => {
  test("Index renders correctly", () => {
    const tree = render(<CreateChecklist />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});