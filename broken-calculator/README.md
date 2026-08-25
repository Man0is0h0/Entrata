# Broken Calculator

A simple discount and tax calculator purposely built with an intentional logic bug for debugging exercises.

## Overview
This project is a clean, vanilla JavaScript utility that allows users to calculate the final price of an item given its original price, optional quantity, discount, and tax percentage. It intentionally contains a subtle mathematical flaw in its tax calculation logic to serve as a realistic debugging challenge.

## Features
- Clean, responsive UI with currency formatting
- Strict mathematical input validation bounds
- Comprehensive test suite to prove correct edge-cases and highlight the bug
- No build steps or dev servers required

## Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Testing**: Jest

## Project Structure
```text
broken-calculator/
├── src/
│   ├── calculator.js      # Pure calculation logic (contains bug)
│   └── calculator.test.js # Jest unit tests verifying the bug
├── index.html             # User interface
├── style.css              # Custom styling
├── script.js              # DOM interactions & validation
├── package.json           # Test runner dependency
└── README.md
```

## Setup & Running
Since this project uses vanilla web technologies, there is no build step for the frontend.

1. Clone the repository and navigate into it:
   ```bash
   cd broken-calculator
   ```
2. Open `index.html` directly in any modern web browser to use the calculator.

### Running Tests
To run the automated tests and see the bug reproduction:
```bash
npm install
npm test
```

## How to Reproduce the Bug
The application correctly calculates discounts, but miscalculates the tax.

**Reproduction Scenario:**
- Original Price: 100
- Quantity: 1
- Discount: 10%
- Tax: 18%

**Expected Mathematical Result:**
- Subtotal: $100.00
- Discount Amount: $10.00
- Discounted Amount: $90.00
- Tax Amount (18% of $90): $16.20
- **Final Price: $106.20**

**Broken Application Result:**
- Tax Amount: $18.00
- **Final Price: $108.00**

*Challenge: Locate the file responsible for pure logic calculations and fix the line causing this discrepancy.*

## Architecture & Design Choices
- **Vanilla Stack**: Chosen to keep the footprint extremely small. No framework overhead ensures the focus is purely on JavaScript math debugging, avoiding distractions from complex tooling.
- **Testing (Jest)**: Chosen for its zero-configuration approach, making unit testing frictionless for mathematical verifications.
- **Architecture**: The intentional bug is isolated in a pure JS module (`calculator.js`) rather than mixed into DOM logic (`script.js`). This enforces a clean separation of concerns and makes the testing strategy highly effective.

## Trade-offs & Future Work
- **Trade-offs**: Due to time constraints and the scoped nature of the assignment, I prioritized a completely static, serverless architecture. I skipped adding a backend API, build step, or user authentication because they were unnecessary for a small calculator utility and would have violated the "do not overengineer" constraint.
- **Future Work**: In a production scenario, I would scale this by migrating the DOM logic to a modern frontend framework (like React or Vue) for better state management. I would also add End-to-End (E2E) testing (using Cypress or Playwright) to verify the UI correctly renders the outputs from the calculation module.

## Known Issue
- As documented, the tax logic is intentionally flawed for the debugging exercise.
