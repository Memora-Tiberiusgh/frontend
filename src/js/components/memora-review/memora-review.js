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
    #isAnswerRevealed = false

    #flashcardView
    #collectionName
    #collectionMeta
    #flashcardQuestion
    #flashcardAnswer
    #answerContainer
    #prevButton
    #nextButton
    #revealButton

    #collectionURL = "http://localhost:8186/api/v1/flashcards/collection"

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
      this.#answerContainer = this.shadowRoot.querySelector(
        ".memora-flashcard-answer-container"
      )
      this.#prevButton = this.shadowRoot.querySelector(
        ".memora-navigation-button.prev"
      )
      this.#nextButton = this.shadowRoot.querySelector(
        ".memora-navigation-button.next"
      )
      this.#revealButton = this.shadowRoot.querySelector(
        ".memora-reveal-button"
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
        this.#nextButton.addEventListener(
          "click",
          () => this.#navigateCards(1),
          { signal }
        )
      }

      if (this.#revealButton) {
        this.#revealButton.addEventListener(
          "click",
          () => this.#toggleAnswer(),
          { signal }
        )
      }
    }

    /**
     * Toggles the visibility of the answer
     */
    #toggleAnswer() {
      if (!this.#flashcardAnswer || !this.#answerContainer) return

      this.#isAnswerRevealed = !this.#isAnswerRevealed

      if (this.#isAnswerRevealed) {
        // Show answer container
        this.#answerContainer.classList.add("revealed")
        this.#revealButton.textContent = "Hide Answer"

        // Show the answer text after a tiny delay to ensure it's hidden during transition
        setTimeout(() => {
          if (this.#flashcardAnswer) {
            this.#flashcardAnswer.style.display = "block"

            // Ensure long text is properly formatted
            const answerText = this.#flashcardAnswer.textContent
            if (answerText && answerText.length > 30) {
              // Ensure text is properly wrapped
              this.#flashcardAnswer.style.wordBreak = "break-word"
              this.#flashcardAnswer.style.overflowWrap = "break-word"
            }
          }
        }, 10)
      } else {
        // Hide answer container
        this.#answerContainer.classList.remove("revealed")
        this.#revealButton.textContent = "Reveal Answer"

        // Hide the answer text immediately
        if (this.#flashcardAnswer) {
          this.#flashcardAnswer.style.display = "none"
        }
      }
    }

    /**
     * Updates the flashcard view with the current collection and card
     */
    #updateFlashcardView() {
      // Check if collection exists and has cards
      if (!this.#collection || !this.#collection.cards?.length) {
        this.#showEmptyState()
        return
      }

      // Update collection title from attribute
      const collectionName =
        this.getAttribute("collection-name") || "Flashcards"

      if (this.#collectionName) {
        this.#collectionName.textContent = collectionName
      }

      // Update card count
      if (this.#collectionMeta) {
        this.#collectionMeta.textContent = `Card ${
          this.#currentCardIndex + 1
        } of ${this.#collection.cards.length}`
      }

      // Reset answer state
      this.#isAnswerRevealed = false
      if (this.#answerContainer) {
        this.#answerContainer.classList.remove("revealed")
      }

      // Get current card
      const currentCard = this.#collection.cards[this.#currentCardIndex]

      // Immediately update question but delay answer update until after transition
      if (this.#flashcardQuestion) {
        this.#flashcardQuestion.textContent = currentCard.question
        // Ensure question text is properly formatted for long words
        this.#flashcardQuestion.style.wordBreak = "break-word"
        this.#flashcardQuestion.style.overflowWrap = "break-word"
        this.#flashcardQuestion.style.hyphens = "auto"
      }

      // Hide answer immediately while transitioning cards
      if (this.#flashcardAnswer) {
        this.#flashcardAnswer.style.display = "none"
      }

      // Update answer text only after a slight delay
      setTimeout(() => {
        if (this.#flashcardAnswer) {
          // Now update the answer text when safely hidden
          this.#flashcardAnswer.textContent = currentCard.answer
          // Ensure answer text is properly formatted for long words
          this.#flashcardAnswer.style.wordBreak = "break-word"
          this.#flashcardAnswer.style.overflowWrap = "break-word"
          this.#flashcardAnswer.style.hyphens = "auto"
        }
      }, 300) // Match the CSS transition duration

      // Update reveal button
      if (this.#revealButton) {
        this.#revealButton.textContent = "Reveal Answer"
        this.#revealButton.disabled = false
      }

      // Update navigation buttons
      if (this.#prevButton) {
        this.#prevButton.disabled = this.#currentCardIndex === 0
      }

      if (this.#nextButton) {
        this.#nextButton.disabled =
          this.#currentCardIndex === this.#collection.cards.length - 1
      }

      // Apply transitions for smooth animation
      setTimeout(() => {
        const flashcard = this.shadowRoot.querySelector(".memora-flashcard")
        if (flashcard) {
          flashcard.style.opacity = "1"
        }
      }, 50)
    }

    /**
     * Shows an empty state when no cards are found
     */
    #showEmptyState() {
      if (this.#flashcardQuestion) {
        this.#flashcardQuestion.textContent = "No flashcards in this collection"
      }

      if (this.#flashcardAnswer) {
        this.#flashcardAnswer.textContent = "Add cards to get started"
      }

      // Hide reveal button for empty collections
      if (this.#revealButton) {
        this.#revealButton.disabled = true
      }

      // Disable navigation buttons
      if (this.#prevButton) {
        this.#prevButton.disabled = true
      }

      if (this.#nextButton) {
        this.#nextButton.disabled = true
      }

      // Update collection meta
      if (this.#collectionMeta) {
        this.#collectionMeta.textContent = "No cards available"
      }
    }

    /**
     * Shows an error state with a message
     */
    #showErrorState(message = "Error loading flashcards") {
      if (this.#flashcardQuestion) {
        this.#flashcardQuestion.textContent = message
      }

      if (this.#flashcardAnswer) {
        this.#flashcardAnswer.textContent = "Please try again"
      }

      if (this.#collectionMeta) {
        this.#collectionMeta.textContent = "Error"
      }

      // Hide/disable buttons
      if (this.#revealButton) {
        this.#revealButton.disabled = true
      }

      if (this.#prevButton) {
        this.#prevButton.disabled = true
      }

      if (this.#nextButton) {
        this.#nextButton.disabled = true
      }
    }

    /**
     * Navigates between cards
     */
    #navigateCards(direction) {
      // Check if collection and cards exist
      if (!this.#collection?.cards?.length) {
        return
      }

      // Calculate new index
      const newIndex = this.#currentCardIndex + direction

      // Check if within bounds
      if (newIndex >= 0 && newIndex < this.#collection.cards.length) {
        this.#currentCardIndex = newIndex

        // Always hide the answer when navigating to a new card
        this.#isAnswerRevealed = false
        if (this.#answerContainer) {
          this.#answerContainer.classList.remove("revealed")
        }
        if (this.#revealButton) {
          this.#revealButton.textContent = "Reveal Answer"
        }

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
        // Show loading state
        if (this.#flashcardQuestion) {
          this.#flashcardQuestion.textContent = "Loading..."
        }

        if (this.#flashcardAnswer) {
          this.#flashcardAnswer.textContent = "Please wait"
        }

        // Hide buttons during loading
        if (this.#revealButton) {
          this.#revealButton.disabled = true
        }

        if (this.#prevButton) {
          this.#prevButton.disabled = true
        }

        if (this.#nextButton) {
          this.#nextButton.disabled = true
        }

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

        // Process the flashcards data structure based on the API response
        this.#collection = {
          cards: data.flashcards || [],
        }

        // Reset to first card
        this.#currentCardIndex = 0

        // Update the view
        if (this.#collection.cards.length > 0) {
          this.#updateFlashcardView()
        } else {
          this.#showEmptyState()
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error)

        // Show error state
        this.#showErrorState("Error loading flashcards")
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
