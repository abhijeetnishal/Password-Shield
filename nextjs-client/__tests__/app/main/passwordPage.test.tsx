import PasswordPage from "@/app/view/page"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import "react-cookie"

jest.mock("react-cookie")

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ key: 'mockedData' }),
  })
) as jest.Mock

describe("<PasswordPage />", () => {
  beforeEach(() => {
    render(<PasswordPage />)
  })
  it("<PasswordPage /> is in the document", () => {
    const passwordPage = screen.getByTestId("password-page")
    expect(passwordPage).toBeInTheDocument()
  })
})