/**
 * Terms of Service component for Memora
 */
customElements.define(
  'memora-terms',
  /**
   * Custom page for terms policy.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of MemoraTerms and sets up the shadow DOM.
     */
    constructor() {
      super()

      // Create the DOM structure
      const template = document.createElement('template')
      template.innerHTML = `
                  <style>
                      * {
                          margin: 0;
                          padding: 0;
                          box-sizing: border-box;
                          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      }
                      :host {
                          display: block;
                          background-color: #f9fafb;
                          color: #1f2937;
                          height: 100%;
                          width: 100%;
                          position: absolute;
                          overflow: auto;
                      }
                      .container {
                          width: 100%;
                          min-height: 100%;
                          background-color: white;
                          padding: 25px;
                          display: flex;
                          flex-direction: column;
                      }
                      .header {
                          display: flex;
                          align-items: center;
                          margin-bottom: 25px;
                      }
                      .logo {
                          font-size: 1.8rem;
                          font-weight: bold;
                          color: #6366f1;
                          text-align: left;
                          flex: 0 0 auto;
                      }
                      h1 {
                          font-size: 1.5rem;
                          flex: 1;
                          text-align: center;
                          padding-right: 90px; 
                      }
                      .content {
                          flex: 1;
                          padding: 30px;
                          background-color: #f9fafb;
                          border-radius: 12px;
                          margin-bottom: 25px;
                          line-height: 1.6;
                      }
                      .intro {
                          font-size: 1.1rem;
                          margin-bottom: 30px;
                          color: #374151;
                      }
                      .section {
                          margin-bottom: 30px;
                      }
                      .section-title {
                          font-size: 1.2rem;
                          font-weight: bold;
                          color: #1f2937;
                          margin-bottom: 15px;
                      }
                      .section-content {
                          color: #4b5563;
                          margin-bottom: 20px;
                      }
                      .section-content ul {
                          margin-left: 20px;
                          margin-top: 10px;
                      }
                      .section-content li {
                          margin-bottom: 8px;
                      }
                      .section-content p {
                          margin-bottom: 15px;
                      }
                      .section-content strong {
                          color: #1f2937;
                      }
                      .signature {
                          margin-top: 30px;
                          font-style: italic;
                          color: #6b7280;
                          text-align: right;
                      }
                      .button-container {
                          text-align: center;
                      }
                      .button {
                          display: inline-block;
                          padding: 12px 28px;
                          background-color: #6366f1;
                          color: white;
                          border: none;
                          border-radius: 8px;
                          text-decoration: none;
                          font-weight: 600;
                          cursor: pointer;
                          transition: all 0.2s ease;
                          font-size: 1rem;
                      }
                      .button:hover {
                          background-color: #4f46e5;
                          transform: translateY(-2px);
                      }
                      .email-link {
                          color: #6366f1;
                          text-decoration: none;
                          font-weight: 600;
                      }
                      .email-link:hover {
                          text-decoration: underline;
                      }
                  </style>
                  <div class="container">
                      <div class="header">
                          <div class="logo">Memora</div>
                          <h1>Terms of Service</h1>
                      </div>
                      <div class="content">
                          <div class="intro">
                              Welcome to my Memora App! This project is built as part of my school work and is meant to help users memorize content through digital flashcards. By using this app, you agree to the following terms:
                          </div>
  
                          <div class="section">
                              <div class="section-title">1. Account and User Data</div>
                              <div class="section-content">
                                  <ul>
                                      <li>Accounts are handled via Firebase Authentication.</li>
                                      <li>I collect and store your <strong>name</strong> and <strong>email address</strong> to manage your account and keep track of flashcards or collections you've created.</li>
                                      <li>There is currently no automatic way to delete your account from the app. However, you can email me at <a href="mailto:tiberius.gherac@gmail.com" class="email-link">tiberius.gherac@gmail.com</a>, and I will delete your account manually as soon as I can.</li>
                                      <li>If you submit a collection and mark it as public (and it's approved), your <strong>name may be displayed publicly</strong> as the author. If you'd like your name removed or anonymized, just let me know by email.</li>
                                  </ul>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">2. Content Guidelines</div>
                              <div class="section-content">
                                  <p>By using this app, you agree:</p>
                                  <ul>
                                      <li><strong>Not to upload malicious, offensive, or unethical content.</strong></li>
                                      <li><strong>Not to attempt to crash, exploit, or interfere with the app's functionality or the experience of other users.</strong></li>
                                  </ul>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">3. Privacy and GDPR</div>
                              <div class="section-content">
                                  <ul>
                                      <li>Your personal data (name and email) is only used for operating your account and associating content you create.</li>
                                      <li>You can request access to the data I store about you or request its deletion at any time via email.</li>
                                      <li>No data will be shared or sold to third parties.</li>
                                      <li>I'm doing my best to follow GDPR principles, but please understand that this is a <strong>school project</strong> made by a student and not a professional-grade application.</li>
                                  </ul>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">4. Open Source and Feedback</div>
                              <div class="section-content">
                                  <p>The code for this project is <strong>open source</strong> and available on GitHub <a href ="https://github.com/Memora-Tiberiusgh" target="_blank">here</a>.</p>
                                  <p>Since I'm still learning, your <strong>suggestions, improvements, or corrections are very welcome</strong>—especially if you find areas where I might be mishandling data or doing things inefficiently or incorrectly.</p>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">5. Liability</div>
                              <div class="section-content">
                                  <p>Please understand this app comes <strong>as-is</strong> with no guarantees. I'm a student learning as I go, so there might be bugs or mistakes. Use the app at your own risk.</p>
                              </div>
                          </div>
  
                          <div class="signature">
                              Thanks for using my app and helping me learn along the way! 🙏<br>
                              — Tiberius
                          </div>
                      </div>
                      <div class="button-container">
                          <button class="button">Close Window</button>
                      </div>
                  </div>
              `

      // Attach the shadow DOM and add the template content
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Add event listener to the close button
      this.shadowRoot.querySelector('.button').addEventListener('click', () => {
        window.close()
      })
    }

    /**
     * Called when element is connected to the DOM.
     */
    connectedCallback() {
      document.title = 'Memora - Terms of Service'
    }
  }
)
