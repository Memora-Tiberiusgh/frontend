/**
 * @file A CSS template string for the memora-login web component.
 * @module memora-login.css
 */
// Define the CSS template.
export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
<style>
  :host {
    display: block;
    height: 100vh; 
    width: 100%;
    position: absolute; 
    top: 0;
    left: 0;
    user-select: none; 
    cursor: default; 
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
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE/Edge */
    user-select: none; /* Standard syntax */
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
  }

  h3 {
    margin-top: 50px;
    margin-bottom: 10px;
    text-align: center;
  }

  .login-container {
    display: flex;
    width: 100%;
    height: 100vh; 
    min-height: 100%; 
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
    overflow: auto; 
  }

  .right-section {
    flex: 1;
    background-color: var(--primary);
    color: var(--text-light);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    overflow: auto; 
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
    width: 100%;
    padding: 12px 20px; 
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
    justify-content: flex-start;
  }

  .oauth-button svg {
    margin-right: 15px; 
  }

  .oauth-button-text {
    flex: 1;
    text-align: center;
    padding-right: 2px; 
  }


  .oauth-button span {
    flex: 1;
    text-align: center;
    padding-right: 24px;
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
    cursor: pointer;
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
    width: 100%;
    max-width: 500px;
  }

  .feature-item {
    display: flex;
    text-align: left;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 4em;
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

  /* Social links section */
  .social-links {
    display: flex;
    justify-content: center;
    gap: 40px; 
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .social-item {
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .social-item:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-5px);
  }

  .social-item svg {
    opacity: 0.9;
  }

  @media (max-width: 992px) {
    .login-container {
      flex-direction: column;
      height: auto; 
      min-height: 100vh; 
    }

    .left-section,
    .right-section {
      width: 100%;
      min-height: 100vh; 
    }
  }
</style>
`
