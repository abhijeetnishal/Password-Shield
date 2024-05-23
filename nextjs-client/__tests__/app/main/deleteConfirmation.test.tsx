import DeleteConfirmation from "@/app/main/deleteConfirmation"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("<DeleteConfirmation />", () => {
  beforeEach(() => {
    render(<DeleteConfirmation />)
  })
  it("<DeleteConfirmation /> is in the document", () => {
    const deleteConf = screen.getByTestId("delete-confirmation")
    expect(deleteConf).toBeInTheDocument()
  })
})