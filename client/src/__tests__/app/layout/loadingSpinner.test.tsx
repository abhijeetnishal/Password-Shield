import LoadingSpinner from "@/src/components/Loaders/LoadingSpinner";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<LoadingSpinner />", () => {
  beforeEach(() => {
    render(<LoadingSpinner />);
  });
  it("<LoadingSpinner /> is in the document", () => {
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });
  it("'Loading...' text is in the document", () => {
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner.textContent).toMatch("Loading...");
  });
});
