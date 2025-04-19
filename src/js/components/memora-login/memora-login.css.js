/**
 * @file A CSS template string for the memora-login web component.
 * @module memora-login.css
 */
// Define the CSS template.
export const cssTemplate = document.createElement("template")
cssTemplate.innerHTML = `
<style>
        :host {
          display: block;
          height: 100%;
        }
        
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
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .login-container {
          display: flex;
          width: 100%;
          height: 100%;
        }
        
        .left-section {
          flex: 1;
          background-color: #fff;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .right-section {
          flex: 1;
          background-color: var(--primary);
          color: var(--text-light);
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .logo-container {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .logo {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--primary);
          margin-bottom: 10px;
        }
        
        .tagline {
          font-size: 1rem;
          color: var(--gray);
          max-width: 400px;
          text-align: center;
          margin-bottom: 40px;
        }
        
        .auth-options {
          width: 100%;
          max-width: 400px;
        }
        
        .auth-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .oauth-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: none;
          background-color: #fff;
          color: var(--text-dark);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--gray-light);
        }
        
        .oauth-button:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .auth-footer {
          margin-top: 30px;
          text-align: center;
          font-size: 0.9rem;
          color: var(--gray);
        }
        
        .auth-footer a {
          color: var(--primary);
          text-decoration: none;
        }
        
        .welcome-title {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .welcome-subtitle {
          font-size: 1.5rem;
          margin-bottom: 30px;
          max-width: 500px;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }
        
        .feature-list {
          text-align: center;
          display: inline-block;
          margin: 0 auto;
        }
        
        .feature-item {
          display: flex;
          text-align: left;
          justify-content: flex-start;
          margin-bottom: 20px;
        }
        
        .feature-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 1.2rem;
        }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 30px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .category-item {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .category-item:hover {
          background-color: rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }
        
        @media (max-width: 992px) {
          .login-container {
            flex-direction: column;
          }
          
          .left-section, .right-section {
            width: 100%;
          }
        }
</style>
`
