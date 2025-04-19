import { htmlTemplate } from "./memora-main.html.js"
import { cssTemplate } from "./memora-main.css.js"

customElements.define(
  "memora-main",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #collections = [
      {
        id: 1,
        name: "Swedish Basics",
        isPublic: false,
        cards: [
          { question: "Hur säger man 'hello' på svenska?", answer: "Hej" },
          { question: "Vad är 'thank you' på svenska?", answer: "Tack" },
        ],
      },
      {
        id: 2,
        name: "French Vocabulary",
        isPublic: false,
        cards: [
          {
            question: "Comment dit-on 'hello' en français?",
            answer: "Bonjour",
          },
          {
            question: "Comment dit-on 'thank you' en français?",
            answer: "Merci",
          },
        ],
      },
      {
        id: 3,
        name: "JavaScript Fundamentals",
        isPublic: false,
        cards: [
          {
            question: "What is a closure in JavaScript?",
            answer:
              "A function that has access to its own scope, the outer function's scope, and the global scope",
          },
          {
            question: "Hur loggar man i consolen i JavaScript?",
            answer: "Man frågar chatGPT",
          },
          {
            question: "What is the difference between let and var?",
            answer: "let is block-scoped, var is function-scoped",
          },
        ],
      },
      {
        id: 4,
        name: "AI Prompt Engineering",
        isPublic: true,
        cards: [
          {
            question: "What is a prompt?",
            answer: "Instructions given to an AI to guide its output",
          },
          {
            question: "What is temperature in AI?",
            answer: "A parameter that controls randomness in generation",
          },
        ],
      },
      {
        id: 5,
        name: "Computer Science",
        isPublic: false,
        cards: [
          {
            question: "What is a data structure?",
            answer: "A specialized format for organizing and storing data",
          },
          {
            question: "What is an algorithm?",
            answer: "A step-by-step procedure for solving a problem",
          },
        ],
      },
      {
        id: 6,
        name: "Programming Tips",
        isPublic: true,
        cards: [
          {
            question: "What is DRY?",
            answer: "Don't Repeat Yourself - a principle to reduce repetition",
          },
          {
            question: "What is SOLID?",
            answer:
              "Five design principles for OOP: Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion",
          },
        ],
      },
    ]

    #currentCollection = null
    #currentCardIndex = 0

    #mainContent
    #collectionsList
    #welcomeScreen
    #flashcardView

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
      return []
    }

    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name The name of the attribute that changed.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {}

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

      // Set up event listeners
      this.#setupEventListeners()

      // Add method to update collections (could be called from outside)
      this.updateCollections = (newCollections) => {
        this.#collections = newCollections
        this.#renderCollections()

        // If current collection is no longer in the list, reset to welcome screen
        if (this.#currentCollection) {
          const stillExists = this.#collections.some(
            (c) => c.id === this.#currentCollection.id
          )
          if (!stillExists) {
            this.#currentCollection = null
            this.#showWelcomeScreen()
          }
        }
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

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {}
  }
)
