/**
 * @file A CSS template string for the memora-main web component.
 * @module memora-main.css
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

    /* Global styles */
    html, body {
        height: 100%;
        background-color: var(--background);
        color: var(--text-dark);
    }

    /* Main container */
    .memora-app {
        display: flex;
        width: 100%;
        height: 100vh;
        min-height: 100%; /* Ensure minimum height */
    }

    /* Sidebar styles */
    .memora-sidebar {
        width: 300px;
        background-color: white;
        border-right: 1px solid var(--gray-light);
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        user-select: none;
    }

    .memora-user-profile,
    .memora-collections-title,
    .memora-collection-header {
        cursor: default;
    }

    .memora-logo {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--primary);
        margin-bottom: 30px;
    }

    .memora-collections-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .memora-collections-list {
        list-style: none;
        flex-grow: 1;
        overflow-y: auto;
    }

    .memora-collection-item {
        padding: 12px 15px;
        margin-bottom: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .memora-collection-item:hover {
        background-color: var(--gray-light);
    }

    .memora-collection-item.active {
        background-color: var(--primary);
        color: white;
    }

    .memora-collection-item.public {
        position: relative;
    }

    .memora-public-badge {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--secondary);
        color: white;
        font-size: 0.7rem;
        padding: 3px 8px;
        border-radius: 12px;
    }

    /* User profile */
    .memora-user-profile {
        display: flex;
        align-items: center;
        margin-top: auto;
        padding: 15px 10px;
        border-top: 1px solid var(--gray-light);
    }

    .memora-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        margin-right: 10px;
    }

    .memora-user-info {
        flex: 1;
    }

    .memora-user-name {
        font-weight: 500;
        font-size: 0.9rem;
    }

    .memora-user-email {
        font-size: 0.8rem;
        color: var(--gray);
    }

    /* Main content */
    .memora-main-content {
        flex: 1;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        user-select: none;
    }

    .memora-collection-header {
        text-align: center;
        margin-bottom: 40px;
        user-select: none;
        cursor: default;
    }

    .memora-flashcard-header,
    .memora-logo,
    .memora-flashcard-body,
    .memora-welcome-screen {
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
    }

    .memora-flashcard-body {
        padding: 30px;
    }

    .memora-flashcard-question {
        font-size: 1.4rem;
        text-align: center;
        margin-bottom: 40px;
        font-weight: 500;
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

    .memora-add-collection-btn {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        margin-bottom: 20px;
        background-color: transparent;
        border: 2px dashed var(--gray-light);
        border-radius: 8px;
        color: var(--gray);
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 100%;
    }

    .memora-add-collection-btn:hover {
        border-color: var(--primary);
        color: var(--primary);
    }

    .memora-add-icon {
        font-size: 1.2rem;
        margin-right: 8px;
        font-weight: bold;
    }

    .memora-sidebar {
        display: flex;
        flex-direction: column;
    }

    .memora-collections-list {
        flex-grow: 1;
        overflow-y: auto;
        margin-bottom: 15px;
    }

    .memora-user-profile {
        margin-top: auto;
        border-top: 1px solid var(--gray-light);
    }

    .memora-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .memora-logo {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--primary);
        margin-bottom: 0;
    }

    .memora-social-icons {
        display: flex;
        gap: 12px;
    }

    .memora-social-icon {
        color: var(--gray);
        transition: color 0.2s ease;
    }

    .memora-social-icon:hover {
        color: var(--primary);
    }

    .memora-user-profile {
        display: flex;
        align-items: center;
        padding: 15px 10px;
        border-top: 1px solid var(--gray-light);
    }

    .memora-logout-btn {
        margin-left: auto;
        background-color: transparent;
        border: none;
        padding: 5px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--gray);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .memora-logout-btn:hover {
        color: var(--primary);
        background-color: var(--gray-light);
    }

    .memora-logout-icon {
        width: 16px;
        height: 16px;
        display: block;
    }

    .memora-loading-message, .memora-error-message {
        padding: 10px;
        color: var(--text-dark);
        font-style: italic;
    }

    .memora-error-message {
        color: var(--error, #e53935);
    }

    /* Responsive styles */
    @media (max-width: 992px) {
        .memora-app {
            flex-direction: column;
        }

        .memora-sidebar {
            width: 100%;
            height: auto;
            max-height: 300px;
            border-right: none;
            border-bottom: 1px solid var(--gray-light);
        }
    }
</style>
`
