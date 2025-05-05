/**
 * @file A CSS template string for the memora-collection web component.
 * @module memora-collection.css
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
        --error: #ef4444;
        --danger: #ef4444;
        --danger-dark: #b91c1c;
        --danger-light: #fee2e2;
        display: block;
        width: 100%;
    }

    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .memora-collection {
        width: 100%;
        margin: 0 auto;
        animation: fade-in 0.3s ease-in-out;
    }

    .memora-view {
        animation: fade-in 0.3s ease-in-out;
        height: 100%;
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .memora-collection-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .memora-collection-title {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary);
    }

    .memora-collection-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 1200px;
        margin: 0 auto;
        flex-wrap: nowrap;
    }

    .memora-creation-view {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 32px;
        max-width: 600px;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
    }

    .memora-flashcards-view {
        width: 100%;
        max-width: 100%;
    }

    .memora-section {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 32px;
        width: 100%;
        box-sizing: border-box; 
        flex-shrink: 0; 
        min-width: 0;
    }

    .memora-section-title {
        font-size: 1.5rem;
        margin-bottom: 24px;
        color: var(--primary);
        padding-bottom: 12px;
        border-bottom: 1px solid var(--gray-light);
    }

    .memora-input-group {
        margin-bottom: 24px;
    }

    .memora-input-group label {
        display: block;
        margin-bottom: 10px;
        font-weight: 500;
        color: var(--text-dark);
    }

    .memora-input {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid var(--gray-light);
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s ease;
    }

    .memora-input:focus {
        outline: none;
        border-color: var(--primary);
    }

    textarea.memora-input {
        min-height: 100px;
        resize: vertical;
    }

    .memora-buttons {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .memora-button {
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid var(--gray-light);
        background-color: white;
        color: var(--text-dark);
    }

    .memora-button:hover {
        background-color: var(--gray-light);
    }

    .memora-button-primary {
        background-color: var(--primary);
        color: white;
        border: none;
    }

    .memora-button-primary:hover {
        background-color: var(--primary-dark);
    }

    .memora-button-secondary {
        border-color: var(--primary);
        color: var(--primary);
    }

    .memora-button-secondary:hover {
        background-color: var(--primary);
        color: white;
    }

    .memora-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .memora-error-message {
        color: var(--error);
        margin: 16px 0;
        padding: 12px 16px;
        border-radius: 8px;
        background-color: var(--danger-light);
        font-weight: 500;
        display: flex;
        align-items: center;
    }

    .memora-error-message::before {
        content: "⚠️";
        margin-right: 10px;
        font-size: 1.2rem;
    }

    .memora-input-requirements {
        font-size: 0.8rem;
        color: var(--gray);
        margin-top: 4px;
    }

    .memora-input.error {
        border-color: var(--error);
    }

    .memora-flashcard-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        width: 100%;
        margin: 0 auto;
    }

    .memora-collection-name-display {
        font-weight: bold;
        border-bottom: 2px dotted var(--primary);
        padding-bottom: 2px;
    }

    .memora-flashcard-inputs-vertical {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-bottom: 24px;
    }

    .memora-no-cards-message {
        font-style: italic;
        color: var(--gray);
        margin-bottom: 16px;
        min-height: 50px; /* Ensure message takes up space even when hidden */
        display: block; /* Always take up space in layout */
    }

    .memora-cards-list {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 12px;
    }

    .memora-card-item {
        padding: 16px;
        border: 1px solid var(--gray-light);
        border-radius: 8px;
        position: relative;
        transition: all 0.2s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--background);
        overflow: hidden;
        max-width: 100%;
        cursor: pointer;
    }

    .memora-card-item:hover {
        border-color: var(--primary);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .memora-card-question,
    .memora-card-answer {
        word-break: break-word;
        overflow-wrap: break-word;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .memora-card-question {
        font-weight: 600;
        margin-bottom: 12px;
    }

    .memora-card-answer {
        color: var(--primary-dark);
    }

    .memora-remove-card {
        position: absolute;
        top: 12px;
        right: 12px;
        background: transparent;
        border: none;
        color: var(--gray);
        cursor: pointer;
        padding: 5px;
        font-size: 1.2rem;
        line-height: 1;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        z-index: 10;
    }

    .memora-remove-card:hover {
        color: var(--error);
        background-color: var(--gray-light);
    }

    .memora-cards-container {
        min-height: 400px; 
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
    }

    .memora-notification-title {
        font-size: 1.5rem;
        margin-bottom: 12px;
        color: var(--text-dark);
    }

    .memora-notification-message {
        color: var(--text-dark);
        margin-bottom: 20px;
        font-size: 1rem;
        line-height: 1.5;
    }

    /* Notification styles */
    .memora-notification {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fade-in 0.3s ease;
    }

    .memora-notification-content {
        background-color: white;
        border-radius: 12px;
        padding: 24px;
        width: 90%;
        max-width: 500px;
        text-align: center;
        position: relative;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .memora-notification-close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
        color: var(--gray);
    }

    .memora-notification-close:hover {
        color: var(--text-dark);
    }

    .memora-notification-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 16px;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
    }

        /* Divider */
    .memora-divider {
        position: relative;
        text-align: center;
        margin: 28px 0;
    }
    
    .memora-divider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background-color: var(--gray-light);
    }
    
    .memora-divider-text {
        position: relative;
        display: inline-block;
        padding: 0 16px;
        background-color: white;
        color: var(--gray);
        font-size: 0.9rem;
    }
    
    /* Browse button */
    .memora-browse-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 12px;
        border: 1px dashed var(--secondary);
        background-color: transparent;
        border-radius: 8px;
        color: var(--secondary);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .memora-browse-button:hover {
        background-color: rgba(245, 158, 11, 0.05); 
    }

    .memora-mini-badge {
        background-color: var(--secondary);
        color: white;
        font-size: 0.7rem;
        padding: 3px 8px;
        border-radius: 12px;
        margin-left: 8px;
    }


    
    .memora-browse-icon {
        font-size: 1.2rem;
        margin-right: 10px;
    }
    
    .memora-browse-text {
        font-size: 1rem;
    }

    /* Responsive layout for flashcards container */
    @media (min-width: 992px) {
        .memora-flashcard-container {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
        }
        
        .memora-flashcard-form {
            width: 40%;
            flex: 0 0 40%;
            position: sticky;
            top: 20px;
        }
        
        .memora-cards-list-section {
            width: 55%;
            flex: 0 0 55%;
        }
        
        .memora-cards-list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .memora-section {
            padding: 24px;
        }

        .memora-buttons {
            flex-direction: column-reverse;
        }

        .memora-button {
            width: 100%;
        }
    }
</style>
`
