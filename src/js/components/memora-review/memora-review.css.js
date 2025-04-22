/**
 * @file A CSS template string for the memora-review web component.
 * @module memora-review.css
 */
// Define the CSS template.
export const cssTemplate = document.createElement("template")
cssTemplate.innerHTML = `
<style>
        :host {
        --primary: #6366f1;
        --primary-dark: #4f46e5;
        --secondary: #f59e0b;
        --text-dark: #1f2937;
        --text-light: #f9fafb;
        --background: #f9fafb;
        --gray-light: #e5e7eb;
        --gray: #9ca3af;
    }

    /* Reset */
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE/Edge */
        user-select: none; /* Standard syntax */
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
    }

    /* Main content */
    .memora-flashcard-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        user-select: none;
        width: 100%;
    }

    .memora-collection-header {
        text-align: center;
        margin-bottom: 40px;
        user-select: none;
        cursor: default;
    }

    .memora-collection-name {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .memora-collection-meta {
        font-size: 1rem;
        color: var(--gray);
    }

    .memora-flashcard-container {
        width: 100%;
        max-width: 600px;
    }

    .memora-flashcard {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        margin-bottom: 30px;
    }

    .memora-flashcard-header {
        padding: 20px;
        background-color: var(--primary);
        color: white;
        text-align: center;
        font-weight: 600;
        cursor: default;
    }

    .memora-flashcard-body {
        padding: 30px;
        cursor: default;
    }

    .memora-flashcard-question {
        font-size: 1.4rem;
        text-align: center;
        margin-bottom: 40px;
        font-weight: 500;
    }

    .memora-divider {
        margin: 25px 0;
        border: 0;
        height: 1px;
        background-color: var(--gray-light);
    }

    .memora-flashcard-answer {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--primary-dark);
    }

    .memora-flashcard-footer {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid var(--gray-light);
    }

    .memora-navigation-button {
        padding: 10px 20px;
        border-radius: 8px;
        background-color: var(--primary);
        color: white;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .memora-navigation-button:hover {
        background-color: var(--primary-dark);
    }

    .memora-navigation-button.prev {
        background-color: var(--gray-light);
        color: var(--text-dark);
    }

    .memora-navigation-button.prev:hover {
        background-color: var(--gray);
        color: white;
    }

    .memora-navigation-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
`
