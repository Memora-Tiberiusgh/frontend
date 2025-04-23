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
        --secondary-dark: #e67e22;
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
        width: 100%;
        animation: fade-in 0.3s ease-in-out;
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .memora-collection-header {
        text-align: center;
        margin-bottom: 40px;
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
        display: flex;
        flex-direction: column;
        height: 520px;
    }

    .memora-flashcard-body {
        padding: 30px;
        cursor: default;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        position: relative;
    }

    .memora-flashcard-question-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        padding: 10px;
        height: 100%;
    }

    .memora-flashcard-question {
        font-size: 0.9rem;
        text-align: center;
        font-weight: 500;
        word-break: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    .memora-flashcard-answer-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin-top: 20px;
        transition: opacity 0.3s ease, height 0.3s ease;
        opacity: 0;
        height: 0;
        overflow: hidden;
    }

    .memora-flashcard-answer-container.revealed {
        opacity: 1;
        height: auto;
        border-top: 1px solid var(--gray-light);
        padding-top: 20px;
    }

    .memora-flashcard-answer {
        text-align: center;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--primary-dark);
        word-break: break-word;
        overflow-wrap: break-word;
        width: 100%;
        hyphens: auto;
        display: none;
    }
    
    .memora-flashcard-answer-container.revealed .memora-flashcard-answer {
        display: block;
    }

    .memora-flashcard-footer {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid var(--gray-light);
        flex-shrink: 0;
        gap: 15px;
        background-color: #f8f9fa;
    }

    .memora-controls-left,
    .memora-controls-center,
    .memora-controls-right {
        flex: 1;
        display: flex;
        justify-content: center;
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
        width: 100px; /* Fixed width */
        text-align: center;
    }

    .memora-navigation-button:hover:not(:disabled) {
        background-color: var(--primary-dark);
    }

    .memora-navigation-button.prev {
        background-color: var(--gray-light);
        color: var(--text-dark);
    }

    .memora-navigation-button.prev:hover:not(:disabled) {
        background-color: var(--gray);
        color: white;
    }

    .memora-navigation-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Reveal button styles */
    .memora-reveal-button {
        padding: 10px 20px;
        border-radius: 8px;
        background-color: var(--secondary);
        color: white;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 150px; 
        text-align: center;
    }

    .memora-reveal-button:hover:not(:disabled) {
        background-color: var(--secondary-dark);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .memora-reveal-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    /* Loading and error states */
    .memora-loading,
    .memora-error {
        text-align: center;
        color: var(--text-dark);
    }
    
    /* Scrollbar styling */
    .memora-flashcard-question-container::-webkit-scrollbar,
    .memora-flashcard-answer::-webkit-scrollbar {
        width: 6px;
    }
    
    .memora-flashcard-question-container::-webkit-scrollbar-track,
    .memora-flashcard-answer::-webkit-scrollbar-track {
        background: var(--gray-light);
        border-radius: 3px;
    }
    
    .memora-flashcard-question-container::-webkit-scrollbar-thumb,
    .memora-flashcard-answer::-webkit-scrollbar-thumb {
        background: var(--gray);
        border-radius: 3px;
    }
    
    .memora-flashcard-question-container::-webkit-scrollbar-thumb:hover,
    .memora-flashcard-answer::-webkit-scrollbar-thumb:hover {
        background: var(--primary);
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .memora-flashcard {
            min-height: 400px;
            max-height: 480px;
        }
        
        .memora-flashcard-footer {
            flex-direction: column;
            gap: 15px;
        }
        
        .memora-controls-left,
        .memora-controls-center,
        .memora-controls-right {
            justify-content: center;
        }
        
        .memora-navigation-button,
        .memora-reveal-button {
            width: 100%;
        }
    }
</style>
`
