import Navbar from "@/src/components/Navbar/Navbar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<Header />", () => {
  beforeEach(() => {
    render(<Navbar landingPage={false} />);
  });
  it("header is in the document", () => {
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });
});

// describe("<Header /> not logged in", () => {
//   it("if not logged in no-auth-navbar is in the document", () => {});
//   it("if not logged in, Login btn is in the document with expected text and href", () => {});
//   it("if not logged in, Key Sage link is in the document with expected text and href", () => {});
// });

// describe("<Header /> logged in", () => {
//   it("if logged in, Key Sage link is in the document with expected text and href", () => {});
//   it("if logged in, user-info-login is in the document", () => {});
//   it("if logged in, user img is in the document", () => {});
//   it("if logged in, user name is in the document", () => {});
//   it("logout() posts expected data", () => {});
//   it("logout() removes 'myCookie'", () => {});
//   it("logout() clears localStorage", () => {});
//   it("logout() redirects to '/'", () => {});
// });
