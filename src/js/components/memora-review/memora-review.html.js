/**
 * @file The HTML template for the memora-review web component.
 * @module memora-review.html
 */
// Define the HTML template.
export const htmlTemplate = document.createElement("template")
htmlTemplate.innerHTML = `
    <div class="memora-flashcard-view">
        <div class="memora-collection-header">
            <h1 class="memora-collection-name"></h1>
            <div class="memora-collection-meta"></div>
        </div>
        
        <div class="memora-flashcard-container">
            <div class="memora-flashcard">
                <div class="memora-flashcard-body">
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
`
