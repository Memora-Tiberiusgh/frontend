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
                <div class="memora-flashcard-header">
                    Flashcard
                </div>
                <div class="memora-flashcard-body">
                    <div class="memora-flashcard-question"></div>
                    <hr class="memora-divider">
                    <div class="memora-flashcard-answer"></div>
                </div>
                <div class="memora-flashcard-footer">
                    <button class="memora-navigation-button prev">Previous Card</button>
                    <button class="memora-navigation-button next">Next Card</button>
                </div>
            </div>
        </div>
    </div>
`
