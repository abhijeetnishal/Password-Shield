import Footer from "@/app/layout/footer"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("<Footer />", () => {
  beforeEach(() => {
    render(<Footer />)
  })
  it("<Footer /> is in the document", () => {
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument()
  })
  it("github-link is in the document with expected href, id and img", () => {
    const githubLink = screen.getByTestId("github-link")
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute("id", "github-link")

    const githubImg = screen.getByAltText("github link")
    expect(githubImg).toBeInTheDocument()
  })
  it("linkedin-link is in the document with expected href, id and img", () => {
    const linkedinLink = screen.getByTestId("linkedin-link")
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute("id", "linkedin-link")

    const linkedinImg = screen.getByAltText("linkedin link")
    expect(linkedinImg).toBeInTheDocument()
  })
})