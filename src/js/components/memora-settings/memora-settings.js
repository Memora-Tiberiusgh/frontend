import { htmlTemplate } from "./memora-settings.html.js"
import { cssTemplate } from "./memora-settings.css.js"

customElements.define(
  "memora-settings",
  /**
   * Custom element for managing collection settings
   */
  class extends HTMLElement {
    #collectionName = ""
    #collectionId = null
    #cards = []
    #flashcardsAPI = "http://localhost:8086/api/v1/flashcards"
    #collectionAPI = "http://localhost:8086/api/v1/collection"
    #token = null
    #currentEditingCardIndex = null

    // DOM elements
    #collectionNameInput
    #dbDescription
    #descriptionInput
    #errorMessage
    #cardsList
    #noCardsMessage
    #questionInput
    #answerInput
    #generalSettingsView
    #addCardView
    #editQuestionInput
    #editAnswerInput
    #editCardView

    /**
     * Creates an instance of MemoraSettings and attaches shadow DOM
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
      return ["token", "collection-id", "collection-name"]
    }

    /**
     * Called when observed attributes change
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "token" && newValue) {
        this.#token = newValue
      } else if (name === "collection-id" && newValue) {
        this.#collectionId = newValue
        this.#loadCollection()
      } else if (name === "collection-name" && newValue) {
        this.#collectionName = newValue
        if (this.#collectionNameInput) {
          this.#collectionNameInput.value = newValue
        }
      }
    }

    /**
     * Called when element is connected to the DOM
     */
    connectedCallback() {
      // Cache DOM elements
      this.#collectionNameInput =
        this.shadowRoot.querySelector("#collection-name")
      this.#descriptionInput = this.shadowRoot.querySelector(
        "#collection-description"
      )
      this.#errorMessage = this.shadowRoot.querySelector(
        ".memora-error-message"
      )
      this.#cardsList = this.shadowRoot.querySelector(".memora-cards-list")
      this.#noCardsMessage = this.shadowRoot.querySelector(
        ".memora-no-cards-message"
      )
      this.#questionInput = this.shadowRoot.querySelector("#flashcard-question")
      this.#answerInput = this.shadowRoot.querySelector("#flashcard-answer")
      this.#editQuestionInput = this.shadowRoot.querySelector(
        "#edit-flashcard-question"
      )
      this.#editAnswerInput = this.shadowRoot.querySelector(
        "#edit-flashcard-answer"
      )

      this.#generalSettingsView = this.shadowRoot.querySelector(
        ".memora-general-settings-view"
      )
      this.#addCardView = this.shadowRoot.querySelector(".memora-add-card-view")
      this.#editCardView = this.shadowRoot.querySelector(
        ".memora-edit-card-view"
      )

      // Set initial values if attributes were set before connection
      if (this.#collectionName) {
        this.#collectionNameInput.value = this.#collectionName
      }

      this.#getDescription()

      // Setup event listeners
      this.#setupEventListeners()
    }

    async #getDescription() {
      try {
        // Fetch collection's description
        const response = await fetch(
          `${this.#collectionAPI}/${this.#collectionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.#token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          this.#showError(
            "The description could not be retrieved for some reason"
          )
        }

        const data = await response.json()
        this.#descriptionInput.textContent = data.description

        //:TODO: Implement feedback UI
      } catch (error) {
        // console.error(error)
      }
    }

    /**
     * Sets up all event listeners for the component
     */
    #setupEventListeners() {
      // Save button
      const saveBtn = this.shadowRoot.querySelector(".memora-button-save")
      saveBtn.addEventListener("click", () => this.#saveSettings())

      // Delete button
      const deleteBtn = this.shadowRoot.querySelector(".memora-button-delete")
      deleteBtn.addEventListener("click", () => this.#deleteCollection())

      // Cancel button
      const cancelBtn = this.shadowRoot.querySelector(".memora-button-cancel")
      cancelBtn.addEventListener("click", () => this.#removeSettings())

      // Add New Card button (show add card view)
      const addNewCardBtn = this.shadowRoot.querySelector(
        ".memora-button-add-new-card"
      )
      addNewCardBtn.addEventListener("click", () => this.#showAddCardView())

      // Back button (show general settings view)
      const backBtn = this.shadowRoot.querySelector(".memora-button-back")
      backBtn.addEventListener("click", () => this.#showGeneralSettingsView())

      // Add Card button (adds a new card)
      const addCardBtn = this.shadowRoot.querySelector(
        ".memora-button-add-card"
      )
      addCardBtn.addEventListener("click", () => this.#addFlashcard())

      // Back button from edit view
      const backFromEditBtn = this.shadowRoot.querySelector(
        ".memora-button-back-from-edit"
      )
      backFromEditBtn.addEventListener("click", () =>
        this.#showGeneralSettingsView()
      )

      // Save edited card button
      const saveCardBtn = this.shadowRoot.querySelector(
        ".memora-button-save-card"
      )
      saveCardBtn.addEventListener("click", () => this.#saveEditedFlashcard())

      // Cards list event delegation for remove buttons and card clicks
      this.#cardsList.addEventListener("click", (event) => {
        const card = event.target.closest(".memora-card-item")
        if (!card) return

        if (event.target.closest(".memora-remove-card")) {
          const index = Array.from(this.#cardsList.children).indexOf(card)
          if (index !== -1) {
            this.#removeFlashcard(index)
          }
        } else {
          // If the click wasn't on the remove button, it's a card edit
          const index = Array.from(this.#cardsList.children).indexOf(card)
          if (index !== -1) {
            this.#editFlashcard(index)
          }
        }
      })

      // Allow Enter with Ctrl/Cmd to submit flashcard
      this.#answerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
          this.#addFlashcard()
        }
      })

      // Allow Enter with Ctrl/Cmd to submit edited flashcard
      this.#editAnswerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
          this.#saveEditedFlashcard()
        }
      })
    }

    /**
     * Shows the Add Card view
     */
    #showAddCardView() {
      this.#hideError()
      this.#generalSettingsView.style.display = "none"
      this.#editCardView.style.display = "none"
      this.#addCardView.style.display = "block"
      this.#questionInput.focus()
    }

    /**
     * Shows the Edit Card view
     */
    #showEditCardView() {
      this.#hideError()
      this.#generalSettingsView.style.display = "none"
      this.#addCardView.style.display = "none"
      this.#editCardView.style.display = "block"
      this.#editQuestionInput.focus()
    }

    /**
     * Shows the General Settings view
     */
    #showGeneralSettingsView() {
      this.#hideError()
      this.#addCardView.style.display = "none"
      this.#editCardView.style.display = "none"
      this.#generalSettingsView.style.display = "block"
      this.#currentEditingCardIndex = null
    }

    /**
     * Shows an error message
     * @param {string} message - The error message to display
     */
    #showError(message) {
      // Get the currently visible view
      let currentView
      if (this.#generalSettingsView.style.display !== "none") {
        currentView = this.#generalSettingsView
      } else if (this.#addCardView.style.display !== "none") {
        currentView = this.#addCardView
      } else if (this.#editCardView.style.display !== "none") {
        currentView = this.#editCardView
      }

      // Find the error message element in the current view
      const errorElement = currentView.querySelector(".memora-error-message")

      if (errorElement) {
        errorElement.textContent = message
        errorElement.style.display = "block"
      }
    }

    /**
     * Hides all error messages
     */
    #hideError() {
      // Hide all error messages in all views
      const errorElements = this.shadowRoot.querySelectorAll(
        ".memora-error-message"
      )
      errorElements.forEach((el) => {
        el.style.display = "none"
      })
    }

    /**
     * Prepares the edit form for a flashcard
     */
    #editFlashcard(index) {
      if (index >= 0 && index < this.#cards.length) {
        const card = this.#cards[index]
        this.#currentEditingCardIndex = index

        // Set the form values
        this.#editQuestionInput.value = card.question
        this.#editAnswerInput.value = card.answer

        // Show edit view
        this.#showEditCardView()
      }
    }

    /**
     * Saves the edited flashcard
     */
    async #saveEditedFlashcard() {
      if (this.#currentEditingCardIndex === null) return

      const question = this.#editQuestionInput.value.trim()
      const answer = this.#editAnswerInput.value.trim()

      // Validate inputs
      if (!question || !answer) {
        this.#showError("Please enter both question and answer")
        if (!question) this.#editQuestionInput.focus()
        else this.#editAnswerInput.focus()
        return
      }
      this.#hideError()

      try {
        const flashcardId = this.#cards[this.#currentEditingCardIndex].id

        const response = await fetch(`${this.#flashcardsAPI}/${flashcardId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${this.#token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            answer: answer,
          }),
        })

        if (!response.ok) {
          this.#showError("Failed to update the flashcard")
          return
        }

        // Update the card in the local array
        this.#cards[this.#currentEditingCardIndex].question = question
        this.#cards[this.#currentEditingCardIndex].answer = answer

        // Re-render the cards
        this.#renderCards()

        // Go back to the general view
        this.#showGeneralSettingsView()
      } catch (error) {
        this.#showError("An error occurred while updating the flashcard")
      }
    }

    /**
     * Loads collection data from the API
     */
    async #loadCollection() {
      try {
        const response = await fetch(
          `${this.#flashcardsAPI}/collection/${this.#collectionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.#token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          this.#showError("Could not load flashcards")
          return
        }

        const responseData = await response.json()
        const flashcardsData = responseData.flashcards

        // Store complete flashcard objects including IDs
        this.#cards = flashcardsData.map((card) => ({
          id: card.id,
          question: card.question,
          answer: card.answer,
        }))
      } catch (error) {
        this.#showError("An error occurred while loading flashcards")
        this.#cards = []
      } finally {
        this.#renderCards()
      }
    }

    /**
     * Saves the collection settings
     */
    async #saveSettings() {
      try {
        const newName = this.#collectionNameInput.value.trim()
        const newDescription = this.#descriptionInput.value.trim()

        // Validate input
        //:TODO: Validate the text length
        if (!newName) {
          this.#showError("Please enter a collection name")
          this.#collectionNameInput.focus()
          return
        }
        this.#hideError()

        // Fetch collection data
        const response = await fetch(
          `${this.#collectionAPI}/${this.#collectionId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${this.#token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newName,
              description: newDescription,
            }),
          }
        )

        if (!response.ok) {
          this.#showError(
            "The name and/or the description could not be saved for some reason"
          )
        }

        this.#collectionName = newName
        this.#dbDescription = newDescription

        // Notify the parent component about the name change ang change it there as well
        const event = new CustomEvent("uppdate-name", {
          detail: this.#collectionName,
        })

        this.dispatchEvent(event)
      } catch (error) {
        this.#showError("An unexpected error occurred")
      }
    }

    /**
     * Deletes the collection
     */
    async #deleteCollection() {
      // Confirm deletion
      if (
        !confirm(
          `Are you sure you want to delete the collection "${
            this.#collectionName
          }"?`
        )
      ) {
        return
      }

      try {
        const response = await fetch(
          `${this.#collectionAPI}/${this.#collectionId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.#token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          this.#errorMessage.textContent =
            "The collection could not be deleted for some reason"
          this.#errorMessage.style.display = "block"
        }

        this.#removeSettings()
      } catch (error) {
        this.#showError("The collection could not be deleted for some reason")
        // console.error(error)
      }
    }

    /**
     * Cancels the settings changes
     */
    #removeSettings() {
      const event = new CustomEvent("settings-canceled")

      this.dispatchEvent(event)

      this.remove()
      //:TODO: Add the welcome screen and remove focus
    }

    /**
     * Adds a flashcard to the collection
     */
    async #addFlashcard() {
      const question = this.#questionInput.value.trim()
      const answer = this.#answerInput.value.trim()

      //:TODO: Validate inputs length
      if (!question || !answer) {
        this.#showError("Please enter both question and answer")
        if (!question) this.#questionInput.focus()
        else this.#answerInput.focus()
        return
      }

      this.#hideError()

      try {
        // Fetch collection data
        const response = await fetch(`${this.#flashcardsAPI}`, {
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
        })

        if (!response.ok) {
          //:TODO: Move the error to the add new card div
          this.#showError(
            "The question and answer could not be created for some reason"
          )
        } else {
          const flashcardData = await response.json()

          // Add to cards array
          this.#cards.push({ id: flashcardData.id, question, answer })

          // Update the UI
          this.#renderCards()

          // Clear inputs
          this.#questionInput.value = ""
          this.#answerInput.value = ""
          this.#questionInput.focus()
        }
      } catch (error) {
        this.#showError("The flashcard could not be created for some reason")
        // console.error(error)
      }
    }

    /**
     * Removes a flashcard at the specified index
     */
    async #removeFlashcard(index) {
      if (index >= 0 && index < this.#cards.length) {
        const flashcard = this.#cards[index]
        try {
          const response = await fetch(
            `${this.#flashcardsAPI}/${flashcard.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${this.#token}`,
                "Content-Type": "application/json",
              },
            }
          )

          if (!response.ok) {
            this.#showError("An error occurred while deleting the flashcard")
            return
          }

          // If successful, remove from local array
          this.#cards.splice(index, 1)
          this.#renderCards()
        } catch (error) {
          this.#showError("An error occurred while deleting the flashcard")
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
        removeButton.textContent = "×"
        removeButton.title = "Remove card"

        cardItem.appendChild(questionDiv)
        cardItem.appendChild(answerDiv)
        cardItem.appendChild(removeButton)

        this.#cardsList.appendChild(cardItem)
      })
    }
  }
)
