import { htmlTemplate } from "./memora-review.html.js"
import { cssTemplate } from "./memora-review.css.js"

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

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
    #bookmarkedCards = []
    #randomMode = false
    #seenCards = []

    #flashcardView
    #collectionName
    #collectionMeta
    #flashcardQuestion
    #flashcardAnswer
    #answerContainer
    #prevButton
    #nextButton
    #revealButton
    #randomButton
    #bookmarkButton
    #summaryButton
    #summaryView
    #backButton
    #bookmarkedList
    #bookmarkedCount

    #collectionURL = `${API_BASE_URL}/api/v1/flashcards/collections`

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

      this.#randomButton = this.shadowRoot.querySelector(
        ".memora-corner-button.random"
      )
      this.#bookmarkButton = this.shadowRoot.querySelector(
        ".memora-corner-button.bookmark"
      )
      this.#summaryButton = this.shadowRoot.querySelector(
        ".memora-corner-button.summary"
      )
      this.#summaryView = this.shadowRoot.querySelector(".memora-summary-view")
      this.#backButton = this.shadowRoot.querySelector(".memora-back-button")
      this.#bookmarkedList = this.shadowRoot.querySelector(
        ".memora-bookmarked-list"
      )
      this.#bookmarkedCount = this.shadowRoot.querySelector(
        ".memora-bookmarked-count"
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

      if (this.#randomButton) {
        this.#randomButton.addEventListener(
          "click",
          () => this.#toggleRandomMode(),
          { signal }
        )
      }

      if (this.#bookmarkButton) {
        this.#bookmarkButton.addEventListener(
          "click",
          () => this.#toggleBookmark(),
          { signal }
        )
      }

      if (this.#summaryButton) {
        this.#summaryButton.addEventListener(
          "click",
          () => this.#showSummaryView(),
          { signal }
        )
      }

      if (this.#backButton) {
        this.#backButton.addEventListener(
          "click",
          (event) => this.#hideSummaryView(event),
          { signal }
        )
      }
    }

    /**
     * Toggles random mode on/off
     */
    #toggleRandomMode() {
      if (!this.#collection || !this.#collection.flashcards?.length) {
        return
      }

      this.#randomMode = !this.#randomMode

      if (this.#randomMode) {
        // Activate random mode - add the active class to show it's on
        this.#randomButton.classList.add("active")

        // Add current card to seen cards if not already there
        if (!this.#seenCards.includes(this.#currentCardIndex)) {
          this.#seenCards.push(this.#currentCardIndex)
        }

        // Check if all cards have been seen
        if (this.#seenCards.length === this.#collection.flashcards.length) {
          // All cards seen, disable next button
          if (this.#nextButton) {
            this.#nextButton.disabled = true
          }
        } else {
          // Not all cards seen, enable next button
          if (this.#nextButton) {
            this.#nextButton.disabled = false
          }
        }
      } else {
        // Deactivate random mode - remove the active class
        this.#randomButton.classList.remove("active")

        // Reset next button state based on current position
        if (this.#nextButton) {
          this.#nextButton.disabled =
            this.#currentCardIndex === this.#collection.flashcards.length - 1
        }
      }
    }

    /**
     * Finds the next unseen card in random mode
     * @returns {number} The index of the next unseen card, or -1 if all cards have been seen
     */
    #findNextRandomCard() {
      const totalCards = this.#collection.flashcards.length

      // If all cards have been seen, return -1
      if (this.#seenCards.length >= totalCards) {
        return -1
      }

      // Pick random indices until we find one that hasn't been seen
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * totalCards)
      } while (this.#seenCards.includes(randomIndex))

      return randomIndex
    }

    /**
     * Toggles bookmark for current card
     */
    #toggleBookmark() {
      if (!this.#collection || !this.#collection.flashcards?.length) {
        return
      }

      const cardIndex = this.#currentCardIndex

      // Check if card is already bookmarked
      const bookmarkIndex = this.#bookmarkedCards.indexOf(cardIndex)

      if (bookmarkIndex === -1) {
        // Add to bookmarks
        this.#bookmarkedCards.push(cardIndex)
        this.#bookmarkButton.classList.add("active")
      } else {
        // Remove from bookmarks
        this.#bookmarkedCards.splice(bookmarkIndex, 1)
        this.#bookmarkButton.classList.remove("active")
      }
    }

    /**
     * Shows the summary view
     */
    #showSummaryView() {
      if (this.#flashcardView && this.#summaryView) {
        this.#flashcardView.classList.add("hidden")
        this.#summaryView.classList.add("active")

        // Render bookmarked cards
        this.#renderBookmarkedCards()
      }
    }

    /**
     * Hides the summary view
     */
    #hideSummaryView(event) {
      // Prevent default behavior if it's an event
      if (event) {
        event.preventDefault()
      }

      if (this.#flashcardView && this.#summaryView) {
        this.#flashcardView.classList.remove("hidden")
        this.#summaryView.classList.remove("active")
      }
    }

    /**
     * Renders bookmarked cards in the summary view
     */
    #renderBookmarkedCards() {
      if (!this.#bookmarkedList) return

      // Clear existing cards
      while (this.#bookmarkedList.firstChild) {
        this.#bookmarkedList.removeChild(this.#bookmarkedList.firstChild)
      }

      // Update the bookmarked count
      if (this.#bookmarkedCount) {
        this.#bookmarkedCount.textContent = this.#bookmarkedCards.length
      }

      // If no bookmarked cards, show empty message
      if (this.#bookmarkedCards.length === 0) {
        const emptyMessage = document.createElement("div")
        emptyMessage.className = "memora-empty-bookmarks"
        emptyMessage.textContent = "No bookmarked flashcards yet"
        this.#bookmarkedList.appendChild(emptyMessage)
        return
      }

      // Add each bookmarked card to the list
      this.#bookmarkedCards.forEach((index) => {
        if (index >= 0 && index < this.#collection.flashcards.length) {
          const card = this.#collection.flashcards[index]

          // Create card element
          const cardElement = document.createElement("div")
          cardElement.className = "memora-bookmarked-card"

          // Create question element
          const questionElement = document.createElement("div")
          questionElement.className = "memora-bookmarked-question"
          questionElement.textContent = card.question

          // Create answer element
          const answerElement = document.createElement("div")
          answerElement.className = "memora-bookmarked-answer"
          answerElement.textContent = card.answer

          // Add to card
          cardElement.appendChild(questionElement)
          cardElement.appendChild(answerElement)

          // Add to list
          this.#bookmarkedList.appendChild(cardElement)
        }
      })
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
      // Check if collection exists and has flashcards
      if (!this.#collection || !this.#collection.flashcards?.length) {
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
        } of ${this.#collection.flashcards.length}`
      }

      // Reset answer state
      this.#isAnswerRevealed = false
      if (this.#answerContainer) {
        this.#answerContainer.classList.remove("revealed")
      }

      // Get current card
      const currentCard = this.#collection.flashcards[this.#currentCardIndex]

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
        if (this.#randomMode) {
          // In random mode, disable if all cards have been seen
          this.#nextButton.disabled =
            this.#seenCards.length >= this.#collection.flashcards.length
        } else {
          // In sequential mode, disable if at the end
          this.#nextButton.disabled =
            this.#currentCardIndex === this.#collection.flashcards.length - 1
        }
      }

      // Update bookmark button state
      if (this.#bookmarkButton) {
        if (this.#bookmarkedCards.includes(this.#currentCardIndex)) {
          this.#bookmarkButton.classList.add("active")
        } else {
          this.#bookmarkButton.classList.remove("active")
        }
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
     * Navigates between flashcards
     */
    #navigateCards(direction) {
      // Check if collection and flashcards exist
      if (!this.#collection?.flashcards?.length) {
        return
      }

      // Handle random mode for forward navigation
      if (this.#randomMode && direction > 0) {
        const nextRandomIndex = this.#findNextRandomCard()

        if (nextRandomIndex !== -1) {
          // Move to the next random card
          this.#currentCardIndex = nextRandomIndex

          // Add to seen cards
          this.#seenCards.push(nextRandomIndex)

          // Check if all cards have been seen
          if (this.#seenCards.length === this.#collection.flashcards.length) {
            // All cards seen, disable next button
            if (this.#nextButton) {
              this.#nextButton.disabled = true
            }
          }
        } else {
          // All cards seen, don't navigate
          return
        }
      } else {
        // Standard sequential navigation
        const newIndex = this.#currentCardIndex + direction

        // Check if within bounds
        if (newIndex < 0 || newIndex >= this.#collection.flashcards.length) {
          return
        }

        this.#currentCardIndex = newIndex

        // Add to seen cards if not already there
        if (!this.#seenCards.includes(newIndex)) {
          this.#seenCards.push(newIndex)
        }
      }

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

        this.#collection = await response.json()

        // Reset state
        this.#currentCardIndex = 0
        this.#randomMode = false
        this.#seenCards = []
        this.#bookmarkedCards = []

        // Reset UI state
        if (this.#randomButton) {
          this.#randomButton.classList.remove("active")
        }

        // Update the view
        if (this.#collection.flashcards.length > 0) {
          this.#updateFlashcardView()
        } else {
          this.#showEmptyState()
        }
      } catch (error) {
        // console.error("Error fetching flashcards:", error)

        // Show error state
        this.#showErrorState("Error loading flashcards")
      }
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
