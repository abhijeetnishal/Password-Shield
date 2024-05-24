import DeleteConfirmation from "@/src/components/Passwords/deleteConfirmation";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<DeleteConfirmation />", () => {
  beforeEach(() => {
    render(<DeleteConfirmation />);
  });
  it("<DeleteConfirmation /> is in the document", () => {
    const deleteConf = screen.getByTestId("delete-confirmation");
    expect(deleteConf).toBeInTheDocument();
  });
});
