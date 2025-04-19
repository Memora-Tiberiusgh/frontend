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

      // Create and add login component
      const loginComponent = document.createElement("memora-login")
      this.#container.appendChild(loginComponent)
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
      // Set up auth state listener
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        // Clear the container
        while (this.#container.firstChild) {
          this.#container.removeChild(this.#container.firstChild)
        }

        if (user) {
          // User is logged in, create and append main page component
          const mainPageComponent = document.createElement("memora-mainPage")
          this.#container.appendChild(mainPageComponent)
        } else {
          // User is logged out, create and append login component
          const loginComponent = document.createElement("memora-login")
          this.#container.appendChild(loginComponent)
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
