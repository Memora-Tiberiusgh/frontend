import { htmlTemplate } from "./memora-app.html.js"
import { cssTemplate } from "./memora-app.css.js"
import { app, auth } from "../../services/firebase.js"

customElements.define(
  "memora-app",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #container

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))

      this.#container = this.shadowRoot.getElementById("component-container")

      // Simple routing based on pathname
      const path = window.location.pathname

      if (path === "/terms.html") {
        const termsComponent = document.createElement("memora-terms")
        this.#container.appendChild(termsComponent)
      } else if (path === "/privacy.html") {
        const privacyComponent = document.createElement("memora-privacy")
        this.#container.appendChild(privacyComponent)
      } else {
        // Default login flow
        const loginComponent = document.createElement("memora-login")
        this.#container.appendChild(loginComponent)
      }
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
      // Get the current path
      const path = window.location.pathname

      // Only set up auth listener for main app routes, not for special pages
      if (path !== "/terms.html" && path !== "/privacy.html") {
        // Set up auth state listener for normal app flow
        this.unsubscribe = auth.onAuthStateChanged((user) => {
          // Clear the container
          while (this.#container.firstChild) {
            this.#container.removeChild(this.#container.firstChild)
          }

          if (user) {
            // User is logged in, create and append main page component
            const mainPageComponent = document.createElement("memora-main")

            // Get the token and add it to user profile
            user.getIdToken().then((token) => {
              const userProfile = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                token: token,
              }

              // Set the user profile data
              mainPageComponent.userProfile = userProfile
            })

            // Store reference to the component
            this.mainComponent = mainPageComponent

            // Add event listener for logout directly on the component
            this.mainComponent.addEventListener(
              "memora-logout",
              this.#handleLogout.bind(this)
            )

            this.#container.appendChild(mainPageComponent)
          } else {
            // User is logged out, create and append login component
            const loginComponent = document.createElement("memora-login")
            this.#container.appendChild(loginComponent)
          }
        })
      }
    }

    /**
     * Handles the logout event
     * @private
     */
    #handleLogout() {
      auth.signOut().catch((error) => {
        //:TODO: Implement logger
      })

      // Remove the event listener when logout is triggered
      if (this.mainComponent) {
        this.mainComponent.removeEventListener(
          "memora-logout",
          this.#handleLogout
        )
        this.mainComponent = null
      }
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {
      // Clean up the auth listener when the component is removed
      if (this.unsubscribe) {
        this.unsubscribe()
      }

      // Clean up the component-specific event listener
      if (this.mainComponent) {
        this.mainComponent.removeEventListener(
          "memora-logout",
          this.#handleLogout
        )
        this.mainComponent = null
      }
    }
  }
)
