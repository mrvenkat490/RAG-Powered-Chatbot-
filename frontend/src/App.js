import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css"; // we will put CSS animations here

const BACKEND_URL = "http://localhost:5000";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState("user-" + Date.now());
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/history/${sessionId}`)
      .then((res) => setMessages(res.data))
      .catch(err => console.error(err));
  }, [sessionId]);

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { query: input, answer: "" };
    setMessages([...messages, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/chat`, { sessionId, query: input });

      // simulate typing effect
      let botText = "";
      const fullText = res.data.answer;
      const interval = setInterval(() => {
        botText += fullText[botText.length];
        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          { query: userMessage.query, answer: botText }
        ]);
        if (botText.length === fullText.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 40); // speed of typing
    } catch (err) {
      console.error("Error sending message:", err);
      setTyping(false);
    }
  };

  const resetChat = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/reset/${sessionId}`);
      setMessages([]);
    } catch (err) {
      console.error("Error resetting chat:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">📰 News Chatbot</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className="chat-message">
            <p className="user-message fade-in">
              <b>You:</b> {msg.query}
            </p>
            <p className="bot-message fade-in">
              <b>Bot:</b> {msg.answer}{typing && <span className="typing">|</span>}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={resetChat} className="reset-btn">Reset</button>
      </div>
    </div>
  );
}

export default App;
