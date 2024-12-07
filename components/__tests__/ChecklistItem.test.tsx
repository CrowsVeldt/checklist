import { render } from "@testing-library/react-native";
import ChecklistItem from "../ChecklistItem";

describe("<ChecklistItem />", () => {
  test("ChecklistItem renders correctly", () => {
    const id: string = "abc123";
    const setFinished = (id: string) => undefined;
    const tree = render(
      <ChecklistItem
        id={id}
        title="title"
        required={false}
        setFinished={setFinished}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
