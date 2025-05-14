/**
 * @file The HTML template for the memora-review web component.
 * @module memora-review.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
    <div class="memora-flashcard-view">
        <div class="memora-content-wrapper">
            <div class="memora-collection-header">
                <h1 class="memora-collection-name"></h1>
                <div class="memora-collection-meta"></div>
            </div>
            
            <div class="memora-flashcard-container">
                <div class="memora-flashcard">
                    <div class="memora-flashcard-body">
                        <div class="memora-corner-actions">
                            <button class="memora-corner-button random" title="Random Card">
                                <svg class="memora-icon" viewBox="0 0 24 24">
                                    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm0.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path>
                                </svg>
                            </button>
                            <button class="memora-corner-button bookmark" title="Bookmark Card">
                                <svg class="memora-icon" viewBox="0 0 24 24">
                                    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
                                </svg>
                            </button>
                            <button class="memora-corner-button summary" title="View Summary">
                                <svg class="memora-icon" viewBox="0 0 24 24">
                                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="memora-flashcard-question-container">
                            <div class="memora-flashcard-question"></div>
                        </div>
                        <div class="memora-flashcard-answer-container">
                            <div class="memora-flashcard-answer"></div>
                        </div>
                    </div>
                    <div class="memora-flashcard-footer">
                        <div class="memora-controls-left">
                            <button class="memora-navigation-button prev">Previous</button>
                        </div>
                        <div class="memora-controls-center">
                            <button class="memora-reveal-button">Reveal Answer</button>
                        </div>
                        <div class="memora-controls-right">
                            <button class="memora-navigation-button next">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="memora-summary-view">
        <div class="memora-summary-container">
            <div class="memora-breadcrumb-nav">
                <button class="memora-back-button memora-breadcrumb-style">
                    <span class="memora-back-icon">←</span>
                    <span class="memora-back-text">Return to Cards</span>
                </button>
            </div>
            
            <div class="memora-summary-header">
                <h1 class="memora-summary-title">Bookmarked Flashcards</h1>
                <p class="memora-summary-subtitle">You've bookmarked <span class="memora-bookmarked-count">0</span> flashcards from this collection</p>
            </div>
            
            <div class="memora-bookmarked-list">
                <!-- Bookmarked cards will be populated here dynamically -->
            </div>
        </div>
    </div>
`
