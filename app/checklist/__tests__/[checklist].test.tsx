import { render } from "@testing-library/react-native";
import Checklist from "../[checklist]";
import AppProvider from "@/context/AppContext";

describe("<Checklist />", () => {
  test("Checklist renders correctly", () => {
    const tree = render(
      <AppProvider>
        <Checklist />
      </AppProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
