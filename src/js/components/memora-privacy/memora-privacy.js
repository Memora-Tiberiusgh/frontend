/**
 * Privacy Policy component for Memora
 */
customElements.define(
  'memora-privacy',
  /**
   * Custom page for privacy policy.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of MemoraPrivacy and sets up the shadow DOM.
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
  
                      .effective-date {
                          font-weight: bold;
                          margin-bottom: 20px;
                          color: #374151;
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
                          margin-bottom: 15px;
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
  
                      .data-table {
                          width: 100%;
                          border-collapse: collapse;
                          margin: 15px 0;
                          background-color: white;
                          border-radius: 8px;
                          overflow: hidden;
                          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                      }
  
                      .data-table th,
                      .data-table td {
                          padding: 12px 15px;
                          text-align: left;
                          border-bottom: 1px solid #e5e7eb;
                      }
  
                      .data-table th {
                          background-color: #f3f4f6;
                          font-weight: 600;
                          color: #374151;
                      }
  
                      .data-table tr:last-child td {
                          border-bottom: none;
                      }
  
                      .email-link {
                          color: #6366f1;
                          text-decoration: none;
                          font-weight: 600;
                      }
  
                      .email-link:hover {
                          text-decoration: underline;
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
                  </style>
                  <div class="container">
                      <div class="header">
                          <div class="logo">Memora</div>
                          <h1>Privacy Policy</h1>
                      </div>
  
                      <div class="content">
                          <div class="effective-date">Effective date: [May 2025]</div>
                          
                          <div class="intro">
                              Thank you for using this flashcard app, created as part of a school project to help users study and memorize content. I care about your privacy and aim to handle your data responsibly. Below is a plain-language explanation of how your information is handled.
                          </div>
  
                          <div class="section">
                              <div class="section-title">1. Who Is Responsible?</div>
                              <div class="section-content">
                                  <p>This application is operated by me, Tiberius Gherac, a student developer. You can contact me anytime at <a href="mailto:tiberius.gherac@gmail.com" class="email-link">tiberius.gherac@gmail.com</a>.</p>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">2. What Data Is Collected and Why?</div>
                              <div class="section-content">
                                  <p>When you use the app, the following information may be collected:</p>
                                  <table class="data-table">
                                      <thead>
                                          <tr>
                                              <th>Data</th>
                                              <th>Purpose</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td>Your <strong>name</strong> and <strong>email</strong> (via Firebase Authentication)</td>
                                              <td>To identify you and manage your account</td>
                                          </tr>
                                          <tr>
                                              <td>Public flashcard collections you submit</td>
                                              <td>To show your content to other users</td>
                                          </tr>
                                          <tr>
                                              <td>Your IP address and browser info (indirectly via hosting/logging systems)</td>
                                              <td>For server logs, debugging, and security</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">3. Where and How Is Data Stored?</div>
                              <div class="section-content">
                                  <ul>
                                      <li>Your account and content data are stored in <strong>Firebase</strong> (by Google).</li>
                                      <li>Firebase may store data on servers located <strong>outside the EU</strong>, including the United States.</li>
                                      <li>The app is hosted via <strong>Cloudflare</strong>, which may also process technical metadata such as IP addresses to deliver the website efficiently.</li>
                                  </ul>
                                  <p>Google complies with the <strong>GDPR</strong> through Standard Contractual Clauses (SCCs) and related frameworks.</p>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">4. Cookies and Storage</div>
                              <div class="section-content">
                                  <ul>
                                      <li>This app <strong>does not use traditional cookies</strong>.</li>
                                      <li>However, <strong>Firebase Authentication uses localStorage</strong> (and occasionally <code>sessionStorage</code>) to manage your login session.</li>
                                      <li>This is essential for the app to function and is not used for tracking or marketing.</li>
                                  </ul>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">5. Public Content</div>
                              <div class="section-content">
                                  <ul>
                                      <li>If you <strong>submit a flashcard collection as public</strong>, and it is approved, it may be visible to anyone (even non-logged-in visitors).</li>
                                      <li>Your <strong>name will be shown alongside public content</strong>.</li>
                                      <li>If you want to anonymize or remove your name from public content, just email me.</li>
                                  </ul>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">6. Account Deletion</div>
                              <div class="section-content">
                                  <p>There is currently <strong>no built-in way</strong> to delete your account in the app.</p>
                                  <p>You can request manual deletion at any time by contacting me at <a href="mailto:tiberius.gherac@gmail.com" class="email-link">tiberius.gherac@gmail.com</a>. I will remove your user data from Firebase.</p>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">7. Your Rights Under GDPR</div>
                              <div class="section-content">
                                  <p>If you are in the European Union, you have the legal right to:</p>
                                  <ul>
                                      <li>Access the data stored about you</li>
                                      <li>Correct any inaccurate data</li>
                                      <li>Request deletion of your data</li>
                                      <li>Restrict or object to certain types of processing</li>
                                  </ul>
                                  <p>To exercise any of these rights, email <a href="mailto:tiberius.gherac@gmail.com" class="email-link">tiberius.gherac@gmail.com</a> and I'll respond as soon as I can.</p>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">8. Security</div>
                              <div class="section-content">
                                  <p>I use security headers (via Helmet), CORS configuration, and logging with request tracking to help keep the app secure. However, this is a <strong>school project</strong>, and I cannot guarantee perfect security.</p>
                                  <p>Please use the app at your own discretion.</p>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">9. Open Source and Feedback</div>
                              <div class="section-content">
                                  <p>The source code is open on GitHub <a href ="https://github.com/Memora-Tiberiusgh" target="_blank">here</a>. As a student, I am still learning. Suggestions on security, privacy, or code quality are very welcome.</p>
                              </div>
                          </div>
  
                          <div class="section">
                              <div class="section-title">10. Changes to This Policy</div>
                              <div class="section-content">
                                  <p>This privacy policy may change as I improve the app. Updates will be posted on this page.</p>
                              </div>
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
      document.title = 'Memora - Privacy Policy'
    }
  }
)
