import Login from "@/src/app/auth/login/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<Login />", () => {
  beforeEach(() => {
    render(<Login />);
  });
  it("<Login /> is in the document", () => {
    const login = screen.getByTestId("login");
    expect(login).toBeInTheDocument();
  });
});
