# Dublish Institute - APIs

Dublish Institute is a web application designed to manage courses and seamlessly assign them to user profiles.
This project provides a user-friendly interface for course browsing, enrollment, and profile management,
making it easy to keep track of learning progress and achievements.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/husseinsalah1/dublish_APIs
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **The server will be running on**

   [http://localhost:8000](http://localhost:8000)

## Usage

- **API Documentation:**

  - User Routes:
    - /api/v1/user/auth/register
    - /api/v1/user/auth/login
  - Quiz Routes:
    - /api/v1/quiz/create
    - /api/v1/quiz/list
    - /api/v1/quiz/get?\_id={\_id}
    - /api/v1/quiz/update?\_id={\_id}
    - /api/v1/quiz/delete?\_id={\_id}
  - Announcement Routes:
    - /api/v1/announcement/create
    - /api/v1/announcement/list
    - /api/v1/announcement/get?\_id={\_id}
    - /api/v1/announcement/update?\_id={\_id}
    - /api/v1/announcement/delete?\_id={\_id}

- **PostMan Collection:**

  -You should to add the following headers to the postman collection:

  - x-app-token : `anyware-task`
