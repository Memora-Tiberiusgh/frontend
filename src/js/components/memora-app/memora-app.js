import { htmlTemplate } from "./memora-app.html.js"
import { cssTemplate } from "./memora-app.css.js"
import { auth } from "../../services/firebase.js"

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

customElements.define(
  "memora-app",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #container
    #userCreateURL = `${API_BASE_URL}/api/v1/users`

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

      this.#container = this.shadowRoot.getElementById("component-container")
    }

    // Clear all children from the container
    #clearContainer() {
      while (this.#container.firstChild) {
        this.#container.removeChild(this.#container.firstChild)
      }
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
      const path = window.location.pathname

      // Simple path-based component loading
      if (path === "/terms.html") {
        this.#clearContainer()
        this.#container.appendChild(document.createElement("memora-terms"))
        return
      }

      if (path === "/privacy.html") {
        this.#clearContainer()
        this.#container.appendChild(document.createElement("memora-privacy"))
        return
      }

      // For all other routes, handle auth flow
      this.#clearContainer()
      this.#container.appendChild(document.createElement("memora-login"))

      // Set up auth listener
      this.unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // User is logged in, show main component
          this.#clearContainer()

          try {
            // Create user in backend
            const token = await user.getIdToken()
            await fetch(this.#userCreateURL, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
              }),
            })

            // Create and display main component
            const mainComponent = document.createElement("memora-main")
            mainComponent.userProfile = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              token: token,
            }

            // Handle logout event
            mainComponent.addEventListener("memora-logout", () => {
              auth.signOut()
              this.#clearContainer()
              this.#container.appendChild(
                document.createElement("memora-login")
              )
            })

            this.#container.appendChild(mainComponent)
          } catch (error) {
            // console.error("Error:", error)
            this.#clearContainer()

            const errorElement = document.createElement("div")
            errorElement.textContent = "An error occurred. Please try again."
            this.#container.appendChild(errorElement)
          }
        }
      })
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {
      // Clean up the auth listener when the component is removed
      if (this.unsubscribe) {
        this.unsubscribe()
      }
    }
  }
)
