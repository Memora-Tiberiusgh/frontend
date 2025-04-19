/**
 * @file The HTML template for the memora-login web component.
 * @module memora-login.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
<div class="login-container">
        <div class="left-section">
          <div class="logo-container">
            <div class="logo">Memora</div>
            <p class="tagline">Your personal learning accelerator with spaced repetition</p>
          </div>
          
          <div class="auth-options">
            <h2 class="auth-title">Sign in to continue</h2>
            
            <button class="oauth-button" id="twitter-login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Continue with Twitter
            </button>
            
            <button class="oauth-button" id="google-login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="min-width: 24px;">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            
            <button class="oauth-button" id="apple-login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000" style="min-width: 24px;">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.84 1.5.12 2.63.64 3.34 1.64-2.99 1.73-2.09 5.4.36 6.79-.92 2.07-2.02 4.11-3.35 5.58z"/>
                <path d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.33-1.94 4.23-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
            
            <div class="auth-footer">
              By continuing, you agree to Memora's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        <div class="right-section">
          <h1 class="welcome-title">Welcome to Memora</h1>
          <p class="welcome-subtitle">Remember more, study less with spaced repetition flashcards</p>
          
          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div>Create and customize flashcard decks</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div>Share your collections with other learners</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div>AI-powered document to flashcard conversion</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div>Available on web, desktop and mobile devices</div>
            </div>
          </div>
          
          <h3 style="margin-top: 30px; margin-bottom: 10px; text-align: center;">Popular Categories</h3>
          <div class="category-grid">
            <div class="category-item">Languages</div>
            <div class="category-item">Programming</div>
            <div class="category-item">Science</div>
            <div class="category-item">History</div>
            <div class="category-item">Math</div>
            <div class="category-item">Art</div>
          </div>
        </div>
      </div>
`
