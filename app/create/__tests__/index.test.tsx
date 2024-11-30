import { render } from "@testing-library/react-native";
import CreateChecklist from "../index";
import AppProvider from "@/context/AppContext";

describe("<CreateChecklist />", () => {
  test("Index renders correctly", () => {
    const tree = render(
      <AppProvider>
        <CreateChecklist />
      </AppProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
