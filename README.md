# University Progression Calculator - Full-Stack Web Application

This project is a complete modernization of a procedural Python command-line application into a full-stack, cloud-native web application. It refactors a university coursework script into a modern, scalable, and interactive platform using React, Flask, and Google Cloud Platform.

## The Original Application: A Python CLI Tool

The initial project was a university coursework assignment designed to demonstrate fundamental programming concepts in Python. It functioned as a simple command-line tool to determine the progression outcome for university students based on their credits.

**Original project repository:** [Progress-Prediction-Program](https://github.com/vidushraj1/Progress-Prediction-Program)

### Original Functionality

The application operated in two distinct modes:

*   **Student Mode:** A simple, single-use CLI that prompted a user to enter their pass, defer, and fail credits. It validated the input and printed one of four progression outcomes:
    *   Progress
    *   Progress (module trailer)
    *   Module retriever
    *   Exclude
*   **Staff Mode:** An enhanced CLI for university staff. This mode allowed for:
    *   **Batch data entry** for multiple students in a single session.
    *   **Data aggregation** to count the number of students in each outcome category.
    *   **Text-based visualization** by generating both horizontal and vertical histograms of the results.
    *   **Data persistence** by saving the session's results to a local `Progression.txt` file.

### Original Technology Stack

*   **Language:** Python
*   **UI:** Standard library `input()` and `print()` (Command-Line Interface)
*   **Data Persistence:** Basic file I/O (writing to a `.txt` file).
*   **Structure:** Procedural scripting with heavy reliance on global variables.

## The Modernization: A Full-Stack Cloud Application

The goal of this refactoring was to address the limitations of the original application (e.g., single-session data, non-interactive CLI, rigid structure) and re-engineer it as a professional, multi-user, and scalable web service.

**Live Web Application:** [https://vidushraj1.github.io/university-progression-calculator-webapp/](https://vidushraj1.github.io/university-progression-calculator-webapp/) 

### New Features & Improvements

*   **Role-Based User Experience:** The application now presents a clear choice between a **Student View** and a **Staff View** on a modern landing page.
*   **Modern Interactive UI:** The clunky command-line interface has been replaced with a responsive, fast, and intuitive **React Single-Page Application (SPA)** with animated components.
*   **Robust & Stateless Backend:** The core Python logic was refactored and encapsulated into a lightweight **Flask** backend, providing a clean and stateless REST API. The heavy use of global variables was eliminated in favor of pure functions.
*   **In-Memory Session Management:** Instead of writing to a local file, the Staff View now manages batch data within the frontend's state for the duration of a browser session, allowing for dynamic report generation.
*   **Dynamic Data Visualization:** The text-based histograms have been upgraded to animated, graphical charts rendered in the browser.
*   **On-Demand File Generation:** The file-saving feature has been modernized to allow users to download a dynamically generated `.txt` report directly from the browser.
*   **Cloud-Native Deployment:** The entire application is deployed on a modern, serverless infrastructure for high availability and zero cost at low traffic.
    *   The **Flask backend** is containerized with **Docker** and runs as a serverless service on **Google Cloud Run**.
    *   The **React frontend** is hosted as a static site on **GitHub Pages**, providing excellent performance and free hosting.

### Modern Technology Stack

*   **Frontend:**
    *   **Framework:** React (with TypeScript & Vite)
    *   **Styling:** Tailwind CSS
    *   **Animations:** Framer Motion
    *   **API Communication:** Axios
    *   **Deployment:** GitHub Pages
*   **Backend:**
    *   **Framework:** Flask
    *   **Language:** Python
    *   **WSGI Server:** Gunicorn
    *   **Deployment:** Docker, Google Cloud Run
*   **Cloud Infrastructure:**
    *   **Google Cloud Platform (GCP)**
    *   **Google Artifact Registry:** For storing Docker container images.
    *   **Google Cloud Run:** For serverless backend hosting.

## Project Structure & Local Setup

This full-stack application consists of a public frontend repository and a backend service.

### Backend (Architectural Overview)

The source code for the Flask backend can be found in a separate repository/directory. It was developed by refactoring the business logic from the original [Python CLI project](https://github.com/vidushraj1/Progress-Prediction-Program).

The backend is a lightweight Flask application responsible for exposing a single, stateless API endpoint. The frontend communicates with this backend, which runs on `http://127.0.0.1:5000` during local development.

Key API endpoint provided by the backend:
*   `POST /api/calculate`: Accepts JSON with pass, defer, and fail credits and returns the calculated outcome.

### Frontend (This Repository)

The React frontend is publicly available in this repository. To run it locally, follow these steps.

**Prerequisites:**
*   Node.js and npm
*   A running instance of the backend service.

**Running the Frontend:**
1.  Clone this repository.
2.  Navigate to the `university-frontend` directory.
3.  Create a `.env` file in the root of the project.
4.  Inside the `.env` file, add the following line, pointing to the backend's base URL:
    `VITE_API_BASE_URL=http://127.0.0.1:5000`
    *(To test against the live version, replace the local URL with the actual Cloud Run service URL.)*
5.  Install dependencies:
    ```bash
    npm install
    ```
6.  Start the development server:
    ```bash
    npm run dev
    ```
7.  The frontend will be running on `http://localhost:5173` (or the next available port).