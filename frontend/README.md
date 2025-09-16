📰 RAG-Powered News Chatbot

A full-stack chatbot designed to answer user queries about news articles using a Retrieval-Augmented Generation (RAG) pipeline. It leverages vector embeddings for intelligent retrieval, Redis for session history, and Google Gemini API for AI-powered responses.

This project was developed as an assignment for the Full Stack Developer role at Voosh.

🌟 Features

Ask the chatbot questions about news articles.

Stores per-session chat history in Redis.

Reset chat session with one click.

Retrieve relevant articles using vector search in Qdrant.

Generate embeddings with Jina Embeddings.

AI-powered responses using Google Gemini API (integration pending).

Fully responsive UI built with React.

Colorful and interactive chat interface.

🛠️ Tech Stack
Layer	Technology
Frontend	React, CSS/SCSS
Backend	Node.js, Express
Chat History	Redis Cloud
Vector DB	Qdrant Cloud
Embeddings	Jina Embeddings
AI Responses	Google Gemini API
Hosting	Render.com / Localhost
📂 Project Structure
voosh-assignment/
│
├── backend/                    # Node.js + Express backend
│   ├── server.js               # Main server
│   ├── ingest.js               # News ingestion script
│   ├── test-jina.js            # Embeddings test
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── other React files
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── Screenshots/                # Demo screenshots
└── README.md                   # Project documentation

⚡ Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create a .env file with your credentials:

REDIS_URL=<your_redis_url>
QDRANT_URL=<your_qdrant_url>
QDRANT_API_KEY=<your_qdrant_api_key>
JINA_API_KEY=<your_jina_api_key>
GEMINI_API_KEY=<your_gemini_api_key>


Start the backend server:

node server.js


✅ The terminal should display:

Backend running on http://localhost:5000

⚡ Frontend Setup

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend:

npm start


Open your browser at:

http://localhost:3000

💬 Usage

Type a message in the input box.

Hit Send to query the chatbot.

Chatbot replies with AI answers (currently echo responses).

Click Reset to clear session history.

Example test messages:

"Hello, bot!"

"Tell me about AI advancements."

"Global economy updates today."

"Space news."

"Latest technology news."

🔧 Backend Routes
Route	Method	Description	Request Body
/chat	POST	Send a user query	{ sessionId, query }
/history/:sessionId	GET	Fetch session chat history	N/A
/reset/:sessionId	DELETE	Clear session chat history	N/A
📰 News Ingestion

Ingest articles using ingest.js.

Articles are converted to embeddings using Jina.

Embeddings stored in Qdrant for vector search.

Sample articles included for testing.

Example articles:

"Tech breakthrough in AI"

"Global economy forecast"

"NASA outer planets mission"

⚡ Redis Cache

Stores chat history per session.

Uses Redis Cloud for in-memory storage.

TTL and caching strategies can be configured for optimization.

🌈 Frontend UI

Displays past messages in chat bubbles.

Colorful UI with gradient headers and messages.

Input box for typing queries.

Buttons for Send and Reset.

Scrolls automatically to show the latest messages.

🖼️ Screenshots

Backend terminal showing server running.

Frontend chat interface.

Sending messages and receiving responses.

Resetting the chat session.

💡 Future Improvements

Replace temporary echo responses with Gemini API answers.

Implement real-time streaming of bot responses.

Persist chat history in SQL database.

Add authentication for multiple users.

Improve frontend with animations, themes, and mobile responsiveness.

Extend news ingestion to dynamic RSS feeds.

📌 Notes

Make sure .env file is not committed to GitHub.

Keep API keys secure.

Use Postman to test backend endpoints before connecting frontend.

Deployment can be done via Render.com or Vercel for full-stack hosting.

📚 References

Jina Embeddings

Qdrant Quickstart

Google AI Studio API

News Ingestion Example

Reuters RSS Feeds