import { render } from "@testing-library/react-native";
import ChecklistItemInput from "../ChecklistItemInput";

describe("<ChecklistItemInput />", () => {
  test("ChecklistItemInput renders correctly", () => {
    const tree = render(
      <ChecklistItemInput
        id="abc"
        initialTitle="title"
        onEntryChange={() => true}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
