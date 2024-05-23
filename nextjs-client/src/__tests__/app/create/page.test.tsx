import CreatePassword from "@/src/app/create/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<CreatePassword />", () => {
  beforeEach(() => {
    render(<CreatePassword onClose={() => jest.fn()} />);
  });
  it("<CreatePassword /> is in the document", () => {
    const createPassword = screen.getByTestId("create-password");
    expect(createPassword).toBeInTheDocument();
  });

  it("redirects to '/login' if no cookies", () => {});
  it("calls onClose on click", () => {});
  it("'Add New' header is in the document", () => {});
  it("Website Name input is in the document with expected label, placeholder input type and name", () => {});
  it("Website Name input updates values onChange", () => {});
  it("Password input is in the document with expected label, placeholder input type and name", () => {});
  it("Password input updates values onChange", () => {});
  it("Cancel btn is in the document with expected text and calls onClose on click", () => {});
  it("on Save btn click, err message is shown if required fields are missing", () => {});
  it("on Save btn click, addFunc() is called and form is submitted", () => {});
});
