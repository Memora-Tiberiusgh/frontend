/**
 * @file A CSS template string for the memora-app web component.
 * @module memora-app.css
 */
// Define the CSS template.
export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
<style>
   :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    
    .app-container {
      width: 100%;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
    }
    
    .loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    #component-container {
      width: 100%;
      height: 100%;
    }
</style>
`
