import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, AlertTriangle, Send } from 'lucide-react';
import { generateResponse } from '../services/chatbot';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isBot: boolean;
  type?: 'info' | 'emergency' | 'instruction';
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm your emergency assistance AI. How can I help you today?",
      isBot: true,
      type: 'info'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeAndNavigate = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    // Define navigation patterns
    const navigationPatterns = [
      { keywords: ['report', 'emergency', 'help', 'incident'], path: '/report' },
      { keywords: ['donate', 'contribution', 'give'], path: '/donate' },
      { keywords: ['resource', 'supplies', 'need', 'request'], path: '/resources' },
      { keywords: ['guide', 'instruction', 'how to'], path: '/guidelines' },
      { keywords: ['alert', 'warning', 'weather'], path: '/alerts' },
      { keywords: ['incident', 'event', 'situation'], path: '/incidents' },
      { keywords: ['dashboard', 'status', 'overview'], path: '/dashboard' }
    ];

    // Check for matches
    for (const pattern of navigationPatterns) {
      if (pattern.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        setTimeout(() => {
          navigate(pattern.path);
          setIsOpen(false);
        }, 1500); // Delay navigation to allow user to read bot response
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Check for navigation intent
    const shouldNavigate = analyzeAndNavigate(input);

    // Generate bot response
    const responses = generateResponse(input);
    
    // Add navigation suggestion if applicable
    if (shouldNavigate) {
      responses.push({
        text: "I'll redirect you to the appropriate page...",
        type: 'instruction'
      });
    }
    
    // Add each response with a delay
    responses.forEach((response, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: response.text,
          isBot: true,
          type: response.type
        }]);
      }, index * 1000); // 1 second delay between messages
    });

    setInput('');
  };

  const getMessageClassName = (message: Message) => {
    const baseClass = "max-w-[80%] rounded-lg p-3";
    if (!message.isBot) {
      return `${baseClass} bg-red-600 text-white`;
    }
    switch (message.type) {
      case 'emergency':
        return `${baseClass} bg-red-100 text-red-800 border border-red-200`;
      case 'instruction':
        return `${baseClass} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 z-[9999]"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999]">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Bot className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold">Emergency Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={getMessageClassName(msg)}>
                  {msg.type === 'emergency' && (
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-sm font-semibold">Emergency Instructions</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;