import EditPassword from "@/app/main/editPassword"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("<EditPassword />", () => {
  beforeEach(() => {
    render(<EditPassword />)
  })
  it("<EditPassword /> is in the document", () => {
    const editPassword = screen.getByTestId("edit-password")
    expect(editPassword).toBeInTheDocument()
  })
})