# Blueprint: Singaporean Food Generator

## Overview

A simple, interactive web application that generates random Singaporean dishes. The user can filter the food by preference (all, spicy, or non-spicy) and generate a new dish with the click of a button.

## Project Structure & Features

*   **`index.html`**: The main entry point of the application. It includes the basic HTML structure, a `<healthy-food-generator>` web component, and the Google Analytics tracking script.

*   **`main.js`**: Contains the logic for the `HealthyFoodGenerator` web component.
    *   **Web Component**: A custom element (`<healthy-food-generator>`) that encapsulates the entire application, including the UI and functionality.
    *   **Shadow DOM**: The component's internal structure is managed by a shadow DOM, preventing style conflicts with the main document.
    *   **Filtering**: The user can filter the food list by selecting "All," "Spicy," or "Non-Spicy." The active filter is highlighted.
    *   **Random Food Generation**: Clicking the "Generate Food" button randomly selects a dish from the filtered list and displays it.
    *   **Google Analytics**: The component sends a `filter_change` event to Google Analytics whenever the user selects a new filter.

*   **`background.jpg`**: A background image of the Singapore skyline, applied to the web component.

*   **`blueprint.md`**: This file, providing an overview of the project.

*   **`.gitignore`**: A standard gitignore file for Node.js projects.

## Current Task: Final Background Image Fix

*   **Goal**: To fix the recurring background image issue by using a local copy instead of a remote URL.
*   **Steps**:
    1.  Update `main.js` to point the `background-image` URL to the local `background.jpg` file.
    2.  Adjust the background overlay for better aesthetics.
    3.  Commit and push the changes to redeploy the application.