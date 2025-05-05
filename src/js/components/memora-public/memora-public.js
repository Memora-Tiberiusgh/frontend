import { htmlTemplate } from "./memora-public.html.js"
import { cssTemplate } from "./memora-public.css.js"

customElements.define(
  "memora-public",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #abortController = new AbortController()
    #collections = []
    #selectedCollection = null
    #token

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

      // Views
      this.gridView = this.shadowRoot.querySelector(".memora-grid-view")
      this.detailView = this.shadowRoot.querySelector(".memora-detail-view")

      // Grid elements
      this.collectionsGrid = this.shadowRoot.querySelector(
        ".memora-collections-grid"
      )
      this.loadMoreButton = this.shadowRoot.querySelector(
        ".memora-button-load-more"
      )

      // Detail elements
      this.importButton = this.shadowRoot.querySelector(".memora-import-button")

      this.viewAllButton = this.shadowRoot.querySelector(
        ".memora-view-all-button"
      )
      this.detailTitle = this.shadowRoot.querySelector(".memora-detail-title")
      this.descriptionText = this.shadowRoot.querySelector(
        ".memora-description-text"
      )
      this.cardsCount = this.shadowRoot.querySelector(".memora-cards-count")
      this.createdDate = this.shadowRoot.querySelector(".memora-created-date")
      this.creatorName = this.shadowRoot.querySelector(".memora-creator-name")
      this.allCardsCount = this.shadowRoot.querySelector(
        ".memora-all-cards-count"
      )
      this.previewCardsContainer = this.shadowRoot.querySelector(
        ".memora-preview-cards"
      )
      this.backButton = this.shadowRoot.querySelector(".memora-back-button")

      // Templates
      this.collectionCardTemplate = this.shadowRoot.querySelector(
        "#collection-card-template"
      )
      this.previewCardTemplate = this.shadowRoot.querySelector(
        "#preview-card-template"
      )
    }

    /**
     * Returns an array of attributes to be observed for changes.
     *
     * @returns {string[]} The list of attributes to be observed.
     */
    static get observedAttributes() {
      return ["token"]
    }

    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name The name of the attribute that changed.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "token" && newValue !== oldValue) {
        this.#token = newValue
        // Optionally refetch data when token changes
        if (this.isConnected) {
          this.#fetchCollections()
        }
      }
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
      const signal = this.#abortController.signal

      // Add event listeners
      this.loadMoreButton.addEventListener(
        "click",
        () => this.#loadMoreCollections(),
        { signal }
      )
      this.backButton.addEventListener("click", () => this.#goBackToGrid(), {
        signal,
      })

      this.importButton.addEventListener(
        "click",
        () => this.#importCollection(),
        { signal }
      )
      this.viewAllButton.addEventListener("click", () => this.#viewAllCards(), {
        signal,
      })

      // Fetch initial collections
      this.#fetchCollections()
    }

    /**
     * Fetch collections from the backend
     */
    async #fetchCollections() {
      if (!this.#token) return

      this.#setLoadingState(true)

      try {
        // For demonstration purposes - use mock data
        setTimeout(() => {
          this.#collections = [
            {
              id: "1",
              name: "JavaScript Fundamentals",
              description:
                "Core concepts and syntax of JavaScript programming language including variables, functions, objects, arrays, control flow statements, and more advanced topics like closures, promises, and async/await.",
              cardCount: 42,
              ownerName: "CodeMaster",
              createdAt: "2025-03-15T14:30:00Z",
              previewCards: [
                {
                  question: "What is JavaScript?",
                  answer:
                    "JavaScript is a scripting language that enables interactive web pages and is an essential part of web applications.",
                },
                {
                  question: "What is a variable?",
                  answer:
                    "A variable is a container for storing data values in programming.",
                },
                {
                  question: "Explain closures in JavaScript",
                  answer:
                    "A closure is a function that has access to its own scope, the outer function's scope, and the global scope.",
                },
              ],
            },
            {
              id: "2",
              name: "Web Development Glossary",
              description: "Essential terms for modern web development",
              cardCount: 78,
              ownerName: "DevDesigner",
              createdAt: "2025-03-08T09:15:00Z",
              previewCards: [
                {
                  question: "What is DOM?",
                  answer:
                    "The Document Object Model (DOM) is a programming interface for web documents.",
                },
                {
                  question: "What is AJAX?",
                  answer:
                    "Asynchronous JavaScript and XML (AJAX) is a technique for creating fast and dynamic web pages.",
                },
              ],
            },
            // Add more collections from the React example
          ]

          this.#renderCollectionsGrid()
          this.#setLoadingState(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching collections:", error)
        this.#setLoadingState(false)
      }
    }

    /**
     * Load more collections
     */
    async #loadMoreCollections() {
      if (!this.#token) return

      this.#setLoadingState(true)

      try {
        // TODO: Replace with actual API call to get more collections
        // const lastId = this.#collections[this.#collections.length - 1]?.id;
        // const response = await fetch(`/api/collections/public?after=${lastId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${this.#token}`
        //   }
        // });
        // if (response.ok) {
        //   const data = await response.json();
        //   this.#collections = [...this.#collections, ...data];
        //   this.#renderCollectionsGrid();
        // }

        // For demonstration purposes - replace with actual data
        setTimeout(() => {
          // Update the grid with new items
          this.#renderCollectionsGrid()
          this.#setLoadingState(false)
        }, 500)
      } catch (error) {
        console.error("Error loading more collections:", error)
        this.#setLoadingState(false)
      }
    }

    /**
     * Fetch a single collection with its preview cards
     */
    async #fetchCollectionDetail(collectionId) {
      if (!this.#token) return

      this.#setLoadingState(true)

      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/collections/${collectionId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${this.#token}`
        //   }
        // });
        // if (response.ok) {
        //   this.#selectedCollection = await response.json();
        //   this.#renderCollectionDetail();
        // }

        // For demonstration purposes - replace with actual data
        setTimeout(() => {
          // Find the collection from the existing collections
          this.#selectedCollection = this.#collections.find(
            (c) => c.id === collectionId
          )
          this.#renderCollectionDetail()
          this.#setLoadingState(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching collection details:", error)
        this.#setLoadingState(false)
      }
    }

    /**
     * Import the selected collection
     */
    async #importCollection() {
      if (!this.#token || !this.#selectedCollection) return

      // Disable import button
      this.importButton.disabled = true
      this.importButton.textContent = "Importing..."

      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/collections/import/${this.#selectedCollection.id}`, {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${this.#token}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // if (response.ok) {
        //   // Success - show notification or message
        // }

        // For demonstration purposes
        setTimeout(() => {
          alert(`Collection imported successfully!`)

          // Dispatch event for parent components
          this.dispatchEvent(
            new CustomEvent("collection-imported", {
              detail: { collectionId: this.#selectedCollection.id },
            })
          )

          // Go back to the grid
          this.#goBackToGrid()

          // Reset button state
          this.importButton.disabled = false
          this.importButton.textContent = "Import Collection"
        }, 500)
      } catch (error) {
        console.error("Error importing collection:", error)
        this.importButton.disabled = false
        this.importButton.textContent = "Import Collection"
      }
    }

    /**
     * View all cards in the collection
     */
    #viewAllCards() {
      if (!this.#selectedCollection) return

      // TODO: Implement view all cards functionality
      // This could navigate to a different route or open a modal
      alert(`This would show all cards in the collection`)
    }

    /**
     * Go back to the collections grid
     */
    #goBackToGrid() {
      this.#selectedCollection = null
      this.gridView.style.display = "block"
      this.detailView.style.display = "none"
    }

    /**
     * Set loading state for the component
     */
    #setLoadingState(isLoading) {
      if (isLoading) {
        this.loadMoreButton.disabled = true
        this.loadMoreButton.textContent = "Loading..."
      } else {
        this.loadMoreButton.disabled = false
        this.loadMoreButton.textContent = "Load More Collections"
      }
    }

    /**
     * Format date to a readable string
     */
    #formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    /**
     * Render the collections grid
     */
    #renderCollectionsGrid() {
      // Clear existing grid
      while (this.collectionsGrid.firstChild) {
        this.collectionsGrid.removeChild(this.collectionsGrid.firstChild)
      }

      // Create cards for each collection
      this.#collections.forEach((collection) => {
        const card = this.#createCollectionCard(collection)
        this.collectionsGrid.appendChild(card)
      })

      // Show grid view, hide detail view
      this.gridView.style.display = "block"
      this.detailView.style.display = "none"
    }

    /**
     * Create a collection card element
     */
    #createCollectionCard(collection) {
      const card = this.collectionCardTemplate.content.cloneNode(true)

      // Set card content without innerHTML
      const cardElement = card.querySelector(".memora-collection-card")
      const cardTitle = card.querySelector(".memora-card-title")
      const cardCount = card.querySelector(".memora-card-count")
      const cardDescription = card.querySelector(".memora-card-description")
      const ownerName = card.querySelector(".memora-owner-name")
      const creationDate = card.querySelector(".memora-creation-date")

      // Set text content
      cardTitle.textContent = collection.name
      cardCount.textContent = collection.cardCount
      cardDescription.textContent = collection.description
      ownerName.textContent = collection.ownerName
      creationDate.textContent = this.#formatDate(collection.createdAt)

      // Store ID in data attribute
      cardElement.dataset.id = collection.id

      // Add click event listener
      const signal = this.#abortController.signal
      cardElement.addEventListener(
        "click",
        (event) => {
          const id = event.currentTarget.dataset.id
          this.#fetchCollectionDetail(id)
        },
        { signal }
      )

      return card
    }

    /**
     * Render the collection detail view
     */
    #renderCollectionDetail() {
      if (!this.#selectedCollection) return

      const collection = this.#selectedCollection

      // Set detail content without innerHTML
      this.detailTitle.textContent = collection.name
      this.descriptionText.textContent = collection.description
      this.cardsCount.textContent = collection.cardCount
      this.createdDate.textContent = this.#formatDate(collection.createdAt)
      this.creatorName.textContent = collection.ownerName
      this.allCardsCount.textContent = collection.cardCount

      // Render preview cards
      this.#renderPreviewCards(collection.previewCards)

      // Show detail view, hide grid view
      this.gridView.style.display = "none"
      this.detailView.style.display = "block"
    }

    /**
     * Render preview cards
     */
    #renderPreviewCards(previewCards) {
      // Clear existing cards
      while (this.previewCardsContainer.firstChild) {
        this.previewCardsContainer.removeChild(
          this.previewCardsContainer.firstChild
        )
      }

      // Handle empty preview cards
      if (!previewCards || previewCards.length === 0) {
        const emptyMessage = document.createElement("p")
        emptyMessage.className = "memora-no-cards-message"
        emptyMessage.textContent =
          "No preview cards available for this collection."
        this.previewCardsContainer.appendChild(emptyMessage)
        return
      }

      // Create and append cards
      previewCards.forEach((card) => {
        const cardElement = this.previewCardTemplate.content.cloneNode(true)

        // Get references to elements
        const questionElement = cardElement.querySelector(
          ".memora-preview-question"
        )
        const questionText = cardElement.querySelector(".memora-question-text")
        const answerText = cardElement.querySelector(".memora-answer-text")
        const answerElement = cardElement.querySelector(
          ".memora-preview-answer"
        )
        const toggleButton = cardElement.querySelector(".memora-toggle-button")

        // Set text content
        questionText.textContent = card.question
        answerText.textContent = card.answer

        // Create toggle icon
        const toggleIcon = document.createElement("span")
        toggleIcon.className = "memora-toggle-icon"
        toggleIcon.textContent = "↓"

        // Clear and append toggle icon
        while (toggleButton.firstChild) {
          toggleButton.removeChild(toggleButton.firstChild)
        }
        toggleButton.appendChild(toggleIcon)

        // Add click event listener using signal
        const signal = this.#abortController.signal
        questionElement.addEventListener(
          "click",
          () => {
            if (answerElement.style.display === "none") {
              answerElement.style.display = "block"
              toggleIcon.textContent = "↑"
            } else {
              answerElement.style.display = "none"
              toggleIcon.textContent = "↓"
            }
          },
          { signal }
        )

        this.previewCardsContainer.appendChild(cardElement)
      })
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
