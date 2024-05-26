import LoadingSpinner from "@/src/app/loading";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<Loading />", () => {
  beforeEach(() => {
    render(<LoadingSpinner />);
  });
  it("<Loading /> is in the document", () => {
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });
});
