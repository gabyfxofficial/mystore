import React, { useState, useEffect } from "react";
import "../styles/LiveChat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const predefinedQuestions = [
    {
      id: 1,
      question: "Available iPhone Models?",
      answer: "We offer iPhone 13, 14, 15 and 16 models.",
    },
    {
      id: 2,
      question: "How to place an order?",
      answer: "Visit the product page and click on 'Buy Now'.",
    },
    {
      id: 3,
      question: "Shipping and Delivery Info?",
      answer: "Standard shipping takes 3-5 business days.",
    },
    {
      id: 4,
      question: "Return and Refund Policy?",
      answer: "Returns are accepted within 30 days of purchase.",
    },
  ];

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          user: "Bot",
          text: "Welcome to Gaby Store! How can we assist you today?",
        },
      ]);
    }
  };

  const handleQuestionClick = (question) => {
    if (isWaiting) return;
    setMessages((prev) => [...prev, { user: "You", text: question.question }]);
    setIsTyping(true);
    setIsWaiting(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { user: "Bot", text: question.answer }]);
      setIsTyping(false);
      setIsWaiting(false);
    }, 2000);
  };

  return (
    <div className={`live-chat-container ${isOpen ? "open" : ""}`}>
      {!isOpen && (
        <button className="toggle-chat-button" onClick={toggleChat}>
          💬 Chat
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <button className="close-chat-button" onClick={toggleChat}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>Gaby Store</h2>
            <p>How can we assist you today?</p>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.user.toLowerCase()}`}>
                <div className="message-content">
                  <strong>{msg.user}:</strong> {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="typing-animation">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-content">
            <ul className="help-list">
              {predefinedQuestions.map((question) => (
                <li
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                >
                  {question.question} <FontAwesomeIcon icon={faArrowRight} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
