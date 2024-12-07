import { render } from "@testing-library/react-native";
import ListEntryInput from "../ChecklistEntryInput";

describe("<ListEntryInput />", () => {
  test("ListEntryInput renders correctly", () => {
    const tree = render(
      <ListEntryInput
        id="abc"
        initialTitle="title"
        initialRequired={false}
        onEntryChange={() => null}
        remove={() => null}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
