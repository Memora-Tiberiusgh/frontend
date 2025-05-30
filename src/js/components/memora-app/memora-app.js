import { htmlTemplate } from './memora-app.html.js'
import { cssTemplate } from './memora-app.css.js'
import { auth } from '../../services/firebase.js'

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

customElements.define(
  'memora-app',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #container
    #userCreateURL = `${API_BASE_URL}/api/v1/users`
    #abortController = new AbortController()

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

      this.#container = this.shadowRoot.getElementById('component-container')
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
      this.#hello()

      // Handle static pages first
      const isStaticPage = this.#handleStaticPages()
      if (!isStaticPage) {
        // For all other routes, handle auth flow
        this.unsubscribe = this.#setupAuthListener()
      }
    }

    /**
     * Clears all child elements from the container.
     */
    #clearContainer() {
      while (this.#container.firstChild) {
        this.#container.removeChild(this.#container.firstChild)
      }
    }

    /**
     * Displays welcome message and contribution links in the console.
     */
    #hello() {
      console.log(
        '%cWelcome to Memora!',
        'font-size: 16px; font-weight: bold; color: #4A7FB0;'
      )
      console.log(
        '%cDoes this page need fixes or improvements? Join our discussions or contribute to help make Memora more lovable.',
        'font-size: 12px;'
      )
      console.log(
        '%c🤝 Contribute to Memora: https://github.com/Memora-Tiberiusgh',
        'font-size: 12px; color: #4A7FB0;'
      )
      console.log(
        '%c💬 Join our discussions: https://github.com/orgs/Memora-Tiberiusgh/discussions',
        'font-size: 12px; color: #4A7FB0;'
      )
    }

    /**
     * Handles routing for static pages like terms and privacy.
     *
     * @returns {boolean} True if a static page was handled, false otherwise.
     */
    #handleStaticPages() {
      const path = window.location.pathname

      if (path === '/terms') {
        this.#clearContainer()
        this.#container.appendChild(document.createElement('memora-terms'))
        return true
      }

      if (path === '/privacy') {
        this.#clearContainer()
        this.#container.appendChild(document.createElement('memora-privacy'))
        return true
      }

      return false
    }

    /**
     * Sets up Firebase authentication state listener and handles user login status.
     *
     * @returns {Function} The unsubscribe function for the auth listener.
     */
    #setupAuthListener() {
      // Start with login component
      this.#clearContainer()
      this.#container.appendChild(document.createElement('memora-login'))

      // Set up auth listener
      return auth.onAuthStateChanged(async (user) => {
        // Don't override static pages (terms and privacy) with auth flow
        const isStaticPage = this.#handleStaticPages()
        if (isStaticPage) {
          return // Exit early if we're on a static page
        }

        if (user) {
          await this.#handleLoggedInUser(user)
        } else {
          // Only show login if we're not on a static page
          this.#clearContainer()
          this.#container.appendChild(document.createElement('memora-login'))
        }
      })
    }

    /**
     * Handles the user authentication flow and displays the main application.
     *
     * @param {object} user - Firebase user object.
     * @returns {Promise<void>}
     */
    async #handleLoggedInUser(user) {
      this.#clearContainer()

      try {
        // Create user in backend
        const token = await user.getIdToken()
        await this.#createUserInBackend(user, token)

        // Create and display main component
        const mainComponent = this.#createMainComponent(user, token)
        this.#container.appendChild(mainComponent)
      } catch (error) {
        this.#displayError()
      }
    }

    /**
     * Creates or updates user data in the backend database.
     *
     * @param {object} user - Firebase user object.
     * @param {string} token - Firebase ID token for authentication.
     * @returns {Promise<void>}
     */
    async #createUserInBackend(user, token) {
      const signal = this.#abortController.signal

      await fetch(this.#userCreateURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email
        }),
        signal
      })
    }

    /**
     * Creates and configures the main application component with user data.
     *
     * @param {object} user - Firebase user object.
     * @param {string} token - Firebase ID token for authentication.
     * @returns {HTMLElement} The configured main component element.
     */
    #createMainComponent(user, token) {
      const mainComponent = document.createElement('memora-main')
      mainComponent.userProfile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        token
      }

      // Handle logout event
      mainComponent.addEventListener('memora-logout', () => {
        auth.signOut()
        this.#clearContainer()
        this.#container.appendChild(document.createElement('memora-login'))
      })

      return mainComponent
    }

    /**
     * Displays a generic error message to the user.
     */
    #displayError() {
      this.#clearContainer()
      const errorElement = document.createElement('div')
      errorElement.textContent = 'An error occurred. I suggest to try again.'
      this.#container.appendChild(errorElement)
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {
      // Clean up the auth listener when the component is removed
      if (this.unsubscribe) {
        this.unsubscribe()
      }

      this.#abortController.abort()
    }
  }
)
