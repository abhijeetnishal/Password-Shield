import ErrorPage from "@/app/error"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("<Error />", () => {
  beforeEach(() => {
    render(<ErrorPage />)
  })
  it("error-page is in the document", () => {
    const errPage = screen.getByTestId("error-page")
    expect(errPage).toBeInTheDocument()
  })
  //it("home link is in the document with expected href", () => {})
  //it("helpful text is in the document", () => {})
})