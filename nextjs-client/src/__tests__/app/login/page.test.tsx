import "@testing-library/jest-dom";
import Login from "@/src/app/auth/login/page";
import { render, screen } from "@testing-library/react";

describe("<Login />", () => {
  beforeEach(() => {
    render(<Login />);
  });
  it("<Login /> is in the document", () => {
    const login = screen.getByTestId("login");
    expect(login).toBeInTheDocument();
  });
  it("'Login' header text is in the document", () => {});
  it("email input is in the document with expected type and placeholder attrs", () => {});
  it("password input is in the document with expected type and placeholder attrs", () => {});
  it("Register link is in the document with expected text content and href attr", () => {});
  it("Login btn is in the document and calls handleSubmit onClick", () => {});
  it("if email & password are correct, redirect('/view') is called", () => {});
  it("if email/password are incorrect, appropriate err message is shown and redirect is not called", () => {});
});
