import { render } from "@testing-library/react-native";
import ListEntryInput from "../ChecklistEntryInput";

describe("<ListEntryInput />", () => {
  test("ListEntryInput renders correctly", () => {
    const tree = render(
      <ListEntryInput
        id="abc"
        initialTitle="title"
        onEntryChange={() => true}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
