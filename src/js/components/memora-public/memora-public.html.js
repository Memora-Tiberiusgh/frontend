/**
 * @file The HTML template for the memora-public web component.
 * @module memora-public.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
<div class="memora-collection">
  <div class="memora-settings-header">
    <h1 class="memora-collection-title">Public Collections</h1>
  </div>
  
  <div class="memora-settings-container">
    <!-- Main collections grid view -->
    <div class="memora-view memora-grid-view">
      <div class="memora-section">
        <!-- Collections grid with improved centering -->
        <div class="memora-collections-grid"></div>
        
        <!-- Load more button -->
        <div class="memora-load-more">
          <button class="memora-button memora-button-primary memora-button-load-more">Load More Collections</button>
        </div>
      </div>
    </div>
    
    <!-- Collection detail view (initially hidden) -->
    <div class="memora-view memora-detail-view" style="display: none;">
      <div class="memora-section memora-detail-container">
        <div class="memora-breadcrumb-nav">
          <button class="memora-back-button memora-breadcrumb-style">
            <span class="memora-back-icon">←</span>
            <span class="memora-back-text">Return to Collections</span>
          </button>
        </div>

        <div class="memora-detail-header">
          <h2 class="memora-detail-title"></h2>
        </div>
        
        <div class="memora-detail-content">
          <div class="memora-description-container">
            <p class="memora-description-text"></p>
          </div>
          
          <div class="memora-meta-grid">
            <div class="memora-meta-item">
              <span class="memora-meta-label">Cards</span>
              <p class="memora-meta-value memora-cards-count"></p>
            </div>
            
            <div class="memora-meta-item">
              <span class="memora-meta-label">Created</span>
              <p class="memora-meta-value memora-created-date"></p>
            </div>
            
            <div class="memora-meta-item">
              <span class="memora-meta-label">Created By</span>
              <p class="memora-meta-value memora-creator-name"></p>
            </div>
          </div>
          
          <div class="memora-preview-section">
            <h3 class="memora-section-title">Preview Cards</h3>
            <div class="memora-preview-cards"></div>
            
            <div class="memora-view-all">
              <button class="memora-button memora-button-secondary memora-view-all-button">
                View all <span class="memora-all-cards-count"></span> cards
              </button>
            </div>
          </div>
          
          <div class="memora-action-buttons">
            <button class="memora-button memora-button-primary memora-import-button">
                <svg class="memora-import-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 4L12 16M12 16L16 11M12 16L8 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>    
            Import Collection</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Templates -->
  <template id="collection-card-template">
    <div class="memora-collection-card">
      <div class="memora-card-content">
        <div class="memora-card-header">
          <h3 class="memora-card-title"></h3>
          <div class="memora-card-badge">
            <span class="memora-star-icon">★</span>
            <span class="memora-card-count"></span>
            <span class="memora-card-label">cards</span>
          </div>
        </div>
        
        <p class="memora-card-description"></p>
        
        <div class="memora-card-footer">
          <div class="memora-card-meta memora-owner-meta">
            <svg class="memora-user-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="memora-owner-name"></span>
          </div>
          <div class="memora-card-meta memora-date-meta">
            <svg class="memora-calendar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7V3M16 7V3M5 11H19M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="memora-creation-date"></span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <template id="preview-card-template">
    <div class="memora-preview-card">
      <div class="memora-preview-question">
        <p class="memora-question-text"></p>
        <button class="memora-toggle-button">
          <span class="memora-toggle-icon">↓</span>
        </button>
      </div>
      <div class="memora-preview-answer" style="display: none;">
        <span class="memora-answer-label">Answer:</span>
        <p class="memora-answer-text"></p>
      </div>
    </div>
  </template>
</div>
`
