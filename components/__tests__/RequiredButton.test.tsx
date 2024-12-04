import { render } from "@testing-library/react-native";
import RequiredButton from "../RequiredButton";

describe("<RequiredButton />", () => {
  test("RequiredButton renders correctly", () => {
    const tree = render(
      <RequiredButton initialState={false} changeState={undefined} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
