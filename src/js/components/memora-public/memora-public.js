import { htmlTemplate } from "./memora-public.html.js"
import { cssTemplate } from "./memora-public.css.js"

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

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
    #publicCollectionURL = `${API_BASE_URL}/api/v1/collections/public`
    #toggleCollectionURL = `${API_BASE_URL}/api/v1/users//collections`

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
      this.noMoreCollections = this.shadowRoot.querySelector(
        ".memora-no-more-collections"
      )

      // Detail elements
      this.addButton = this.shadowRoot.querySelector(".memora-add-button")
      this.detailTitle = this.shadowRoot.querySelector(".memora-detail-title")
      this.detailTitleContainer = this.shadowRoot.querySelector(
        ".memora-detail-title-container"
      )
      this.descriptionText = this.shadowRoot.querySelector(
        ".memora-description-text"
      )
      this.cardsCount = this.shadowRoot.querySelector(".memora-cards-count")
      this.createdDate = this.shadowRoot.querySelector(".memora-created-date")
      this.creatorName = this.shadowRoot.querySelector(".memora-creator-name")
      this.previewCards = this.shadowRoot.querySelectorAll(
        ".memora-preview-card"
      )
      this.backButton = this.shadowRoot.querySelector(".memora-back-button")

      // Templates
      this.collectionCardTemplate = this.shadowRoot.querySelector(
        "#collection-card-template"
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
      this.backButton.addEventListener("click", () => this.#goBackToGrid(), {
        signal,
      })

      this.addButton.addEventListener(
        "click",
        () => this.#addToMyCollection(),
        {
          signal,
        }
      )

      // Add toggle functionality to all hardcoded preview cards
      this.previewCards.forEach((card) => {
        const questionElement = card.querySelector(".memora-preview-question")
        const answerElement = card.querySelector(".memora-preview-answer")
        const toggleIcon = card.querySelector(".memora-toggle-icon")

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
      })

      // Fetch initial collections
      this.#fetchCollections()
    }

    /**
     * Fetch collections from the backend
     */
    async #fetchCollections() {
      if (!this.#token) return

      try {
        const response = await fetch(this.#publicCollectionURL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.#token}`,
            "Content-type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("API error: " + response.status)
        }

        const collections = await response.json()
        this.#collections = collections

        // Render the collections
        this.#renderCollectionsGrid()

        // Show "No more collections" indicator if there are collections
        // This can be controlled by your infinite scroll logic later
        if (collections.length > 0) {
          this.noMoreCollections.style.display = "block"
        } else {
          this.noMoreCollections.style.display = "none"
        }
      } catch (error) {
        // console.error("Error fetching collections:", error)
      }
    }

    /**
     * Add the selected collection to my collection
     */
    async #addToMyCollection() {
      if (!this.#token || !this.#selectedCollection) return

      // Don't proceed if collection is already added
      if (this.#selectedCollection.isAddedByUser) {
        return
      }

      // Disable import button
      this.addButton.disabled = true
      this.addButton.textContent = "Adding..."

      try {
        const response = await fetch(
          `${this.#toggleCollectionURL}/${this.#selectedCollection._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${this.#token}`,
              "Content-Type": "application/json",
            },
          }
        )
        if (response.ok) {
          // Update the local collection data to reflect it's now added
          this.#selectedCollection.isAddedByUser = true

          // Also update the collection in the main collections array
          const collectionInArray = this.#collections.find(
            (c) => c._id === this.#selectedCollection._id
          )
          if (collectionInArray) {
            collectionInArray.isAddedByUser = true
          }

          // Add the tag to the detail view
          const detailTag = document.createElement("span")
          detailTag.className = "memora-library-tag memora-detail-tag"
          detailTag.textContent = "Added"

          // Get the title container
          const titleContainer = this.shadowRoot.querySelector(
            ".memora-detail-title-container"
          )

          // Add tag after the title if it doesn't exist yet
          if (
            titleContainer &&
            !titleContainer.querySelector(".memora-detail-tag")
          ) {
            titleContainer.appendChild(detailTag)
          }

          // Update button
          this.addButton.disabled = true
          this.addButton.textContent = "Already in your library"
          this.addButton.classList.add("memora-button-disabled")

          // Dispatch event for parent components
          this.dispatchEvent(
            new CustomEvent("add-collection", {
              detail: {
                id: this.#selectedCollection._id,
                name: this.#selectedCollection.name,
                isPublic: true,
              },
            })
          )
        } else {
          // Reset button state on error
          this.addButton.disabled = false
          this.addButton.textContent = "Add to my collection"

          //:TODO: Add error message
        }
      } catch (error) {
        // console.error("Error importing collection:", error.)
        this.addButton.disabled = false
        this.addButton.textContent = "Add to my collection"
      }
    }

    /**
     * Go back to the collections grid
     */
    #goBackToGrid() {
      // Render the collections grid with updated data
      this.#renderCollectionsGrid()

      // Reset selected collection
      this.#selectedCollection = null

      // Show grid view, hide detail view
      this.gridView.style.display = "block"
      this.detailView.style.display = "none"
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

      const cardElement = card.querySelector(".memora-collection-card")
      const titleContainer = card.querySelector(".memora-card-title-container")
      const cardTitle = card.querySelector(".memora-card-title")
      const cardCount = card.querySelector(".memora-card-count")
      const cardDescription = card.querySelector(".memora-card-description")
      const ownerName = card.querySelector(".memora-owner-name")
      const creationDate = card.querySelector(".memora-creation-date")

      // Set text content
      cardTitle.textContent = collection.name
      cardCount.textContent = collection.cardCount
      cardDescription.textContent = collection.description
      ownerName.textContent = collection.creatorName || "Unknown"
      creationDate.textContent = this.#formatDate(collection.createdAt)

      // Add visual indicator if collection is already in library
      if (collection.isAddedByUser) {
        cardElement.classList.add("memora-in-library")

        // Create tag indicator
        const tag = document.createElement("span")
        tag.className = "memora-library-tag"
        tag.textContent = "Added"

        // Insert the tag into the title container, after the title
        titleContainer.appendChild(tag)
      }

      // Store ID in data attribute
      cardElement.dataset.id = collection._id

      // Add click event listener
      const signal = this.#abortController.signal
      cardElement.addEventListener(
        "click",
        (event) => {
          const id = event.currentTarget.dataset.id
          // Call the method that displays collection detail
          this.#displayCollectionDetail(id)
        },
        { signal }
      )

      return card
    }

    /**
     * Display collection detail - no need to fetch since we already have the data
     */
    #displayCollectionDetail(collectionId) {
      // Find the collection in our local data
      this.#selectedCollection = this.#collections.find(
        (c) => c._id === collectionId
      )

      if (!this.#selectedCollection) {
        console.error("Collection not found:", collectionId)
        return
      }
      // Render the details
      this.#renderCollectionDetail()
    }

    /**
     * Render the collection detail view
     */
    #renderCollectionDetail() {
      if (!this.#selectedCollection) return

      const collection = this.#selectedCollection

      // Set detail content
      this.detailTitle.textContent = collection.name
      this.descriptionText.textContent = collection.description
      this.cardsCount.textContent = collection.cardCount
      this.createdDate.textContent = this.#formatDate(collection.createdAt)
      this.creatorName.textContent = collection.creatorName

      // Remove existing tag if present
      const existingTag =
        this.detailTitleContainer.querySelector(".memora-detail-tag")
      if (existingTag) {
        existingTag.remove()
      }

      // Add tag if collection is in library
      if (collection.isAddedByUser) {
        const detailTag = document.createElement("span")
        detailTag.className = "memora-library-tag memora-detail-tag"
        detailTag.textContent = "Added"

        // Add the tag directly to the title container
        this.detailTitleContainer.appendChild(detailTag)

        // Update button state
        this.addButton.disabled = true
        this.addButton.textContent = "Already in your library"
        this.addButton.classList.add("memora-button-disabled")
      } else {
        // Reset button if not in library
        this.addButton.disabled = false
        this.addButton.textContent = "Add to my collection"
        this.addButton.classList.remove("memora-button-disabled")
      }

      // Update the preview cards (always 5 of them)
      this.#updatePreviewCards(collection.previewCards || [])

      // Show detail view, hide grid view
      this.gridView.style.display = "none"
      this.detailView.style.display = "block"
    }

    /**
     * Update the static preview cards with the data
     */
    #updatePreviewCards(previewCards) {
      // Reset all cards first
      this.previewCards.forEach((card) => {
        const questionText = card.querySelector(".memora-question-text")
        const answerText = card.querySelector(".memora-answer-text")
        const answerElement = card.querySelector(".memora-preview-answer")
        const toggleIcon = card.querySelector(".memora-toggle-icon")

        // Reset content and state
        questionText.textContent = "No question available"
        answerText.textContent = "No answer available"
        answerElement.style.display = "none"
        toggleIcon.textContent = "↓"

        // Hide cards initially if we don't have enough data
        card.style.display = "none"
      })

      // Update with available data
      previewCards.forEach((cardData, index) => {
        if (index < this.previewCards.length) {
          const card = this.previewCards[index]
          const questionText = card.querySelector(".memora-question-text")
          const answerText = card.querySelector(".memora-answer-text")

          // Set content
          questionText.textContent = cardData.question
          answerText.textContent = cardData.answer

          // Show this card
          card.style.display = "block"
        }
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
