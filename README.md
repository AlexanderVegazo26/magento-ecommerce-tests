# Magento E2E Tests

End-to-End testing framework for Magento demo store using Playwright and TypeScript with Page Object Model design pattern.

## Project Overview

This project provides automated end-to-end tests for the Magento demo store (https://magento.softwaretestingboard.com) using Playwright test framework with TypeScript. The tests are organized using the Page Object Model (POM) design pattern for better maintainability and reusability.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AlexanderVegazo26/magento-ecommerce-tests.git
   cd magento-e2e-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Create a `.env` file in the root directory with the following content:
   ```
   BASE_URL=https://magento.softwaretestingboard.com
   ```

## Project Structure

```
magento-e2e-tests/
├── .github/            # GitHub workflows and CI configuration
├── node_modules/       # Node.js dependencies
├── playwright-report/  # HTML test reports
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page Object Models
│   ├── tests/          # Test files
│   └── util/           # Utility functions and helpers
├── test-results/       # Test execution artifacts
├── .env                # Environment variables (not included in repository)
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked dependencies
├── playwright.config.ts # Playwright configuration
└── README.md           # Project documentation
```

## Configuration

The project requires a `.env` file for environment configuration, which is not included in the repository to allow for flexible environment management. You need to create this file manually in the root directory with the following content:

```
BASE_URL=https://magento.softwaretestingboard.com
```

This approach allows each developer to configure their own environment variables locally, making it easy to switch between different environments (development, staging, production) without changing the code.

## Running Tests

The project includes several npm scripts for running tests:

```bash
# Run all tests
npm test

# Run tests in headed mode (with browser UI)
npm run test:headed

# Run tests with Playwright UI mode
npm run test:ui

# View HTML test report
npm run report
```

## Dependencies

### Dev Dependencies:
- `@playwright/test`: Playwright testing framework
- `@faker-js/faker`: For generating test data
- `@types/node`: TypeScript definitions for Node.js
- `dotenv`: For loading environment variables

## Reports

After test execution, HTML reports are generated in the `playwright-report` directory. You can view them by running:

```bash
npm run report
```

## CI/CD Integration

This project includes GitHub Actions workflows in the `.github` directory for continuous integration.
The workflow can be manually executed from github actions.

## Reports
After executing the CI on the Github action, the report can be reviewed on the following github page: 
https://alexandervegazo26.github.io/magento-ecommerce-tests/