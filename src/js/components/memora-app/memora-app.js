import { htmlTemplate } from "./memora-app.html.js"
import { cssTemplate } from "./memora-app.css.js"
import { auth } from "../../services/firebase.js"

customElements.define(
  "memora-app",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #container
    #userCreateURL = "http://localhost:8086/api/v1/users"

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
        this.unsubscribe = auth.onAuthStateChanged(async (user) => {
          try {
            // Clear the container
            while (this.#container.firstChild) {
              this.#container.removeChild(this.#container.firstChild)
            }

            if (user) {
              // Get token in a separate try block to isolate token issues
              const token = await user.getIdToken()

              const userProfile = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                token: token,
              }

              // Isolate the fetch in its own try block
              let response
              try {
                response = await fetch(this.#userCreateURL, {
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
              } catch (fetchError) {
                // console.error("Fetch error:", fetchError)
              }

              // Process response in its own try block
              let userData
              try {
                if (!response.ok) {
                  throw new Error(
                    `Failed to create user in backend: ${response.status}`
                  )
                }
                userData = await response.json()
              } catch (responseError) {
                // console.error("Response processing error:", responseError)
              }

              // Create component in its own try block
              try {
                const mainPageComponent = document.createElement("memora-main")

                mainPageComponent.userProfile = userProfile

                this.mainComponent = mainPageComponent
                this.mainComponent.addEventListener(
                  "memora-logout",
                  this.#handleLogout.bind(this)
                )

                this.#container.appendChild(mainPageComponent)
              } catch (componentError) {
                // console.error("Component error:", componentError)
              }
            } else {
              const loginComponent = document.createElement("memora-login")
              this.#container.appendChild(loginComponent)
            }
          } catch (error) {
            // console.error("Error in authentication flow:", error)
            // console.error("Error details:", error.message, error.stack)

            // Fallback UI
            const errorElement = document.createElement("div")
            errorElement.textContent =
              "An error occurred. Please pray for a solution."
            this.#container.appendChild(errorElement)
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
