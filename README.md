# DocuQuery-AI

DocuQuery-AI is a web application that allows users to upload PDF documents and interact with them through a chat interface. Using the Retrieval-Augmented Generation (RAG) technique of Langchain, the application enables users to ask questions about the content of their uploaded PDFs and receive accurate, context-aware responses. The project leverages Firebase for chat functionality, authentication, and authorization.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Upload PDF Documents**: Users can upload PDF files for processing.
- **Interactive Chat**: Chat interface for querying the content of uploaded PDFs.
- **Context-Aware Responses**: Accurate answers based on the content of the documents.
- **User Authentication and Authorization**: Secure user registration, login, and role-based access control using Firebase.
- **Responsive Design**: Mobile-friendly design ensures a great user experience on all devices.


## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/docuquery-ai.git
    cd docuquery-ai
    ```

2. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**:
    ```bash
    cd client
    npm install
    ```

4. **Set up Firebase**:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Enable Authentication and Firestore in your Firebase project.
    - Obtain your Firebase configuration and add it to a `.env` file in the `client` directory:
    ```env
    FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
    ```

5. **Set up environment variables for Langchain**:
    Create a `.env` file in the `server` directory with the following:
    ```env
    LANGCHAIN_API_KEY=your_langchain_api_key
    COHERE_API_KEY=your_cohere_api_key
    OPENAI_API_KEY=your_open_api_key
    ```

6. **Run the application**:
    ```bash
    cd server
    npm run dev
    ```

## Usage

1. **Register**: Create an account to start using DocuQuery-AI.
2. **Login**: Log in with your credentials.
3. **Upload PDF**: Upload a PDF document to the application.
4. **Chat with PDF**: Use the chat interface to ask questions about the content of the uploaded PDF.

## Technologies Used

- **Firebase**: For chat, authentication, and authorization.
- **React.js**: For the frontend framework.
- **Node.js**: For the backend runtime environment.
- **Langchain**: For implementing the RAG technique.
- **Axios**: For making HTTP requests from the frontend.
- **Bootstrap**: For styling the frontend.

## Project Structure

```plaintext
docuquery-ai/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       ├── firebase.js      # Firebase configuration
│       └── index.js
├── server/                  # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── .gitignore
├── README.md
└── package.json
