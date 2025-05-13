/**
 * @file A HTML template string for the memora-collection web component.
 * @module memora-collection.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
<div class="memora-collection">
  <div class="memora-collection-header">
    <h1 class="memora-collection-title">Create New Collection</h1>
  </div>
  
  <div class="memora-collection-container">
    <!-- Collection creation view -->
    <div class="memora-view memora-creation-view">
      <h2 class="memora-section-title">Collection Details</h2>
      
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
      
      <!-- Error message positioned before buttons -->
      <p class="memora-error-message" style="display: none;"></p>
      
      <div class="memora-buttons">
        <button class="memora-button memora-button-cancel">Cancel</button>
        <button class="memora-button memora-button-primary memora-button-create">Create Collection</button>
      </div>
      
      <!-- Divider -->
      <div class="memora-divider">
        <span class="memora-divider-text">or</span>
      </div>
      
      <!-- Browse public collections button -->
      <button class="memora-browse-button">
        <span class="memora-browse-text">Browse Public Collections</span>
      </button>
    </div>
    
    <!-- Flashcard creation view (initially hidden) -->
    <div class="memora-view memora-flashcards-view" style="display: none;">
      <h2 class="memora-section-title">Add Flashcards to <span class="memora-collection-name-display"></span></h2>
      
      <div class="memora-flashcard-container">
        <div class="memora-section memora-flashcard-form">
          <div class="memora-flashcard-inputs-vertical">
            <div class="memora-input-group">
              <label for="flashcard-question">Question</label>
              <textarea id="flashcard-question" class="memora-input" placeholder="Enter question..." maxlength="500"></textarea>
              <div class="memora-input-requirements">1-500 characters</div>
            </div>
            
            <div class="memora-input-group">
              <label for="flashcard-answer">Answer</label>
              <textarea id="flashcard-answer" class="memora-input" placeholder="Enter answer..." maxlength="1000"></textarea>
              <div class="memora-input-requirements">1-1000 characters</div>
            </div>
          </div>
          
          <!-- Error message positioned before buttons -->
          <p class="memora-error-message" style="display: none;"></p>
          
          <div class="memora-buttons">
            <button class="memora-button memora-button-finish">Finish</button>
            <button class="memora-button memora-button-primary memora-button-add-card">Add Card</button>
          </div>
        </div>
        
        <div class="memora-section memora-cards-list-section">
          <h2 class="memora-section-title">Added Cards</h2>
          <div class="memora-cards-container">
            <p class="memora-no-cards-message">No cards added yet. Add your first card using the form.</p>
            <ul class="memora-cards-list"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
