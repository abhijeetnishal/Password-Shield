import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RootLayout from "@/app/layout"

const mockProps = {
  children: <div data-testid="mock-children" />
}

describe("<Layout />", () => {
  beforeEach(() => {
    render(<RootLayout {...mockProps} />)
  })
  it("<Header /> is in the document", () => {
    const header = screen.getByTestId("header")
    expect(header).toBeInTheDocument()
  })
  it("<Footer /> is in the document", () => {
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument()
  })
  it("{children} is in the document", () => {
    const children = screen.getByTestId("mock-children")
    expect(children).toBeInTheDocument()
  })
})