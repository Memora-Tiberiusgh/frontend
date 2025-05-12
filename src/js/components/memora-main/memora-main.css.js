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
    .memora-collections-title {
        cursor: default;
    }

    .memora-logo {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--primary);
        margin-bottom: 30px;
        cursor: default;
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
        overflow-x: hidden;
    }

    .memora-collection-item {
        padding: 12px 15px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    }

    .memora-collection-item:hover {
        background-color: var(--gray-light);
    }

    .memora-collection-item.active {
        background-color: var(--primary);
        color: white;
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

    .memora-welcome-screen {
        cursor: default;
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

    .memora-collection-name-text {
        flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8px;
    }

    .memora-settings-icon {
        color: var(--gray);
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.2s ease;
        margin-left: 8px;
        display: none;
    }

    .memora-collection-item:hover .memora-settings-icon {
        display: block;
    }

    .memora-settings-icon:hover {
        color: var(--primary);
        opacity: 1;
        transform: rotate(45deg);
    }

    .memora-collection-item.active .memora-settings-icon {
        color: white;
        opacity: 1;
    }

    /* Make sure the icon still displays on hover when active */
    .memora-collection-item.active:hover .memora-settings-icon {
        display: block;
    }

    /* Style for hover effect that works with both active and inactive */
    .memora-collection-item .memora-settings-icon:hover {
        transform: rotate(45deg);
    }

/* Position the public badge for animation */
.memora-collection-item.public {
    position: relative;
    overflow: hidden; /* Ensure the transition doesn't cause overflow */
}

/* Style the public badge with transition */
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
    transition: transform 0.3s ease;
}

/* Style the remove icon (initially off-screen to the right) */
.memora-remove-icon {
    position: absolute;
    right: -25px; /* Start off-screen */
    top: 50%;
    transform: translateY(-50%);
    color: #e53935; /* Red color for delete action */
    cursor: pointer;
    transition: right 0.3s ease, transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

/* On hover, slide the badge left and bring in the remove icon */
.memora-collection-item.public:hover .memora-public-badge {
    transform: translateY(-50%) translateX(-30px); /* Move left to make space */
}

.memora-collection-item.public:hover .memora-remove-icon {
    right: 15px; /* Move into view */
}

/* Add a scale effect on hover for the remove icon */
.memora-remove-icon:hover {
    transform: translateY(-50%) scale(1.2);
}

/* Ensure the icon is white when collection is active */
.memora-collection-item.active .memora-remove-icon {
    color: white;
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
