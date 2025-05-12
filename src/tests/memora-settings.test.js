// tests/memora-settings.test.js
import { describe, test, expect, beforeEach, vi } from "vitest"
import "../js/components/memora-settings"

describe("memora-settings tests", () => {
  // Set up before each test
  beforeEach(() => {
    // Mock fetch to return success
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    )

    // Mock confirm to always return true
    global.confirm = vi.fn(() => true)

    // Create our component for testing
    document.body.innerHTML =
      '<memora-settings token="test-token" collection-id="123" collection-name="Test Collection"></memora-settings>'
  })

  // Test saving collection settings
  test("saving collection name & description", () => {
    const component = document.querySelector("memora-settings")

    // Fill in the form
    component.shadowRoot.querySelector("#collection-name").value = "New Name"
    component.shadowRoot.querySelector("#collection-description").value =
      "New Description"

    // Click save button
    component.shadowRoot.querySelector(".memora-button-save").click()

    // Check fetch was called correctly
    expect(fetch).toHaveBeenCalledWith("/api/v1/collections/123", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer test-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Name",
        description: "New Description",
      }),
    })
  })

  // Test adding a flashcard
  test("adding a flashcard", () => {
    const component = document.querySelector("memora-settings")

    // Go to add card view
    component.shadowRoot.querySelector(".memora-button-add-new-card").click()

    // Fill in the form
    component.shadowRoot.querySelector("#flashcard-question").value =
      "What is testing?"
    component.shadowRoot.querySelector("#flashcard-answer").value =
      "Verifying code works"

    // Click add button
    component.shadowRoot.querySelector(".memora-button-add-card").click()

    // Check fetch was called correctly
    expect(fetch).toHaveBeenCalledWith("/api/v1/flashcards", {
      method: "POST",
      headers: {
        Authorization: "Bearer test-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "What is testing?",
        answer: "Verifying code works",
        collectionId: "123",
      }),
    })
  })

  // Test deleting a collection
  test("deleting a collection", () => {
    const component = document.querySelector("memora-settings")

    // Click delete button
    component.shadowRoot.querySelector(".memora-button-delete").click()

    // Check fetch was called correctly
    expect(fetch).toHaveBeenCalledWith("/api/v1/collections/123", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer test-token",
        "Content-Type": "application/json",
      },
    })
  })
})
