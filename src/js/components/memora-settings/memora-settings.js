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
    #apiEndpoint = "http://localhost:8086/api/v1/collection"
    #token = null

    // DOM elements
    #collectionNameInput
    #descriptionInput
    #errorMessage
    #cardsList
    #noCardsMessage
    #questionInput
    #answerInput
    #generalSettingsView
    #addCardView

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
      return [
        "token",
        "collection-id",
        "collection-name",
        "collection-description",
      ]
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
      } else if (name === "collection-description" && newValue) {
        if (this.#descriptionInput) {
          this.#descriptionInput.value = newValue
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
      this.#generalSettingsView = this.shadowRoot.querySelector(
        ".memora-general-settings-view"
      )
      this.#addCardView = this.shadowRoot.querySelector(".memora-add-card-view")

      // Set initial values if attributes were set before connection
      if (this.#collectionName) {
        this.#collectionNameInput.value = this.#collectionName
      }

      // Setup event listeners
      this.#setupEventListeners()
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
      cancelBtn.addEventListener("click", () => this.#cancel())

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
     * Shows the Add Card view
     */
    #showAddCardView() {
      console.log("Showing add card view")
      this.#generalSettingsView.style.display = "none"
      this.#addCardView.style.display = "block"
      this.#questionInput.focus()
    }

    /**
     * Shows the General Settings view
     */
    #showGeneralSettingsView() {
      console.log("Showing general settings view")
      this.#addCardView.style.display = "none"
      this.#generalSettingsView.style.display = "block"
    }

    /**
     * Loads collection data from the API
     */
    async #loadCollection() {
      console.log("Loading collection data for ID:", this.#collectionId)
      this.#renderCards()
    }

    /**
     * Saves the collection settings
     */
    async #saveSettings() {
      const newName = this.#collectionNameInput.value.trim()
      const newDescription = this.#descriptionInput.value.trim()

      // Validate input
      //:TODO: Validate the text length
      if (!newName) {
        this.#errorMessage.textContent = "Please enter a collection name"
        this.#errorMessage.style.display = "block"
        this.#collectionNameInput.focus()
        return
      }

      console.log("Saving name and description:", {
        collectionId: this.#collectionId,
        name: newName,
        description: newDescription,
      })

      // Reset error message
      this.#errorMessage.style.display = "none"

      //:TODO: API request

      // Update component state
      //:TODO: Notify the parent component about the name change ang change it there as well
      this.#collectionName = newName
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

      console.log("Deleting collection:", this.#collectionId)
      //:TODO: API request here
    }

    /**
     * Cancels the settings changes
     */
    #cancel() {
      console.log("Cancelling settings changes")
      this.remove()
      //:TODO: Add the welcome screen and remove focus
    }

    /**
     * Adds a flashcard to the collection
     */
    #addFlashcard() {
      const question = this.#questionInput.value.trim()
      const answer = this.#answerInput.value.trim()

      //:TODO: Validate inputs length
      if (!question || !answer) {
        alert("Please enter both question and answer")
        if (!question) this.#questionInput.focus()
        else this.#answerInput.focus()
        return
      }

      console.log("Adding flashcard:", { question, answer })
      //:TODO: API request here

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
        console.log("Removing flashcard at index:", index)
        //:TODO: API request here

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
