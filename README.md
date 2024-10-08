# Subly Front-End Challenge

This project is a solution to the Subly Front-End Challenge, built using React and TypeScript.  It fetches media data from an API endpoint and displays it as a collection of cards with different states and filtering capabilities.

## Features

* **Data Fetching:**  Fetches media data from a JSON endpoint.
* **Card Display:** Renders each media item as a card, displaying its cover image, title, status, and last updated time.
* **Dynamic Card States:**  Handles different media states:
  * **Ready:** Displays an edit button and language count on hover.
  * **Error:** Shows an error message.
  * **Transcribing:** Shows a loading bar.
* **Filtering:** Allows filtering by media status (ready, error, transcribing) and language.
* **Responsive Design:** Adapts to different screen sizes using a responsive grid layout.
* **Unit Testing:** Includes comprehensive unit tests for the `Card` and `CardList` components using Jest and React Testing Library.

## Technologies Used

* **React:**  JavaScript library for building user interfaces.
* **TypeScript:**  Typed superset of JavaScript for improved code quality and maintainability.
* **Date-fns:**  For date formatting.
* **Axios:** For making HTTP requests.
* **Jest:**  JavaScript testing framework.
* **React Testing Library:**  Testing library for React components.
* **whatwg-fetch (or node-fetch):**  Polyfill for the `fetch` API. (Choose one)

## Installation and Setup

1. Clone the repository: `git clone https://github.com/codewithPoppy/subly-frontend-challenge`
2. Navigate to the project directory: `cd subly-frontend-challenge`
3. Install dependencies: `npm install` or `yarn install`

## Running the Application

1. Start the development server: `npm start` or `yarn start`
2. Open your browser and go to `http://localhost:3000`

## Running Tests

1. Run the tests: `npm test` or `yarn test`

## Project Structure

subly-frontend-challenge/
├── src/
│ ├── components/
│ │ ├── Card.tsx
│ │ ├── Card.test.tsx
│ │ ├── CardList.tsx
│ │ └── CardList.test.tsx
│ ├── constants/
│ │ └── index.ts
│ ├── types/
│ │ └── index.ts
│ ├── App.tsx
│ ├── App.css
│ ├── index.tsx
│ └── setupTests.ts
├── public/
│ └── index.html
├── jest.config.js (or jest.config.ts)
├── package.json
└── README.md

## Design Decisions

* **Component Architecture:** The project uses a clear separation of concerns with reusable components (`Card` and `CardList`).
* **State Management:**  Uses React's built-in state management for simplicity.  For larger applications, consider using a more robust state management solution like Redux or Context API.
* **Styling:**  Uses CSS Modules for component-level styling. (Or describe your styling approach)
* **Testing Strategy:**  Employs a comprehensive testing approach with unit tests covering different component states and edge cases.

## Future Improvements

* **Virtualization:** Implement virtualization for improved performance with large lists of media.
* **Accessibility:**  Further enhance accessibility features following WCAG guidelines.
* **Advanced Filtering:**  Add more filtering options (e.g., by date range, keywords).
* **Internationalization (i18n):** Implement i18n support for multiple languages.

## Contributing

Contributions are welcome! Please feel free to submit pull requests.
