import ErrorPage from "@/app/error";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<Error />", () => {
  beforeEach(() => {
    render(<ErrorPage />);
  });
  it("not-found-page is in the document", () => {
    const notFoundPage = screen.getByTestId("not-found-page");
    expect(notFoundPage).toBeInTheDocument();
  });
});
