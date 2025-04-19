import { htmlTemplate } from "./memora-login.html.js"
import { cssTemplate } from "./memora-login.css.js"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../services/firebase.js"

customElements.define(
  "memora-login",
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
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
      // Set up event listeners for authentication
      const googleLoginBtn = this.shadowRoot.getElementById("google-login")
      const twitterLoginBtn = this.shadowRoot.getElementById("twitter-login")
      const appleLoginBtn = this.shadowRoot.getElementById("apple-login")

      // Add click handler for Google login
      googleLoginBtn.addEventListener("click", () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            // The signed-in user info.
            const user = result.user
            console.log("Successfully signed in with Google", user)
            // IdP data available using getAdditionalUserInfo(result)
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            console.error("Google sign-in error:", errorMessage)
            // The email of the user's account used.
            const email = error.customData?.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            // You might want to display the error to the user
          })
      })

      twitterLoginBtn.addEventListener("click", () => {
        console.log("Twitter login not implemented yet")
      })

      appleLoginBtn.addEventListener("click", () => {
        console.log("Apple login not implemented yet")
      })

      // Listen for auth state changes
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          this.dispatchEvent(
            new CustomEvent("auth-changed", {
              bubbles: true,
              composed: true,
              detail: { user },
            })
          )
        } else {
          // User is signed out
          this.dispatchEvent(
            new CustomEvent("auth-changed", {
              bubbles: true,
              composed: true,
              detail: { user: null },
            })
          )
        }
      })
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {}
  }
)
