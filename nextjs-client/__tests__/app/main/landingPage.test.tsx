import LandingPage from "@/app/main/landingPage"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("<LandingPage />", () => {
  beforeEach(() => {
    render(<LandingPage />)
  })
  it("<LandingPage /> is in the document", () => {
    const landingPage = screen.getByTestId("landing-page")
    expect(landingPage).toBeInTheDocument()
  })
  it("Hero section text is in the document", () => {
    const heroSection = screen.getByTestId("hero-section")
    expect(heroSection.textContent).toMatch("Transparent & Secured")
    expect(heroSection.textContent).toMatch("Only you can see your personal data. All your password within a reach so you don't have to crack your head to remember them.")
  })
  it("Get started link has expected text and href", () => {
    const getStartedLink = screen.getByTestId("get-started-link")
    expect(getStartedLink).toBeInTheDocument()
    expect(getStartedLink.textContent).toMatch("Get Started")
    expect(getStartedLink).toHaveAttribute("href", "/register")
  })
  it("More info section text is in the document", () => {
    const moreInfo = screen.getByTestId("more-info-section")
    expect(moreInfo.textContent).toMatch("All password within a reach")
    expect(moreInfo.textContent).toMatch("All your password within a reach so you don't have to crack your head to remember them.")

    expect(moreInfo.textContent).toMatch("Easy & Convenient")
    expect(moreInfo.textContent).toMatch("Save all your password at one place within minutes.")

  })
})