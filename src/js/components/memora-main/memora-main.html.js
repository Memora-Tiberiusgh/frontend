/**
 * @file The HTML template for the memora-main web component.
 * @module memora-main.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
<div class="memora-app">
    <!-- Sidebar -->
    <div class="memora-sidebar">
      <div class="memora-header">
        <div class="memora-logo">Memora</div>
        <div class="memora-social-icons">
          <a href="https://www.linkedin.com/in/tiberius-gh/" target="_blank" class="memora-social-icon" title="Connect on LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://gitlab.lnu.se/1dv613/student/tg222hh/memora" target="_blank" class="memora-social-icon" title="View projects on GitLab">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
            </svg>
          </a>
        </div>
      </div>

      <h2 class="memora-collections-title">My Collections</h2>
      
      <ul class="memora-collections-list">
        <li class="memora-collection-item">Swedish Basics</li>
        <li class="memora-collection-item">French Vocabulary</li>
        <li class="memora-collection-item">JavaScript Fundamentals</li>
        <li class="memora-collection-item public">
          AI Prompt Engineering
          <span class="memora-public-badge">Public</span>
        </li>
        <li class="memora-collection-item">Computer Science</li>
        <li class="memora-collection-item public">
          Programming Tips
          <span class="memora-public-badge">Public</span>
        </li>
      </ul>

      <!-- Add collection button -->
      <button class="memora-add-collection-btn">
        <span class="memora-add-icon">+</span>
        <span>Add Collection</span>
      </button>

      <div class="memora-user-profile">
        <div class="memora-avatar">TG</div>
        <div class="memora-user-info">
          <div class="memora-user-name">Tiberius Gherac</div>
          <div class="memora-user-email">tg222hh@student.lnu.se</div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="memora-main-content">
      <!-- Welcome screen (initially visible) -->
      <div class="memora-welcome-screen" style="text-align: center;">
        <h1 style="font-size: 2.5rem; margin-bottom: 20px; color: var(--primary);">Welcome to Memora</h1>
        <p style="font-size: 1.2rem; margin-bottom: 40px; color: var(--text-dark);">Your personal flashcard application</p>
        <p style="font-size: 1.1rem; color: var(--gray);">Choose a collection from the menu to get started</p>
      </div>
      
      <!-- Flashcard view (initially hidden) -->
      <div class="memora-flashcard-view" style="display: none;">
        <div class="memora-collection-header">
          <h1 class="memora-collection-name"></h1>
          <div class="memora-collection-meta"></div>
        </div>

        <div class="memora-flashcard-container">
          <div class="memora-flashcard">
            <div class="memora-flashcard-header">
              Flashcard
            </div>
            <div class="memora-flashcard-body">
              <div class="memora-flashcard-question"></div>
              <hr style="margin: 25px 0; border: 0; height: 1px; background-color: var(--gray-light);">
              <div class="memora-flashcard-answer"></div>
            </div>
            <div class="memora-flashcard-footer">
              <button class="memora-navigation-button prev">Previous Card</button>
              <button class="memora-navigation-button next">Next Card</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
