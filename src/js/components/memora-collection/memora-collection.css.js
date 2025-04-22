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
    --success: #10b981;
  }
  
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .memora-collection-creator {
    width: 100%;
    margin: 0 auto;
    animation: fade-in 0.3s ease-in-out;
  }
  
  .memora-step {
    width: 100%;
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
  
  .memora-collection-form {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 32px;
    max-width: 700px;
    margin: 0 auto;
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
  
  .memora-flashcards-container {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 32px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
  
  .memora-flashcards-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .memora-flashcard-header {
    font-size: 1.5rem;
    margin-bottom: 24px;
    color: var(--primary);
    text-align: center;
  }
  
  .memora-collection-name-display {
    font-weight: bold;
    border-bottom: 2px dotted var(--primary);
    padding-bottom: 2px;
  }
  
  .memora-flashcard-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .memora-flashcard-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    margin: 0 auto;
  }
  
  .memora-flashcard-form,
  .memora-added-cards {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 24px;
    width: 100%;
  }
  
  .memora-flashcard-form {
    position: sticky;
    top: 20px;
  }
  
  @media (min-width: 992px) {
    .memora-flashcard-container {
      flex-direction: row;
      align-items: flex-start;
    }
    
    .memora-flashcard-form {
      flex: 0 0 30%;
      min-width: 350px;
    }
    
    .memora-added-cards {
      flex: 1;
      margin-left: 5%;
      max-height: 600px;
      overflow-y: auto;
    }
  }
  
  .memora-flashcard-inputs-vertical {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .memora-added-cards {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .memora-added-cards h3 {
    margin-bottom: 16px;
    font-size: 1.2rem;
    color: var(--text-dark);
    text-align: center;
  }
  
  .memora-no-cards-message {
    font-style: italic;
    color: var(--gray);
    margin-bottom: 16px;
  }
  
  .memora-cards-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
  
  @media (min-width: 992px) {
    .memora-cards-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1200px) {
    .memora-cards-list {
      grid-template-columns: repeat(3, 1fr);
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
  }
  
  .memora-remove-card:hover {
    color: var(--error);
    background-color: var(--gray-light);
  }
  
  .memora-success-message {
    text-align: center;
    padding: 40px 0;
  }
  
  .memora-success-icon {
    width: 60px;
    height: 60px;
    color: var(--success);
    margin-bottom: 24px;
  }
  
  .memora-step {
    animation: fade-in 0.3s ease-in-out;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .memora-flashcard-inputs {
      grid-template-columns: 1fr;
    }
    
    .memora-collection-form {
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
