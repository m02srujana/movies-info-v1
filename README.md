# Movies Info API

This project provides an API to fetch movie information, including details about movies and their credits. The API is built using Node.js, Express, and TypeScript.

## Project Structure

- `src/gateway`: Contains modules for outbound calls to external APIs.
- `src/service`: Contains business logic for processing and transforming data.
- `src/model`: Contains TypeScript interfaces and models.
- `src`: Contains the main application entry point and router.

## Setup
- Add your API key to the `.env` file as `API_KEY=your_api_key_here`

### Prerequisites

- Node.js (v21 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/movies-info-api.git
cd movies-info-api