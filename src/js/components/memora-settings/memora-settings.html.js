/**
 * @file The HTML template for the memora-settings web component.
 * @module memora-settings.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
<div class="memora-settings">
  <div class="memora-settings-header">
    <h1 class="memora-settings-title">Collection Settings</h1>
  </div>
  
  <div class="memora-settings-container">
    <!-- Collection settings section -->
    <div class="memora-section memora-collection-settings">
      <!-- General settings view -->
      <div class="memora-view memora-general-settings-view">
        <h2 class="memora-section-title">General Settings</h2>
        
        <div class="memora-input-group">
          <label for="collection-name" class="memora-label">Collection Name</label>
          <input type="text" id="collection-name" class="memora-input" placeholder="Enter collection name..." maxlength="50">
          <div class="memora-input-requirements">1-50 characters</div>
        </div>
        
        <div class="memora-input-group">
          <label for="collection-description" class="memora-label">Description</label>
          <textarea id="collection-description" class="memora-input" placeholder="Enter collection description..." maxlength="500"></textarea>
          <div class="memora-input-requirements">0-500 characters</div>
        </div>
        
        <div class="memora-buttons">
          <button class="memora-button memora-button-cancel">Cancel</button>
          <button class="memora-button memora-button-primary memora-button-save">Save Changes</button>
        </div>
        
        <div class="memora-card-management-section">
          <h3 class="memora-subsection-title">Card Management</h3>
          <button class="memora-button memora-button-secondary memora-button-add-new-card">
            Add New Card
          </button>
        </div>
        
        <div class="memora-delete-section">
          <h3 class="memora-danger-title">Danger Zone</h3>
          <p class="memora-danger-description">This action cannot be undone. This will permanently delete the collection and all its flashcards.</p>
          <button class="memora-button memora-button-danger memora-button-delete">Delete Collection</button>
        </div>
        
        <p class="memora-error-message" style="display: none;"></p>
      </div>
      
      <!-- Add card view (initially hidden) -->
      <div class="memora-view memora-add-card-view" style="display: none;">
        <h2 class="memora-section-title">Add New Card</h2>
        
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
          <button class="memora-button memora-button-back">Back to Settings</button>
          <button class="memora-button memora-button-primary memora-button-add-card">Add Card</button>
        </div>
      </div>
    </div>
    
    <!-- Cards list section -->
    <div class="memora-section memora-cards-list-section">
      <h2 class="memora-section-title">Current Cards</h2>
      <div class="memora-cards-container">
        <p class="memora-no-cards-message">No cards in this collection yet. Add your first card using the Add New Card button.</p>
        <ul class="memora-cards-list"></ul>
      </div>
    </div>
  </div>
</div>
`
