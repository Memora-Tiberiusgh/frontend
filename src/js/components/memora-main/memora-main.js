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
    #userProfile = null
    #isCreatingCollection = false
    #abortController = null

    #collectionsList
    #welcomeScreen
    #mainContent
    #logoutButton
    #userNameElement
    #userEmailElement
    #userAvatarElement
    #loadingMessage
    #errorMessage
    #settingsIconTemplate
    #publicBadgeTemplate
    #addCollectionButton

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
      if (newValue !== oldValue && name === "user-data") {
        try {
          this.userProfile = JSON.parse(newValue)
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
      this.#mainContent = this.shadowRoot.querySelector(".memora-main-content")

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
      this.#settingsIconTemplate = this.shadowRoot.querySelector(
        "#memora-settings-icon-template"
      )
      this.#publicBadgeTemplate = this.shadowRoot.querySelector(
        "#memora-public-badge-template"
      )

      this.#addCollectionButton = this.shadowRoot.querySelector(
        ".memora-add-collection-btn"
      )

      // Set up event listeners
      this.#setupEventListeners()

      // Update user profile if data is available
      if (this.#userProfile) {
        this.#updateUserProfile()
      }

      // Show welcome screen initially
      this.#showWelcomeScreen()

      // Fetch collections
      this.#fetchUserCollection()
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
      if (!name || name.trim() === "") return "Ghost"

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
      // Get the signal from the abort controller
      const signal = this.#abortController.signal

      // Add delegated event listener for collection items
      this.#collectionsList.addEventListener(
        "click",
        (event) => {
          // Check if the settings icon was clicked
          const settingsIcon = event.target.closest(".memora-settings-icon")
          if (settingsIcon) {
            // Stop the event from triggering collection selection
            event.stopPropagation()

            // Find the collection item and collection data
            const collectionItem = settingsIcon.closest(
              ".memora-collection-item"
            )
            const nameElement = collectionItem.querySelector(
              ".memora-collection-name-text"
            )
            const collectionName = nameElement.textContent.trim()

            // Find the collection in the data
            const collection = this.#collections.find(
              (c) => c.name === collectionName
            )

            if (collection) {
              // Update the current collection
              this.#currentCollection = collection

              // Remove "active" class from all collection items
              const collectionItems = this.shadowRoot.querySelectorAll(
                ".memora-collection-item"
              )
              collectionItems.forEach((item) => {
                item.classList.remove("active")
              })

              // Add active class only to the clicked collection
              collectionItem.classList.add("active")

              // Show the settings for this collection, but don't fetch cards
              this.#showSettingsComponent(collection.id)
            }

            return
          }

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
        },
        { signal }
      )

      // Add collection button event listener
      if (this.#addCollectionButton) {
        this.#addCollectionButton.addEventListener(
          "click",
          () => {
            this.#showCreateCollectionComponent()
          },
          { signal }
        )
      }

      if (this.#logoutButton) {
        this.#logoutButton.addEventListener(
          "click",
          () => {
            const logoutEvent = new CustomEvent("memora-logout", {})
            this.dispatchEvent(logoutEvent)
          },
          { signal }
        )
      }
    }

    // Keep state of the collection in focus
    #updateCollectionActiveState(collection = null) {
      // Update collection items to show active state
      const collectionItems = this.shadowRoot.querySelectorAll(
        ".memora-collection-item"
      )
      // First, remove active from all
      collectionItems.forEach((item) => {
        item.classList.remove("active")
      })

      // Only set active if a collection was provided
      if (collection) {
        collectionItems.forEach((item) => {
          const itemName = item.textContent.trim().replace("Public", "").trim()
          if (itemName === collection.name) {
            item.classList.add("active")
          }
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
        // Create list item
        const item = document.createElement("li")
        item.className = "memora-collection-item"

        // Create name span
        const nameSpan = document.createElement("span")
        nameSpan.className = "memora-collection-name-text"
        nameSpan.textContent = collection.name
        item.appendChild(nameSpan)

        // Add active class if this is the current collection
        if (
          this.#currentCollection &&
          this.#currentCollection.id === collection.id
        ) {
          item.classList.add("active")
        }

        if (collection.isPublic) {
          // Add public badge for public collections
          item.classList.add("public")
          const badge = this.#publicBadgeTemplate.content.cloneNode(true)
          item.appendChild(badge)
        } else {
          // Clone the settings icon from the template
          const settingsIcon =
            this.#settingsIconTemplate.content.cloneNode(true)
          item.appendChild(settingsIcon)
        }

        this.#collectionsList.appendChild(item)
      })
    }

    /**
     * Selects a collection and displays its reviews
     */
    #selectCollection(collection) {
      // Update the current collection
      this.#currentCollection = collection

      // Update collection items to show active state
      this.#updateCollectionActiveState(collection)

      // Update and show review view
      this.#showReviewComponent(collection.id)
    }

    /**
     * Shows the collection settings component
     */
    async #showSettingsComponent(collectionId) {
      // Hide the welcome screen and review view
      this.#welcomeScreen.style.display = "none"

      // Remove any existing components from main content
      this.#clearMainContent()

      try {
        // Dynamically import the review component
        await import("../memora-settings")

        // Create the review component
        const settingsComponent = document.createElement("memora-settings")

        // Pass the collection ID and auth token
        if (this.#userProfile && this.#userProfile.token) {
          settingsComponent.setAttribute("token", this.#userProfile.token)
        }

        // Pass the collection name for display purposes
        if (this.#currentCollection) {
          settingsComponent.setAttribute(
            "collection-name",
            this.#currentCollection.name
          )
        }

        settingsComponent.setAttribute("collection-id", collectionId)

        settingsComponent.addEventListener("settings-canceled", () => {
          // Hide the creator
          this.#clearMainContent()

          // Show the review component for the current collection
          if (this.#currentCollection) {
            this.#showReviewComponent(this.#currentCollection.id)
          } else {
            this.#showWelcomeScreen()
          }
        })

        settingsComponent.addEventListener("uppdate-name", (event) => {
          // Update the collection name if needed
          this.#currentCollection.name = event.detail

          // Update UI to reflect the new name
          this.#renderCollections()
        })

        settingsComponent.addEventListener("collection-deleted", () => {
          // Remove the deleted collection from the collections array
          this.#collections = this.#collections.filter(
            (collection) => collection.id !== this.#currentCollection.id
          )

          // Reset the current collection since it's been deleted
          this.#currentCollection = null

          // Re-render the collections list in the sidebar
          this.#renderCollections()

          // Show the welcome screen since no collection is selected now
          this.#showWelcomeScreen()
        })

        // Append to main content
        this.#mainContent.appendChild(settingsComponent)
      } catch (error) {
        console.error("Error loading review component:", error)
        // Show error message to user
        alert("Unable to load the settings. Please try again.")
        // Return to welcome screen
        this.#showWelcomeScreen()
      }
    }

    /**
     * Create and display the review component
     *
     * @param {string|number} collectionId - The ID of the collection to display
     */
    async #showReviewComponent(collectionId) {
      // Hide the welcome screen
      this.#welcomeScreen.style.display = "none"

      // Clear the main content
      this.#clearMainContent()

      try {
        // Dynamically import the review component
        await import("../memora-review")

        // Create the review component
        const reviewComponent = document.createElement("memora-review")

        // Pass the collection ID and auth token
        reviewComponent.setAttribute("collection-id", collectionId)

        if (this.#userProfile && this.#userProfile.token) {
          reviewComponent.setAttribute("token", this.#userProfile.token)
        }

        // Pass the collection name for display purposes
        if (this.#currentCollection) {
          reviewComponent.setAttribute(
            "collection-name",
            this.#currentCollection.name
          )
        }

        // Append to main content
        this.#mainContent.appendChild(reviewComponent)
      } catch (error) {
        console.error("Error loading review component:", error)
        // Show error message to user
        alert("Unable to load the flashcards creator. Please try again.")
        // Return to welcome screen
        this.#showWelcomeScreen()
      }
    }

    /**
     * Clears all dynamic components from the main content area
     */
    #clearMainContent() {
      // Find and remove all custom elements in the main content
      const customElements = this.#mainContent.querySelectorAll(
        ":not(.memora-welcome-screen)"
      )
      customElements.forEach((element) => {
        if (element.nodeName.includes("-")) {
          element.remove()
        }
      })
    }

    /**
     * Shows the welcome screen
     */
    #showWelcomeScreen() {
      if (this.#isCreatingCollection) return

      // Show welcome screen, hide review view
      this.#welcomeScreen.style.display = "block"

      // Clear the main content of any other components
      this.#clearMainContent()

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

        console.log("TOKEN")
        console.log(token)

        const response = await fetch(this.#collectionURL, {
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

    /**
     * Shows the collection creator component
     */
    async #showCreateCollectionComponent() {
      // Clear active state from all collections
      this.#updateCollectionActiveState()

      // Store current collection to restore if component is canceled
      const previousCollection = this.#currentCollection

      // Hide other views
      this.#welcomeScreen.style.display = "none"

      // Clear the main content
      this.#clearMainContent()

      try {
        // Dynamically import the collection component
        await import("../memora-collection")

        // Create and append the collection creator component
        const collectionCreator = document.createElement("memora-collection")

        // Pass the authentication token
        if (this.#userProfile && this.#userProfile.token) {
          collectionCreator.setAttribute("token", this.#userProfile.token)
        }

        // Set up event listeners for the component
        collectionCreator.addEventListener("collection-created", (event) => {
          // Get the collection data from the event
          const newCollection = event.detail

          // Add to collections array
          this.#collections.push(event.detail)

          // Update UI
          this.#renderCollections()

          // Set as current collection
          this.#currentCollection = newCollection

          // Update active state
          this.#updateCollectionActiveState(newCollection)

          const activeItem = this.shadowRoot.querySelector(
            ".memora-collection-item.active"
          )
          if (activeItem) {
            activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }
        })

        collectionCreator.addEventListener("collection-done", () => {
          // Hide the creator
          this.#clearMainContent()
          this.#isCreatingCollection = false

          // Show the review component for the current collection
          if (this.#currentCollection) {
            this.#showReviewComponent(this.#currentCollection.id)
          } else {
            this.#showWelcomeScreen()
          }
        })

        collectionCreator.addEventListener("collection-cancelled", () => {
          this.#hideCollectionCreator()

          // Restore previous active collection if it existed
          if (previousCollection) {
            this.#updateCollectionActiveState(previousCollection)
          }
        })

        // Append to main content
        this.#mainContent.appendChild(collectionCreator)

        this.#isCreatingCollection = true
      } catch (error) {
        console.error("Error loading collection component:", error)

        // Show error message to user
        alert("Unable to load collection creator. Please try again.")

        // Return to welcome screen
        this.#showWelcomeScreen()
      }
    }

    /**
     * Hides the collection creator and returns to the welcome screen
     */
    #hideCollectionCreator() {
      this.#clearMainContent()
      this.#isCreatingCollection = false

      // Show the welcome screen if no collection is selected
      if (!this.#currentCollection) {
        this.#showWelcomeScreen()
      } else {
        this.#showReviewComponent(this.#currentCollection.id)
      }
    }

    #updateCollections(collections) {
      this.#collections = collections
      this.#renderCollections()
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
