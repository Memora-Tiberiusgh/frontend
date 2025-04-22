/**
 * @file The HTML template for the memora-collection web component.
 * @module memora-collection.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
<div class="memora-collection-creator">
    <div class="memora-collection-header">
      <h1 class="memora-collection-title">Create New Collection</h1>
    </div>
    
    <!-- Collection creation step -->
    <div class="memora-step memora-step-collection memora-collection-form">
      <div class="memora-input-group">
        <label for="collection-name" class="memora-label">Collection Name</label>
        <input type="text" id="collection-name" class="memora-input" placeholder="Enter collection name..." maxlength="50">
        <div class="memora-input-requirements">1-50 characters</div>
      </div>
      <div class="memora-input-group">
        <label for="collection-description" class="memora-label">Description (Optional)</label>
        <textarea id="collection-description" class="memora-input" placeholder="Enter collection description..." maxlength="500"></textarea>
        <div class="memora-input-requirements">0-500 characters</div>
      </div>
      <div class="memora-buttons">
        <button class="memora-button memora-button-cancel">Cancel</button>
        <button class="memora-button memora-button-primary memora-button-create">Create Collection</button>
      </div>
      <p class="memora-error-message" style="display: none;"></p>
    </div>
    
    <!-- Flashcard creation step (initially hidden) -->
    <div class="memora-step memora-step-flashcards memora-flashcards-container" style="display: none;">
      <div class="memora-flashcards-inner">
        <h2 class="memora-flashcard-header">Add Flashcards to <span class="memora-collection-name-display"></span></h2>
        
        <div class="memora-flashcard-container">
          <div class="memora-flashcard-form">
            <div class="memora-flashcard-inputs-vertical">
              <div class="memora-input-group">
                <label for="flashcard-question">Question</label>
                <textarea id="flashcard-question" class="memora-input" placeholder="Enter question..." maxlength="500"></textarea>
                <div class="memora-input-requirements">3-500 characters</div>
              </div>
              <div class="memora-input-group">
                <label for="flashcard-answer">Answer</label>
                <textarea id="flashcard-answer" class="memora-input" placeholder="Enter answer..." maxlength="1000"></textarea>
                <div class="memora-input-requirements">1-1000 characters</div>
              </div>
            </div>
            
            <div class="memora-buttons">
              <button class="memora-button memora-button-add-card">Add Card</button>
              <button class="memora-button memora-button-primary memora-button-finish">Finish</button>
            </div>
          </div>
          
          <div class="memora-added-cards">
            <h3>Added Cards</h3>
            <p class="memora-no-cards-message">No cards added yet. Add your first card using the form.</p>
            <ul class="memora-cards-list"></ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success message (initially hidden) -->
    <div class="memora-step memora-step-success memora-collection-form" style="display: none;">
      <div class="memora-success-message">
        <svg class="memora-success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12l2 2 6-6"></path>
        </svg>
        <h2>Collection Created Successfully!</h2>
        <p>Your collection has been created with <span class="memora-card-count">0</span> flashcards.</p>
        <button class="memora-button memora-button-primary memora-button-done">Done</button>
      </div>
    </div>
  </div>
`
