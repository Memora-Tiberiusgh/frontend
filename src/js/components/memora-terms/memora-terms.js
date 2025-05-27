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
                        overflow: hidden;
                    }
                    .container {
                        width: 100%;
                        height: 100%;
                        background-color: white;
                        padding: 25px;
                        display: flex;
                        flex-direction: column;
                    }
                    .header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
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
                        padding: 20px;
                        background-color: #f3f4f6;
                        border-radius: 8px;
                        font-size: 1.25rem;
                        color: #4b5563;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 20px;
                    }
                    .emoji {
                        font-size: 2rem;
                        margin-right: 15px;
                    }
                    .button-container {
                        text-align: center;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 24px;
                        background-color: #6366f1;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    .button:hover {
                        background-color: #4f46e5;
                        transform: translateY(-2px);
                    }
                </style>
                <div class="container">
                    <div class="header">
                        <div class="logo">Memora</div>
                        <h1>Terms of Service</h1>
                    </div>
                    <div class="content">
                        <span class="emoji">📝</span>
                        <span>None yet!</span>
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
