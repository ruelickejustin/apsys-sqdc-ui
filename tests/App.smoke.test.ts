import { render } from "@testing-library/svelte";
import App from "../src/App.svelte";

test("App renders without crashing", () => {
  const { container } = render(App);
  expect(container).toBeTruthy();
});
