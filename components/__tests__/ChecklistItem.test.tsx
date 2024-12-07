import { render } from "@testing-library/react-native";
import ChecklistItem from "../ChecklistItem";

describe("<ChecklistItem />", () => {
  test("ChecklistItem renders correctly", () => {
    const tree = render(
      <ChecklistItem
        id="123abc"
        title="title"
        required={false}
        setFinished={() => undefined}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
