import { htmlTemplate } from './memora-login.html.js'
import { cssTemplate } from './memora-login.css.js'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  linkWithCredential
} from 'firebase/auth'
import { auth } from '../../services/firebase.js'

customElements.define(
  'memora-login',
  /**
   * Custom element for login interface.
   */
  class extends HTMLElement {
    #abortController = null

    #githubLoginBtn
    #googleLoginBtn
    #facebookLoginBtn

    /**
     * Creates an instance of MemoraLogin and attaches shadow DOM.
     */
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

      this.#abortController = new AbortController()
    }

    /**
     * Handles account linking when an email is already used through another provider.
     *
     * @param {Error} error - Firebase authentication error
     * @param {string} providerName - Name of the provider ('GitHub', 'Facebook', or 'Google')
     * @returns {Promise<void>}
     */
    async handleAccountLinking(error, providerName) {
      // Only handle the specific error for account linking
      if (error.code !== 'auth/account-exists-with-different-credential') {
        return
      }

      // Get the email from the error
      const email = error.customData?.email
      if (!email) return

      // Get the credential based on which provider the user clicked
      let pendingCred = null
      if (providerName === 'GitHub') {
        pendingCred = GithubAuthProvider.credentialFromError(error)
      } else if (providerName === 'Facebook') {
        pendingCred = FacebookAuthProvider.credentialFromError(error)
      } else if (providerName === 'Google') {
        pendingCred = GoogleAuthProvider.credentialFromError(error)
      }

      // Can't get credential, can't continue
      if (!pendingCred) return

      try {
        // Sign in with Google (the provider that has the email)
        const googleProvider = new GoogleAuthProvider()
        googleProvider.setCustomParameters({ login_hint: email })

        // Sign in with Google
        const result = await signInWithPopup(auth, googleProvider)

        // If sign-in successful, link the other provider
        if (result?.user) {
          await linkWithCredential(result.user, pendingCred)
        }
      } catch (error) {
        // :TODO: Add UI for informing the user about the error
      }
    }

    /**
     * Called when element is connected to the DOM.
     */
    connectedCallback() {
      this.#googleLoginBtn = this.shadowRoot.querySelector('#google-login')
      this.#githubLoginBtn = this.shadowRoot.querySelector('#github-login')
      this.#facebookLoginBtn = this.shadowRoot.querySelector('#facebook-login')

      this.#setupEventlisteners()
    }

    /**
     * Sets up event listeners for login buttons.
     */
    #setupEventlisteners() {
      // Set up the Google login button
      this.#googleLoginBtn.addEventListener(
        'click',
        async () => {
          try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
          } catch (error) {
            await this.handleAccountLinking(error, 'Google')
          }
        },
        { signal: this.#abortController.signal }
      )

      // Set up the GitHub login button
      this.#githubLoginBtn.addEventListener(
        'click',
        async () => {
          try {
            const provider = new GithubAuthProvider()
            provider.addScope('user:email')
            provider.addScope('read:user')
            await signInWithPopup(auth, provider)
          } catch (error) {
            await this.handleAccountLinking(error, 'GitHub')
          }
        },
        { signal: this.#abortController.signal }
      )

      // Set up the Facebook login button
      this.#facebookLoginBtn.addEventListener(
        'click',
        async () => {
          try {
            const provider = new FacebookAuthProvider()
            provider.addScope('email')
            await signInWithPopup(auth, provider)
          } catch (error) {
            await this.handleAccountLinking(error, 'Facebook')
          }
        },
        { signal: this.#abortController.signal }
      )
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback() {
      // Clean up event listeners
      if (this.#abortController) {
        this.#abortController.abort()
      }
    }
  }
)
