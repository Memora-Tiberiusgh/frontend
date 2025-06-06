/**
 * @file A CSS template string for the memora-settings web component.
 * @module memora-settings.css
 */
// Define the CSS template.
export const cssTemplate = document.createElement('template')
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
        --success: #10b981;
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

    .memora-settings {
        width: 100%;
        margin: 0 auto;
        animation: fade-in 0.3s ease-in-out;
    }

    .memora-view {
        animation: fade-in 0.3s ease-in-out;
        height: 100%;
    }

    .memora-general-settings-view,
    .memora-add-card-view,
    .memora-edit-card-view {
        min-height: 600px; /* Set fixed height for all views */
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .memora-settings-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .memora-settings-title {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary);
    }

    .memora-settings-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 1200px;
        margin: 0 auto;
        flex-wrap: nowrap;
    }

    @media (min-width: 992px) {
        .memora-settings-container {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;
        }

        .memora-collection-settings {
            width: 40%;
            flex: 0 0 40%; 
            position: sticky;
            top: 20px;
            min-height: 650px;
            min-width: 400px;
        }

        .memora-cards-list-section {
            width: 55%;
            flex: 0 0 55%; 
            min-height: 650px;
            overflow: auto;
            min-width: 500px;
        }
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

    .memora-subsection-title {
        font-size: 1.2rem;
        margin-bottom: 16px;
        color: var(--text-dark);
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

    .memora-button-danger {
        background-color: var(--danger);
        color: white;
        border: none;
    }

    .memora-button-danger:hover {
        background-color: var(--danger-dark);
    }

    .memora-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .memora-error-message {
        color: var(--error);
        margin-top: 12px;
        font-size: 0.9rem;
    }

    .memora-input-requirements {
        font-size: 0.8rem;
        color: var(--gray);
        margin-top: 4px;
    }

    .memora-input.error {
        border-color: var(--error);
    }

    .memora-delete-section {
        margin-top: 24px;
        padding: 20px;
        border-radius: 8px;
        background-color: var(--danger-light);
        border: 1px solid var(--danger);
    }

    .memora-danger-title {
        color: var(--danger);
        margin-bottom: 10px;
        font-size: 1.1rem;
    }

    .memora-danger-description {
        color: var(--text-dark);
        margin-bottom: 16px;
        font-size: 0.9rem;
    }

    .memora-card-management-section,
    .memora-visibility-section {
        margin-top: 24px;
        margin-bottom: 24px;
        padding-top: 20px;
        border-top: 1px solid var(--gray-light);
    }

    .memora-visibility-description {
        color: var(--text-dark);
        margin-bottom: 16px;
        font-size: 0.9rem;
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

    @media (min-width: 768px) {
        .memora-cards-list {
            grid-template-columns: repeat(2, 1fr);
        }
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
        background-color: var(--success);
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
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

    /* Breadcrumb navigation styles */
    .memora-breadcrumb-nav {
        margin-bottom: 16px;
    }

    .memora-back-button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-dark);
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 6px;
        transition: all 0.2s ease;
    }

    .memora-back-button:hover {
        background-color: rgba(99, 102, 241, 0.08);
        color: var(--primary);
    }

    .memora-back-button:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }

    .memora-back-icon {
        font-size: 1.125rem;
        margin-right: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .memora-back-text {
        font-weight: 500;
    }

    /* Breadcrumb specific styles */
    .memora-breadcrumb-style {
        padding: 4px 8px;
    }

    /* Enhanced error message styles */
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

    .memora-submission-status {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background-color: #f0fdf4;
        border: 1px solid var(--success);
        border-radius: 8px;
        margin-bottom: 16px;
    }

    .memora-status-icon {
        color: var(--success);
        font-weight: bold;
        margin-right: 12px;
        font-size: 1.2rem;
    }

    .memora-submission-status p {
        margin: 0;
        color: var(--text-dark);
        font-weight: 500;
    }

    .memora-button-accent {
        background-color: var(--secondary);
        color: white;
        border: none;
    }

    .memora-button-accent:hover {
        background-color: #e68a00; 
        color: white;
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
