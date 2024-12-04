import { render } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";
import { AppWrapper } from "@/testing/AppWrapper";

describe("Header Component", () => {
  it("should render the Header component correctly", () => {
    const { container } = render(<Header />, {
      wrapper: AppWrapper,
    });

    expect(container).toMatchSnapshot();
  });

  it("should render the Nav component", () => {
    const { getByRole } = render(<Header />, { wrapper: AppWrapper });

    // Check if the Nav component is rendered
    const nav = getByRole("navigation");
    expect(nav).toBeInTheDocument();

    // Snapshot test for the Nav component
    expect(nav).toMatchSnapshot();
  });
});
