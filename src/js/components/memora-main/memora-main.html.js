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
      <div class="memora-logo">Memora</div>

      <h2 class="memora-collections-title">My Collections</h2>
      <ul class="memora-collections-list">
        <li class="memora-collection-item">Swedish Basics</li>
        <li class="memora-collection-item">French Vocabulary</li>
        <li class="memora-collection-item active">JavaScript Fundamentals</li>
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
      <div class="memora-collection-header">
        <h1 class="memora-collection-name">JavaScript Fundamentals</h1>
        <div class="memora-collection-meta">Card 3 of 24</div>
      </div>

      <div class="memora-flashcard-container">
        <div class="memora-flashcard">
          <div class="memora-flashcard-header">
            Flashcard
          </div>
          <div class="memora-flashcard-body">
            <div class="memora-flashcard-question">
              Hur loggar man i consolen i JavaScript?
            </div>
            <hr style="margin: 25px 0; border: 0; height: 1px; background-color: var(--gray-light);">
            <div class="memora-flashcard-answer">
              Man frågar ChatGPT
            </div>
          </div>
          <div class="memora-flashcard-footer">
            <button class="memora-navigation-button prev">Previous Card</button>
            <button class="memora-navigation-button next">Next Card</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`
