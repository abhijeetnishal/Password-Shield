import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "@/src/app/layout";

const mockProps = {
  children: <div data-testid="mock-children" />,
};

describe("<Layout />", () => {
  beforeEach(() => {
    render(<RootLayout {...mockProps} />);
  });
  it("{children} is in the document", () => {
    const children = screen.getByTestId("mock-children");
    expect(children).toBeInTheDocument();
  });
});
