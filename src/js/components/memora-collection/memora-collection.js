import { htmlTemplate } from "./memora-collection.html.js"
import { cssTemplate } from "./memora-collection.css.js"

customElements.define(
  "memora-collection",
  /**
   * Custom element for creating a new collection and adding flashcards
   */
  class extends HTMLElement {
    #collectionName = ""
    #collectionId = null
    #cards = []
    #apiEndpoint = "http://localhost:8086/api/v1/collection"
    #token = null

    // DOM elements
    #collectionStep
    #flashcardStep
    #successStep
    #collectionNameInput
    #errorMessage
    #questionInput
    #answerInput
    #cardsList
    #noCardsMessage
    #cardCount
    #descriptionInput

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
      if (name === "token" && newValue) {
        this.#token = newValue
      }
    }

    /**
     * Called when element is connected to the DOM
     */
    connectedCallback() {
      // Cache DOM elements
      this.#collectionStep = this.shadowRoot.querySelector(
        ".memora-step-collection"
      )
      this.#flashcardStep = this.shadowRoot.querySelector(
        ".memora-step-flashcards"
      )
      this.#successStep = this.shadowRoot.querySelector(".memora-step-success")
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
      this.#cardCount = this.shadowRoot.querySelector(".memora-card-count")
      this.#descriptionInput = this.shadowRoot.querySelector(
        "#collection-description"
      )

      // Setup event listeners
      this.#setupEventListeners()

      // Focus on collection name input
      this.#collectionNameInput.focus()
    }

    /**
     * Sets up all event listeners for the component
     */
    #setupEventListeners() {
      // Collection creation step
      const createBtn = this.shadowRoot.querySelector(".memora-button-create")
      createBtn.addEventListener("click", () => this.#createCollection())

      const cancelBtn = this.shadowRoot.querySelector(".memora-button-cancel")
      cancelBtn.addEventListener("click", () => this.#cancel())

      // Allow Enter key to submit collection name
      this.#collectionNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          this.#createCollection()
        }
      })

      // Flashcard creation step
      const addCardBtn = this.shadowRoot.querySelector(
        ".memora-button-add-card"
      )
      addCardBtn.addEventListener("click", () => this.#addFlashcard())

      const finishBtn = this.shadowRoot.querySelector(".memora-button-finish")
      finishBtn.addEventListener("click", () => this.#finishCollection())

      // Success step
      const doneBtn = this.shadowRoot.querySelector(".memora-button-done")
      doneBtn.addEventListener("click", () =>
        this.dispatchEvent(new CustomEvent("collection-done"))
      )

      // Cards list event delegation for remove buttons
      this.#cardsList.addEventListener("click", (event) => {
        if (event.target.closest(".memora-remove-card")) {
          const card = event.target.closest(".memora-card-item")
          const index = Array.from(this.#cardsList.children).indexOf(card)
          if (index !== -1) {
            this.#removeFlashcard(index)
          }
        }
      })

      // Allow Enter with Ctrl/Cmd to submit flashcard
      this.#answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
          this.#addFlashcard()
        }
      })
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
      this.#errorMessage.style.display = "none"

      try {
        // Make API request to create collection
        const response = await fetch(this.#apiEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.#token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: collectionName,
            description: collectionDescription,
          }),
        })

        if (response.status === 201) {
          // Collection created successfully
          const collection = await response.json()

          // Store collection data for this component
          this.#collectionId = collection.id
          this.#collectionName = collectionName

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
          this.#errorMessage.textContent =
            error.message || "Failed to create collection. Please try again."
          this.#errorMessage.style.display = "block"
        }
      } catch (error) {
        this.#errorMessage.textContent =
          "An error occurred. Please check your connection and try again."
        this.#errorMessage.style.display = "block"
      }
    }

    /**
     * Shows the flashcard creation step
     */
    #showFlashcardStep() {
      // Hide collection step
      this.#collectionStep.style.display = "none"

      // Show flashcard step
      this.#flashcardStep.style.display = "block"

      // Focus on question input
      this.#questionInput.focus()
    }

    /**
     * Adds a flashcard to the collection
     */
    #addFlashcard() {
      const question = this.#questionInput.value.trim()
      const answer = this.#answerInput.value.trim()

      // Validate inputs
      if (!question || !answer) {
        alert("Please enter both question and answer")
        if (!question) this.#questionInput.focus()
        else this.#answerInput.focus()
        return
      }

      // Add to cards array
      this.#cards.push({ question, answer })

      // Update the UI
      this.#renderCards()

      // Clear inputs
      this.#questionInput.value = ""
      this.#answerInput.value = ""
      this.#questionInput.focus()
    }

    /**
     * Removes a flashcard at the specified index
     */
    #removeFlashcard(index) {
      if (index >= 0 && index < this.#cards.length) {
        this.#cards.splice(index, 1)
        this.#renderCards()
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
     * Finishes collection creation and adds all flashcards
     */
    async #finishCollection() {
      if (this.#cards.length === 0) {
        // No cards added, show warning
        if (
          !confirm(
            "You haven't added any flashcards. Are you sure you want to finish?"
          )
        ) {
          return
        }
      }

      try {
        // Make API request to add flashcards to the collection
        const response = await fetch(
          `${this.#apiEndpoint}/${this.#collectionId}/cards`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.#token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cards: this.#cards,
            }),
          }
        )

        if (response.ok) {
          // Cards added successfully
          this.#showSuccessStep()
        } else {
          // Handle error
          const error = await response.json()
          throw new Error(error.message || "Failed to add flashcards")
        }
      } catch (error) {
        alert("An error occurred while adding flashcards. Please try again.")
      }
    }

    /**
     * Shows the success step
     */
    #showSuccessStep() {
      // Hide flashcard step
      this.#flashcardStep.style.display = "none"

      // Show success step
      this.#successStep.style.display = "block"

      // Update card count
      this.#cardCount.textContent = this.#cards.length
    }

    /**
     * Cancels the collection creation
     */
    #cancel() {
      const event = new CustomEvent("collection-cancelled", {
        bubbles: true,
        composed: true,
      })

      this.dispatchEvent(event)
    }
  }
)
