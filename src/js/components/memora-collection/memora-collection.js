import { htmlTemplate } from "./memora-collection.html.js"
import { cssTemplate } from "./memora-collection.css.js"

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

customElements.define(
  "memora-collection",
  /**
   * Custom element for creating a new collection and adding flashcards
   */
  class extends HTMLElement {
    #collectionName = ""
    #collectionId = null
    #cards = []
    #collectionAPI = `${API_BASE_URL}/api/v1/collections`
    #flashcardsAPI = `${API_BASE_URL}/api/v1/flashcards`
    #token = null

    #abortController = new AbortController()

    // DOM elements
    #creationView
    #flashcardsView
    #collectionNameInput
    #errorMessage
    #flashcardErrorMessage
    #questionInput
    #answerInput
    #cardsList
    #noCardsMessage
    #descriptionInput
    #collectionNameDisplay
    #browseBtnn

    /**
     * Creates an instance of MemoraCollection and attaches shadow DOM
     */
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
    }

    /**
     * List of observed attributes
     */
    static get observedAttributes() {
      return ["token"]
    }

    /**
     * Called when observed attributes change
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "token" && newValue != oldValue) {
        this.#token = newValue
      }
    }

    /**
     * Called when element is connected to the DOM
     */
    connectedCallback() {
      // Create a new abort controller when connected
      this.#abortController = new AbortController()
      const signal = this.#abortController.signal

      // Cache DOM elements
      this.#creationView = this.shadowRoot.querySelector(
        ".memora-creation-view"
      )
      this.#flashcardsView = this.shadowRoot.querySelector(
        ".memora-flashcards-view"
      )
      this.#collectionNameInput =
        this.shadowRoot.querySelector("#collection-name")
      this.#errorMessage = this.shadowRoot.querySelector(
        ".memora-error-message"
      )
      this.#questionInput = this.shadowRoot.querySelector("#flashcard-question")
      this.#answerInput = this.shadowRoot.querySelector("#flashcard-answer")
      this.#cardsList = this.shadowRoot.querySelector(".memora-cards-list")
      this.#noCardsMessage = this.shadowRoot.querySelector(
        ".memora-no-cards-message"
      )
      this.#descriptionInput = this.shadowRoot.querySelector(
        "#collection-description"
      )
      this.#browseBtnn = this.shadowRoot.querySelector(".memora-browse-button")

      // Find flashcard error message if present
      const errorMessages = this.shadowRoot.querySelectorAll(
        ".memora-error-message"
      )
      if (errorMessages.length > 1) {
        this.#flashcardErrorMessage = errorMessages[1] // Second error message element
      }

      // Setup event listeners
      this.#setupEventListeners(signal)

      // Focus on collection name input
      this.#collectionNameInput.focus()
    }

    /**
     * Sets up all event listeners for the component
     */
    #setupEventListeners(signal) {
      // Collection creation step
      const createBtn = this.shadowRoot.querySelector(".memora-button-create")
      createBtn.addEventListener("click", () => this.#createCollection(), {
        signal,
      })

      const cancelBtn = this.shadowRoot.querySelector(".memora-button-cancel")
      cancelBtn.addEventListener("click", () => this.#cancel(), { signal })

      this.#collectionNameDisplay = this.shadowRoot.querySelector(
        ".memora-collection-name-display"
      )

      this.#browseBtnn.addEventListener(
        "click",
        () => this.dispatchEvent(new CustomEvent("browse-public-collections")),
        { signal }
      )

      // Allow Enter key to submit collection name
      this.#collectionNameInput.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Enter") {
            this.#createCollection()
          }
        },
        { signal }
      )

      // Flashcard creation step
      const addCardBtn = this.shadowRoot.querySelector(
        ".memora-button-add-card"
      )
      addCardBtn.addEventListener("click", () => this.#addFlashcard(), {
        signal,
      })

      const finishBtn = this.shadowRoot.querySelector(".memora-button-finish")
      finishBtn.addEventListener(
        "click",
        () => this.dispatchEvent(new CustomEvent("collection-done")),
        { signal }
      )

      // Success step
      const doneBtn = this.shadowRoot.querySelector(".memora-button-finish")
      doneBtn.addEventListener(
        "click",
        () => this.dispatchEvent(new CustomEvent("collection-done")),
        { signal }
      )

      // Cards list event delegation for remove buttons
      this.#cardsList.addEventListener(
        "click",
        (event) => {
          if (event.target.closest(".memora-remove-card")) {
            const card = event.target.closest(".memora-card-item")
            const index = Array.from(this.#cardsList.children).indexOf(card)
            if (index !== -1) {
              this.#removeFlashcard(index)
            }
          }
        },
        { signal }
      )

      // Allow Enter with Ctrl/Cmd to submit flashcard
      this.#answerInput.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            this.#addFlashcard()
          }
        },
        { signal }
      )
    }
    /**
     * Creates a new collection with the entered name
     */
    async #createCollection() {
      const collectionName = this.#collectionNameInput.value.trim()
      const collectionDescription = this.#descriptionInput.value.trim()

      // Validate input
      if (!collectionName) {
        this.#errorMessage.textContent = "Please enter a collection name"
        this.#errorMessage.style.display = "block"
        this.#collectionNameInput.focus()
        return
      }

      // Reset error message
      this.#hideError()

      try {
        // Make API request to create collection
        const response = await fetch(this.#collectionAPI, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.#token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: collectionName,
            description: collectionDescription,
          }),
          signal: this.#abortController.signal,
        })

        if (response.status === 201) {
          // Collection created successfully
          const collection = await response.json()

          // Store collection data for this component
          this.#collectionId = collection.id
          this.#collectionName = collectionName

          // Update the collection name display for the flashcard step
          if (this.#collectionNameDisplay) {
            this.#collectionNameDisplay.textContent = collection.name
          }

          // Dispatch event with the collection data
          this.dispatchEvent(
            new CustomEvent("collection-created", {
              detail: collection,
            })
          )

          // Move to flashcard creation step
          this.#showFlashcardStep()
        } else {
          // Handle error
          const error = await response.json()
          this.#showError(
            error.message || "Failed to create collection. Please try again."
          )
        }
      } catch (error) {
        // Only show error if it's not an abort error
        if (error.name !== "AbortError") {
          this.#showError(
            "An error occurred. Please check your connection and try again."
          )
        }
      }
    }

    /**
     * Shows an error message in the creation view
     */
    #showError(message) {
      if (this.#errorMessage) {
        this.#errorMessage.textContent = message
        this.#errorMessage.style.display = "flex"
      }
    }

    /**
     * Hides the error message in the creation view
     */
    #hideError() {
      if (this.#errorMessage) {
        this.#errorMessage.style.display = "none"
      }
    }

    /**
     * Shows an error message in the flashcard view
     */
    #showFlashcardError(message) {
      if (this.#flashcardErrorMessage) {
        this.#flashcardErrorMessage.textContent = message
        this.#flashcardErrorMessage.style.display = "flex"
      }
    }

    /**
     * Hides the error message in the flashcard view
     */
    #hideFlashcardError() {
      if (this.#flashcardErrorMessage) {
        this.#flashcardErrorMessage.style.display = "none"
      }
    }

    /**
     * Shows the flashcard creation step
     */
    #showFlashcardStep() {
      // Hide collection step
      this.#creationView.style.display = "none"

      // Show flashcard step
      this.#flashcardsView.style.display = "block"

      // Focus on question input
      this.#questionInput.focus()
    }

    /**
     * Adds a flashcard to the collection
     */
    async #addFlashcard() {
      const question = this.#questionInput.value.trim()
      const answer = this.#answerInput.value.trim()

      // Validate inputs
      if (!question || !answer) {
        this.#showFlashcardError("Please enter both question and answer")
        if (!question) this.#questionInput.focus()
        else this.#answerInput.focus()
        return
      }

      // Hide error if it exists
      this.#hideFlashcardError()

      try {
        // Make API request to create flashcard
        const response = await fetch(this.#flashcardsAPI, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.#token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            answer: answer,
            collectionId: this.#collectionId,
          }),
          signal: this.#abortController.signal,
        })

        if (!response.ok) {
          this.#showFlashcardError(
            "Failed to create flashcard. Please try again."
          )
          return
        }

        // Get the created flashcard data
        const flashcardData = await response.json()

        // Add to cards array with the ID from the API
        this.#cards.push({
          id: flashcardData.id,
          question: question,
          answer: answer,
        })

        // Update the UI
        this.#renderCards()

        // Clear inputs
        this.#questionInput.value = ""
        this.#answerInput.value = ""
        this.#questionInput.focus()
      } catch (error) {
        // Only show error if it's not an abort error
        if (error.name !== "AbortError") {
          this.#showFlashcardError(
            "An error occurred. Please check your connection and try again."
          )
        }
      }
    }

    /**
     * Removes a flashcard at the specified index
     */
    async #removeFlashcard(index) {
      if (index >= 0 && index < this.#cards.length) {
        const flashcard = this.#cards[index]

        try {
          // Make API request to delete flashcard
          const response = await fetch(
            `${this.#flashcardsAPI}/${flashcard.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${this.#token}`,
                "Content-Type": "application/json",
              },
              signal: this.#abortController.signal,
            }
          )

          if (!response.ok) {
            this.#showFlashcardError(
              "Failed to delete flashcard. Please try again."
            )
            return
          }

          // Remove from local array if API call was successful
          this.#cards.splice(index, 1)
          this.#renderCards()
        } catch (error) {
          // Only show error if it's not an abort error
          if (error.name !== "AbortError") {
            this.#showFlashcardError(
              "An error occurred while deleting the flashcard."
            )
          }
        }
      }
    }

    /**
     * Renders the current list of cards
     */
    #renderCards() {
      // Clear existing cards
      this.#cardsList.textContent = ""

      // Update no cards message visibility
      if (this.#cards.length === 0) {
        this.#noCardsMessage.style.display = "block"
      } else {
        this.#noCardsMessage.style.display = "none"
      }

      // Render each card
      this.#cards.forEach((card, index) => {
        const cardItem = document.createElement("li")
        cardItem.className = "memora-card-item"

        const questionDiv = document.createElement("div")
        questionDiv.className = "memora-card-question"
        questionDiv.textContent = `Q: ${card.question}`

        const answerDiv = document.createElement("div")
        answerDiv.className = "memora-card-answer"
        answerDiv.textContent = `A: ${card.answer}`

        const removeButton = document.createElement("button")
        removeButton.className = "memora-remove-card"
        removeButton.innerHTML = "×"
        removeButton.title = "Remove card"

        cardItem.appendChild(questionDiv)
        cardItem.appendChild(answerDiv)
        cardItem.appendChild(removeButton)

        this.#cardsList.appendChild(cardItem)
      })
    }

    /**
     * Cancels the collection creation
     */
    #cancel() {
      const event = new CustomEvent("collection-cancelled")

      this.dispatchEvent(event)

      this.remove()
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {
      // Abort any in-progress requests and remove event listeners
      this.#abortController.abort()
    }
  }
)
