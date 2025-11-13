
# Retirement Savings Planner 🚀

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive ReactJS application designed to help users plan for their retirement. This tool provides a friendly and intuitive interface to estimate the age at which a user can retire and the necessary monthly savings to achieve their financial goals, incorporating the power of compound interest.

## ✨ Features

- **Dynamic Calculations:** All financial modeling is done using pure TypeScript math functions for accuracy and performance.
- **Interactive & Friendly UI:** A clean, comfortable, and centralized interface built with React and styled with Tailwind CSS.
- **Immersive Animated Background:** A beautiful, subtly animated nebula/galaxy background for a premium user experience.
- **Fully Responsive Design:** Fully functional and aesthetically pleasing on all devices, from mobile phones to desktops.
- **Informational Modals:** Includes pop-up modals for additional information like About, Contact, Privacy Policy, and a detailed Retirement Planning Guide.
- **Powerful SEO:** Comes with a comprehensive 3500+ word SEO article on retirement planning, complete with multiple JSON-LD schemas for enhanced search engine visibility.

##  Core Functionality

The planner takes the following user inputs to generate a personalized retirement forecast:

- **Current Age:** The user's current age.
- **Current Savings:** The total amount already saved for retirement.
- **Annual Salary:** The user's gross annual salary.
- **Annual Savings Contribution (%):** The percentage of the annual salary the user contributes to savings.
- **Desired Annual Retirement Income:** The target annual income the user wishes to have during retirement.
- **Estimated Annual Return (%):** The anticipated annual growth rate of investments.
- **Inflation Rate (%):** The estimated annual rate of inflation, used for more accurate long-term projections.

Based on these inputs, the application calculates and displays:

- **Estimated Retirement Age:** The age at which the user's savings will be sufficient to generate their desired retirement income.
- **Required Monthly Savings:** The monthly amount that needs to be saved to reach the goal.
- **Total Nest Egg Needed:** The total capital required at the point of retirement.

## 🖼️ Screenshot

 <!-- Placeholder for a real screenshot -->

## 🛠️ Tech Stack

- **Frontend:** React 18 (with TypeScript)
- **Styling:** Tailwind CSS
- **Financial Logic:** Pure TypeScript / JavaScript (No external financial libraries)

## 🚀 Getting Started

To run this project locally, you need to have Node.js and a package manager like npm or yarn installed.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd retirement-savings-planner
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📁 File Structure

The project is organized into a modular structure to promote maintainability and separation of concerns.

- `public/`: Contains static assets like `index.html`, `favicon.svg`, `robots.txt`, and `sitemap.xml`.
- `src/`: The main source code directory.
  - `index.tsx`: The entry point of the React application.
  - `App.tsx`: The root component that assembles the main layout.
  - `components/`: Contains reusable UI components.
    - `ThemeLayout.tsx`: Provides the overall page structure, including the animated background, header, footer, and modal system.
    - `RetirementPlannerTool.tsx`: The core component for the planner's UI and state management.
    - `SeoArticle.tsx`: A component containing the long-form SEO article on retirement planning.
  - `services/`: Houses business logic and utilities.
    - `FinancialMath.ts`: A utility file with pure functions for all the complex financial calculations.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
