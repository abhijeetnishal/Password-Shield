import DeleteConfirmation from "@/src/components/Passwords/DeleteConfirmation";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<DeleteConfirmation />", () => {
  beforeEach(() => {
    render(
      <DeleteConfirmation item={{}} onClose={() => {}} onSubmit={() => {}} />
    );
  });
  it("<DeleteConfirmation /> is in the document", () => {
    const deleteConf = screen.getByTestId("delete-confirmation");
    expect(deleteConf).toBeInTheDocument();
  });
});
