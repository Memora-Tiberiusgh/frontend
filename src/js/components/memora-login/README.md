# Personal Web Desktop (PWD) Component

## Overview
The Personal Web Desktop (PWD) is a custom web component that provides a desktop-like environment in the browser. It manages multiple applications that can be launched in separate windows, implementing lazy loading for the sub applications for better performance and handling offline states gracefully.

## Features
- Custom web component architecture using Shadow DOM
- Lazy loading of application modules
- Offline state handling with user-friendly messages
- Integrated window management system
- Sidebar-based application launcher
- Menu bar with time, location, weather and the app in focus

## Sub-applications
1. Memory Game
2. Yapper
3. Quiz
4. Credits

## Technical Details

### Component Structure
The component is registered as `my-pwd` using:

`customElements.define('my-pwd', class extends HTMLElement)`

### Dependencies
- `my-pwd.css.js`: Component styles
- `my-pwd.html.js`: HTML template
- Application modules (lazy loaded):
  - Memory Game: `../app-window/lib/memory-game/memory-game-application/index.js`
  - Yapper: `../app-window/lib/yapper/yapper-application/index.js`
  - Quiz: `../app-window/lib/quiz/quiz-application/index.js`
  - Credits: `../app-window/lib/credits/index.js`

### Usage
To use the component in your HTML:

```html
<my-pwd></my-pwd>
```

### Event Handling
The component listens for the following custom events from the sidebar:
- `pwd-sidebar:oppenMemory`: Launches the Memory game
- `pwd-sidebar:oppenYapper`: Launches the Yapper chat application
- `pwd-sidebar:oppenQuiz`: Launches the Quiz application
- `pwd-sidebar:oppenCredits`: Launches the Credits application

### Offline Support
Each application implements offline state handling:
- Attempts to load application modules dynamically
- Displays user-friendly error message if loading fails due to network issues ("It seems that you are currently offline. The application can't be loaded. Please check your internet connection.").

### Lifecycle Methods
- `constructor()`: Initializes the shadow DOM and component references
- `connectedCallback()`: Sets up event listeners for application launching
- `disconnectedCallback()`: Cleans up event listeners when component is removed


## Author
Tiberius Gherac <tg222hh@student.lnu.se>


## Notes
- All application modules are loaded lazily to improve initial load performance
- The component uses the AbortController for proper cleanup of event listeners
- Window management is handled through the `app-window` custom element