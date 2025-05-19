# Business Intelligence Dashboard

Welcome to the Business Intelligence (BI) Dashboard, a web application built with Next.js and Material-UI (MUI) to provide an intuitive interface for visualizing and managing business data. This dashboard includes authentication, data tables, charts, and a responsive sidebar, designed to help users monitor key metrics and perform basic data operations.

## Table of Contents
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Design Considerations](#design-considerations)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Secure login and registration pages with persistent session management using local storage. Users can opt to "Keep me logged in" to avoid frequent logouts.
- **Protected Routes**: Access to the dashboard is restricted to authenticated users, with automatic redirection to the login page if not authenticated.
- **Responsive Sidebar**: A collapsible sidebar with navigation items (Dashboard, Analytics, Sales, Users, Reports, Settings) and a logout option, hidden on mobile views (below md breakpoint).
- **Dashboard Overview**: Displays key metrics via cards, sales and user growth charts, category distribution charts, and a data table for order management.
- **Data Table Management**: Interactive table with row deletion functionality via a context menu, including pagination logic to adjust pages when rows are deleted.
- **Theme Toggle**: A header with a theme toggle button to switch between light and dark modes (integration with a theme provider is pending).
- **Auto-Logout**: Inactivity-based logout after 60 seconds when "Keep me logged in" is unchecked, with event listeners for user activity (mousemove, keydown, click, scroll).
- **Real-Time Feedback**: Success messages via snackbars after registration, enhancing user experience.

## Setup Instructions

### Prerequisites
- Node.js (v18.x or later)
- npm (v8.x or later)
- Git (optional, for cloning the repository)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/bi-dashboard.git
   cd bi-dashboard