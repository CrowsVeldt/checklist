import { render } from "@testing-library/react-native";
import TitleInput from "../TitleInput";

describe("<TitleInput />", () => {
  test("TitleInput renders correctly", () => {
    const tree = render(
      <TitleInput title="title" setTitle={() => {}} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
