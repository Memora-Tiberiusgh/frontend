import { htmlTemplate } from "./memora-review.html.js"
import { cssTemplate } from "./memora-review.css.js"

customElements.define(
  "memora-review",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #collection = null
    #currentCardIndex = 0
    #abortController = null

    #flashcardView
    #collectionName
    #collectionMeta
    #flashcardQuestion
    #flashcardAnswer
    #prevButton
    #nextButton

    #collectionURL = "http://localhost:8086/api/v1/collection"

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

      this.#abortController = new AbortController()
    }

    /**
     * Returns an array of attributes to be observed for changes.
     *
     * @returns {string[]} The list of attributes to be observed.
     */
    static get observedAttributes() {
      return ["collection-id", "token", "collection-name"]
    }

    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name The name of the attribute that changed.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (newValue !== oldValue) {
        if (name === "collection-id" && this.isConnected) {
          // When we get a collection ID, fetch the collection data
          const token = this.getAttribute("token")
          if (token) {
            this.#fetchCollectionCards(newValue, token)
          }
        }

        if (name === "collection-name" && this.isConnected) {
          // Update the collection name in the UI
          if (this.#collectionName) {
            this.#collectionName.textContent = newValue
          }
        }
      }
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
      // Cache DOM references
      this.#flashcardView = this.shadowRoot.querySelector(
        ".memora-flashcard-view"
      )
      this.#collectionName = this.shadowRoot.querySelector(
        ".memora-collection-name"
      )
      this.#collectionMeta = this.shadowRoot.querySelector(
        ".memora-collection-meta"
      )
      this.#flashcardQuestion = this.shadowRoot.querySelector(
        ".memora-flashcard-question"
      )
      this.#flashcardAnswer = this.shadowRoot.querySelector(
        ".memora-flashcard-answer"
      )
      this.#prevButton = this.shadowRoot.querySelector(
        ".memora-navigation-button.prev"
      )
      this.#nextButton = this.shadowRoot.querySelector(
        ".memora-navigation-button.next"
      )

      // Set up event listeners
      this.#setupEventListeners()

      // Check if we have collection ID and token attributes to start fetching
      const collectionId = this.getAttribute("collection-id")
      const token = this.getAttribute("token")

      if (collectionId && token) {
        this.#fetchCollectionCards(collectionId, token)
      }

      // If we have a collection name attribute, update the UI
      const collectionName = this.getAttribute("collection-name")
      if (collectionName && this.#collectionName) {
        this.#collectionName.textContent = collectionName
      }

      // Update view if collection data is already available
      if (this.#collection) {
        this.#updateFlashcardView()
      }
    }

    /**
     * Sets up all event listeners for the component
     */
    #setupEventListeners() {
      const signal = this.#abortController.signal

      if (this.#prevButton) {
        this.#prevButton.addEventListener(
          "click",
          () => this.#navigateCards(-1),
          { signal }
        )
      }

      if (this.#nextButton) {
        this.#nextButton.addEventListener("click", () =>
          this.#navigateCards(1)
        ),
          { signal }
      }
    }

    /**
     * Updates the flashcard view with the current collection and card
     */
    #updateFlashcardView() {
      if (!this.#collection) return

      // Update collection header
      this.#collectionName.textContent = this.#collection.name
      this.#collectionMeta.textContent = `Card ${
        this.#currentCardIndex + 1
      } of ${this.#collection.cards.length}`

      // Update flashcard content
      if (this.#collection.cards.length > 0) {
        const currentCard = this.#collection.cards[this.#currentCardIndex]
        this.#flashcardQuestion.textContent = currentCard.question
        this.#flashcardAnswer.textContent = currentCard.answer

        // Update navigation buttons
        this.#prevButton.disabled = this.#currentCardIndex === 0
        this.#nextButton.disabled =
          this.#currentCardIndex === this.#collection.cards.length - 1
      } else {
        // Handle empty collection
        this.#flashcardQuestion.textContent = "No flashcards in this collection"
        this.#flashcardAnswer.textContent = "Add cards to get started"
        this.#prevButton.disabled = true
        this.#nextButton.disabled = true
      }
    }

    /**
     * Navigates between cards
     */
    #navigateCards(direction) {
      if (!this.#collection) return

      // Calculate new index
      const newIndex = this.#currentCardIndex + direction

      // Check if within bounds
      if (newIndex >= 0 && newIndex < this.#collection.cards.length) {
        this.#currentCardIndex = newIndex
        this.#updateFlashcardView()
      }
    }

    /**
     * Fetches cards for a specific collection
     *
     * @param {string|number} collectionId - The ID of the collection to fetch
     * @param {string} token - The authentication token
     */
    async #fetchCollectionCards(collectionId, token) {
      try {
        // Show loading state (could add a loading spinner here)
        this.#flashcardQuestion.textContent = "Loading..."
        this.#flashcardAnswer.textContent = ""

        // Disable navigation buttons while loading
        if (this.#prevButton) this.#prevButton.disabled = true
        if (this.#nextButton) this.#nextButton.disabled = true

        // Fetch collection data
        const response = await fetch(`${this.#collectionURL}/${collectionId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        // Store the collection data
        this.#collection = data
        this.#currentCardIndex = 0

        // Update the view with the new data
        this.#updateFlashcardView()
      } catch (error) {
        // console.error("Error fetching collection cards:", error)

        // Show error state
        this.#flashcardQuestion.textContent = "Error loading flashcards"
        this.#flashcardAnswer.textContent = "Please try again"
      }
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {
      // Abort all event listeners at once
      if (this.#abortController) {
        this.#abortController.abort()
      }
    }
  }
)
