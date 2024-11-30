import { render } from "@testing-library/react-native";
import Index from "../index";
import AppProvider from "@/context/AppContext";

describe("<HomeScreen />", () => {
  test("Index renders correctly", () => {
    const tree = render(
      <AppProvider>
        <Index />
      </AppProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
