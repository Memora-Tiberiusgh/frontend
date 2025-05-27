/**
 * @file A CSS template string for the memora-public web component.
 * @module memora-public.css
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
        --danger: #ef4444;
        --danger-dark: #b91c1c;
        --danger-light: #fee2e2;
        display: block;
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .memora-collection {
        width: 100%;
        margin: 0 auto;
        animation: fade-in 0.3s ease-in-out;
    }

    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .memora-breadcrumb-nav {
        margin-bottom: 16px;
    }

    .memora-breadcrumb-link {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-dark);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .memora-breadcrumb-link:hover {
        color: var(--primary);
    }

    .memora-back-icon {
        margin-right: 8px;
    }
    
    /* Collection header styles */
    .memora-settings-header {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .memora-collection-title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary);
        margin: 0;
        text-align: center;
    }
    
    .memora-settings-container {
        display: flex;
        flex-direction: column;
        max-width: 1200px;
        margin: 0 auto;
        gap: 32px;
    }
    
    /* Section container style */
    .memora-section {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 32px;
        width: 100%;
        box-sizing: border-box;
    }
    
    /* Collection grid styles */
    .memora-collections-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        margin-bottom: 32px;
        width: 100%;
    }

    /* For 1 card only - center it */
    .memora-collections-grid.single-card {
        grid-template-columns: minmax(300px, 400px);
        justify-content: center;
    }

    /* For 2 cards - arrange them nicely */
    .memora-collections-grid.two-cards {
        grid-template-columns: repeat(2, minmax(280px, 400px));
        justify-content: center;
    }

    /* For 3 cards - three columns */
    .memora-collections-grid.three-cards {
        grid-template-columns: repeat(3, minmax(250px, 350px));
        justify-content: center;
    }
    
    /* No more collections indicator */
    .memora-no-more-collections {
        margin: 20px 0 10px;
        text-align: center;
    }
    
    .memora-end-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 10px 0;
    }
    
    .memora-end-indicator:before,
    .memora-end-indicator:after {
        content: '';
        height: 1px;
        background-color: var(--gray-light);
        flex-grow: 1;
    }
    
    .memora-end-text {
        font-size: 0.875rem;
        color: var(--gray);
        padding: 0 16px;
        font-weight: 500;
    }
    
    /* Card styles */
    .memora-collection-card {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;
        height: 100%;
        border: 1px solid var(--gray-light);
    }
    
    .memora-collection-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
        border-color: var(--primary);
    }
    
    .memora-card-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
    .memora-card-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }
    
    .memora-card-title-container {
        display: flex;
        align-items: center;
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 0;
    }

    .memora-card-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--primary);
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .memora-card-badge {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        color: var(--text-dark);
    }
    
    .memora-card-icon {
        color: var(--text-dark);
        margin-right: 4px;
    }
    
    .memora-card-label {
        margin-left: 4px;
    }
    
    .memora-card-description {
        color: var(--text-dark);
        font-size: 0.875rem;
        margin-bottom: 12px;
        flex-grow: 1;
        
        /* For truncated descriptions */
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5;
        max-height: 4.5em; /* 3 lines x 1.5 line height */
    }
    
    .memora-card-footer {
        display: flex;
        justify-content: space-between;
        margin-top: auto;
        font-size: 0.875rem;
        color: var(--gray);
    }
    
    .memora-card-meta {
        display: flex;
        align-items: center;
    }
    
    .memora-user-icon, .memora-calendar-icon {
        margin-right: 6px;
    }
    
    /* Button styles */
    .memora-button {
        border-radius: 8px;
        padding: 10px 16px;
        font-weight: 500;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        outline: none;
    }
    
    .memora-button-primary {
        background-color: var(--primary);
        color: white;
    }
    
    .memora-button-primary:hover {
        background-color: var(--primary-dark);
    }
    
    .memora-button-secondary {
        background-color: white;
        border: 1px solid var(--gray-light);
        color: var(--text-dark);
    }
    
    .memora-button-secondary:hover {
        background-color: var(--gray-light);
    }
    
    /* Detail view specific styles */
    .memora-detail-view {
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
    }
    
    .memora-detail-container {
        width: 100%;
    }
    
    .memora-detail-header {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
    }
    
    .memora-back-icon {
        margin-right: 8px;
    }
    
    .memora-detail-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
        margin: 0;
    }
    
    .memora-description-container {
        background-color: var(--background);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
    }
    
    .memora-description-text {
        color: var(--text-dark);
        max-height: 200px;
        overflow-y: auto;
        margin: 0;
    }
    
    .memora-meta-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 24px;
    }
    
    .memora-meta-item {
        background-color: var(--background);
        padding: 12px;
        border-radius: 8px;
    }
    
    .memora-meta-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--gray);
        display: block;
        margin-bottom: 4px;
    }
    
    .memora-meta-value {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-dark);
        margin: 0;
    }
    
    .memora-cards-count {
        color: var(--primary);
    }
    
    .memora-section-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 16px;
    }
    
    .memora-preview-section {
        margin-bottom: 24px;
    }
    
    .memora-preview-cards {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
    }
    
    .memora-preview-card {
        background-color: var(--background);
        border-radius: 8px;
        border: 1px solid var(--gray-light);
        overflow: hidden;
    }
    
    .memora-preview-question {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    
    .memora-question-text {
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-dark);
        margin: 0;
        flex-grow: 1;
    }
    
    .memora-toggle-button {
        background-color: var(--gray-light);
        border: none;
        color: var(--gray);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .memora-toggle-button:hover {
        background-color: var(--primary);
        color: white;
    }
    
    .memora-preview-answer {
        padding: 0 16px 16px;
        border-top: 1px solid var(--gray-light);
    }
    
    .memora-answer-label {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--gray);
    }
    
    .memora-answer-text {
        font-size: 1rem;
        color: var(--text-dark);
        margin-top: 8px;
    }
    
    .memora-action-buttons {
        display: flex;
        gap: 16px;
    }
    
    .memora-add-button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .memora-add-icon {
        margin-right: 4px;
    }

    /* Back button styles */
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
    .memora-breadcrumb-nav {
        margin-bottom: 16px;
    }

    .memora-breadcrumb-style {
        padding: 4px 8px;
    }

    /* View styles */
    .memora-view {
        animation: fade-in 0.3s ease-in-out;
    }

    /* Already in-collection indicators */
    .memora-card-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 12px;
    }

    .memora-card-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--primary);
        margin: 0;
        margin-right: auto;
        max-width: 60%;
    }

    .memora-library-tag {
        display: inline-flex;
        background-color: var(--primary);
        color: white;
        font-size: 0.65rem;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-left: 8px;
        align-items: center;
        flex-shrink: 0;
    }

    .memora-card-badge {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        color: var(--text-dark);
        margin-left: auto;
        flex-shrink: 0;
    }

    /* Detail view tag */
    .memora-detail-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 24px;
    }

    .memora-detail-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
        margin: 0;
        margin-right: 10px;
    }

    .memora-detail-tag {
        margin-bottom: 0;
    }

    .memora-detail-title-container {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
    }

    .memora-detail-tag {
        margin-bottom: 0;
    }

    /* Disabled button styling */
    .memora-button-disabled {
        background-color: var(--gray-light);
        color: var(--gray);
        cursor: not-allowed;
        opacity: 0.8;
    }

    .memora-button-disabled:hover {
        background-color: var(--gray-light);
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
        .memora-section {
            padding: 24px;
        }
        
        .memora-meta-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .memora-action-buttons {
            flex-direction: column;
        }
    }

    @media (max-width: 480px) {
        .memora-collections-grid.two-cards,
        .memora-collections-grid.three-cards {
            grid-template-columns: minmax(280px, 1fr);
        }
    }
</style>
`
