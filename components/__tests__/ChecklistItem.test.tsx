import { render } from "@testing-library/react-native";
import ChecklistItem from "../ChecklistItem";

describe("<ChecklistItem />", () => {
  test("ChecklistItem renders correctly", () => {
    const id: string = "abc123";
    const tree = render(
      <ChecklistItem
        id={id}
        title="title"
        required={false}
        setFinished={(id) => undefined}
      />
    ).toJSON();

    // expect(tree).toMatchSnapshot();
  });
});
