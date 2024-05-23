import LandingPage from "@/app/main/landingPage";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<HomePage />", () => {
  beforeEach(() => {
    render(<LandingPage />);
  });
  it("<LandingPage /> is in the document", () => {
    const landingPage = screen.getByTestId("landing-page");
    expect(landingPage).toBeInTheDocument();
  });
});
