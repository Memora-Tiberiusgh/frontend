import { htmlTemplate } from "./memora-main.html.js"
import { cssTemplate } from "./memora-main.css.js"

customElements.define(
  "memora-main",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #collections = []
    #currentCollection = null
    #currentCardIndex = 0
    #userProfile = null

    #collectionsList
    #welcomeScreen
    #flashcardView
    #logoutButton
    #userNameElement
    #userEmailElement
    #userAvatarElement
    #loadingMessage
    #errorMessage

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
    }

    /**
     * Returns an array of attributes to be observed for changes.
     *
     * @returns {string[]} The list of attributes to be observed.
     */
    static get observedAttributes() {
      return ["user-data"]
    }

    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name The name of the attribute that changed.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "user-data" && newValue) {
        try {
          this.userProfile = JSON.parse(newValue)
          this.#updateUserProfile()
        } catch (e) {
          //:TODO: Add logger
        }
      }
    }

    /**
     * Setter for user profile data
     */
    set userProfile(data) {
      this.#userProfile = data
      if (this.isConnected) {
        this.#updateUserProfile()
        this.#fetchUserCollection()
      }
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
      // Cache DOM references
      this.#welcomeScreen = this.shadowRoot.querySelector(
        ".memora-welcome-screen"
      )
      this.#flashcardView = this.shadowRoot.querySelector(
        ".memora-flashcard-view"
      )
      this.#collectionsList = this.shadowRoot.querySelector(
        ".memora-collections-list"
      )
      this.#logoutButton = this.shadowRoot.querySelector(".memora-logout-btn")

      this.#userNameElement = this.shadowRoot.querySelector(".memora-user-name")

      this.#userEmailElement =
        this.shadowRoot.querySelector(".memora-user-email")

      this.#userAvatarElement = this.shadowRoot.querySelector(".memora-avatar")

      this.#loadingMessage = this.shadowRoot.querySelector(
        ".memora-loading-message"
      )
      this.#errorMessage = this.shadowRoot.querySelector(
        ".memora-error-message"
      )

      // Set up event listeners
      this.#setupEventListeners()

      // Update user profile if data is available
      if (this.#userProfile) {
        this.#updateUserProfile()
      }

      // Show welcome screen initially
      this.#showWelcomeScreen()
    }

    /**
     * Updates the user profile display with the current user data
     */
    #updateUserProfile() {
      if (!this.#userProfile) return

      // Update user name and email
      if (this.#userNameElement && this.#userProfile.displayName) {
        this.#userNameElement.textContent = this.#userProfile.displayName
      }

      if (this.#userEmailElement && this.#userProfile.email) {
        this.#userEmailElement.textContent = this.#userProfile.email
      }

      // Generate and update avatar initials
      if (this.#userAvatarElement) {
        const initials = this.#generateInitials(
          this.#userProfile.displayName || this.#userProfile.email || ""
        )
        this.#userAvatarElement.textContent = initials
      }
    }

    /**
     * Generates initials from a user's name
     * Handles cases with multiple names
     *
     * @param {string} name The user's name
     * @returns {string} The user's initials (up to 2 characters)
     */
    #generateInitials(name) {
      // If no name is provided, return a default
      if (!name || name.trim() === "") return "?"

      // For email addresses, use the first character
      if (name.includes("@")) {
        return name.charAt(0).toUpperCase()
      }

      // Split the name into parts
      const nameParts = name.trim().split(/\s+/)

      if (nameParts.length === 1) {
        // Just one name, return first character
        return nameParts[0].charAt(0).toUpperCase()
      } else {
        // Multiple names, return first and last initials
        const firstInitial = nameParts[0].charAt(0).toUpperCase()
        const lastInitial = nameParts[nameParts.length - 1]
          .charAt(0)
          .toUpperCase()
        return `${firstInitial}${lastInitial}`
      }
    }

    /**
     * Sets up all event listeners for the component
     */
    #setupEventListeners() {
      // Add delegated event listener for collection items
      this.#collectionsList.addEventListener("click", (event) => {
        const collectionItem = event.target.closest(".memora-collection-item")
        if (collectionItem) {
          const collectionName = collectionItem.textContent.trim()
          // Handle public badge text
          const collection = this.#collections.find(
            (c) =>
              c.name === collectionName ||
              (collectionName.includes(c.name) && c.isPublic)
          )

          if (collection) {
            this.#selectCollection(collection)
          }
        }
      })

      // Add collection button event listener
      const addButton = this.shadowRoot.querySelector(
        ".memora-add-collection-btn"
      )
      if (addButton) {
        addButton.addEventListener("click", () => {
          console.log("Add collection button clicked")
        })
      }

      // Add event listeners for navigation buttons
      const prevButton = this.shadowRoot.querySelector(
        ".memora-navigation-button.prev"
      )
      const nextButton = this.shadowRoot.querySelector(
        ".memora-navigation-button.next"
      )

      if (prevButton) {
        prevButton.addEventListener("click", () => this.#navigateCards(-1))
      }

      if (nextButton) {
        nextButton.addEventListener("click", () => this.#navigateCards(1))
      }

      if (this.#logoutButton) {
        this.#logoutButton.addEventListener("click", () => {
          const logoutEvent = new CustomEvent("memora-logout", {})
          this.dispatchEvent(logoutEvent)
        })
      }
    }

    /**
     * Renders the collections in the sidebar based on the current data
     */
    #renderCollections() {
      // Clear existing collection items
      while (this.#collectionsList.firstChild) {
        this.#collectionsList.removeChild(this.#collectionsList.firstChild)
      }

      // Add collection items
      this.#collections.forEach((collection) => {
        const item = document.createElement("li")
        item.className = "memora-collection-item"
        item.textContent = collection.name

        // Add active class if this is the current collection
        if (
          this.#currentCollection &&
          this.#currentCollection.id === collection.id
        ) {
          item.classList.add("active")
        }

        // Add public badge if needed
        if (collection.isPublic) {
          item.classList.add("public")

          const badge = document.createElement("span")
          badge.className = "memora-public-badge"
          badge.textContent = "Public"

          item.appendChild(badge)
        }

        this.#collectionsList.appendChild(item)
      })
    }

    /**
     * Selects a collection and displays its flashcards
     */
    #selectCollection(collection) {
      // Update the current collection
      this.#currentCollection = collection
      this.#currentCardIndex = 0

      // Update collection items to show active state
      const collectionItems = this.shadowRoot.querySelectorAll(
        ".memora-collection-item"
      )
      collectionItems.forEach((item) => {
        item.classList.remove("active")

        const itemName = item.textContent.trim().replace("Public", "").trim()
        if (itemName === collection.name) {
          item.classList.add("active")
        }
      })

      // Update and show flashcard view
      this.#updateFlashcardView()
    }

    /**
     * Updates the flashcard view with the current collection and card
     */
    #updateFlashcardView() {
      if (!this.#currentCollection) return

      // Update collection header
      const collectionName = this.#flashcardView.querySelector(
        ".memora-collection-name"
      )
      collectionName.textContent = this.#currentCollection.name

      const collectionMeta = this.#flashcardView.querySelector(
        ".memora-collection-meta"
      )
      collectionMeta.textContent = `Card ${this.#currentCardIndex + 1} of ${
        this.#currentCollection.cards.length
      }`

      // Update flashcard content
      const flashcardQuestion = this.#flashcardView.querySelector(
        ".memora-flashcard-question"
      )
      const flashcardAnswer = this.#flashcardView.querySelector(
        ".memora-flashcard-answer"
      )

      if (this.#currentCollection.cards.length > 0) {
        const currentCard =
          this.#currentCollection.cards[this.#currentCardIndex]
        flashcardQuestion.textContent = currentCard.question
        flashcardAnswer.textContent = currentCard.answer

        // Update navigation buttons
        const prevButton = this.#flashcardView.querySelector(
          ".memora-navigation-button.prev"
        )
        const nextButton = this.#flashcardView.querySelector(
          ".memora-navigation-button.next"
        )

        prevButton.disabled = this.#currentCardIndex === 0
        nextButton.disabled =
          this.#currentCardIndex === this.#currentCollection.cards.length - 1
      }

      // Show flashcard view, hide welcome screen
      this.#welcomeScreen.style.display = "none"
      this.#flashcardView.style.display = "block"
    }

    /**
     * Navigates between cards
     */
    #navigateCards(direction) {
      if (!this.#currentCollection) return

      // Calculate new index
      const newIndex = this.#currentCardIndex + direction

      // Check if within bounds
      if (newIndex >= 0 && newIndex < this.#currentCollection.cards.length) {
        this.#currentCardIndex = newIndex
        this.#updateFlashcardView()
      }
    }

    /**
     * Shows the welcome screen
     */
    #showWelcomeScreen() {
      // Show welcome screen, hide flashcard view
      this.#welcomeScreen.style.display = "block"
      this.#flashcardView.style.display = "none"

      // Clear active class from all collection items
      const collectionItems = this.shadowRoot.querySelectorAll(
        ".memora-collection-item"
      )
      collectionItems.forEach((item) => item.classList.remove("active"))

      // Reset current collection
      this.#currentCollection = null
    }

    // Calling the back-end
    async #fetchUserCollection() {
      try {
        // Clear previous errors
        this.#errorMessage.style.display = "none"

        // Show loading message
        this.#loadingMessage.style.display = "block"

        // Clear existing collection items (but keep the messages)
        const collectionItems = this.shadowRoot.querySelectorAll(
          ".memora-collection-item"
        )
        collectionItems.forEach((item) => item.remove())

        const token = this.#userProfile?.token || null

        if (!token) {
          this.#errorMessage.textContent =
            "Unable to authenticate. Please try logging out and back in."
          this.#errorMessage.style.display = "block"
          this.#loadingMessage.style.display = "none"
          return
        }

        const response = await fetch("http://localhost:8086/collections", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("API error: " + response.status)
        }

        const collections = await response.json()
        this.#updateCollections(collections)

        // Hide loading message when done
        this.#loadingMessage.style.display = "none"
      } catch (error) {
        //:TODO: Add logger

        // Show error message
        this.#loadingMessage.style.display = "none"
        this.#errorMessage.textContent = `Error loading collections. Most probably a server is down.`
        this.#errorMessage.style.display = "block"
      }
    }

    #updateCollections(collections) {
      this.#collections = collections
      this.#renderCollections()
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {}
  }
)
