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
          By continuing, you agree to Memora's 
          <a href="#" onclick="window.open('/terms.html', '_blank', 'width=800,height=600')">Terms of Service</a> 
          and 
          <a href="#" onclick="window.open('/privacy.html', '_blank', 'width=800,height=600')">Privacy Policy</a>
        </div>
      </div>
    </div>
    <div class="right-section">
      <h1 class="welcome-title">Welcome to Memora</h1>
      <p class="welcome-subtitle">Remember more, study less with spaced repetition</p>
      
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature-icon">✓</div>
          <div>Create and customize flashcard decks</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">✓</div>
          <div>Available on web, desktop and mobile devices</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🚧</div>
          <div>Share your collections with other learners</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🚧</div>
          <div>AI-powered document to flashcard conversion</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🧊</div>
          <div>Coming soon to your smart fridge (seriously, we're working on it!)</div>
        </div>
      </div>
      
      <h3>Find Me Online</h3>
      <div class="social-links">
        <a href="https://gitlab.lnu.se/1dv613/student/tg222hh/memora" class="social-item" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/tiberius-gh/" class="social-item" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href="https://www.facebook.com/tiberiusgherac/" class="social-item" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
`
