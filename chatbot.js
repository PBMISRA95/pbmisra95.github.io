class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.responses = {
            greetings: [
                "Hi there! I'm Priyabrat's AI assistant. I can tell you about his projects, skills, and experience. What would you like to know?",
                "Hello! Welcome to Priyabrat's portfolio. I'm here to help you learn more about his work in ML and AI. How can I assist you?",
                "Hey! I'm here to chat about Priyabrat's background and projects. What interests you most?"
            ],
            projects: {
                vanaciretain: "VanaciRetain is Priyabrat's employee attrition prediction system using AutoGluon. It achieved 94% accuracy in predicting employee turnover, helping companies reduce recruitment costs by up to 30%.",
                support: "The Agentic Technical Support Assistant uses LangChain and FAISS for intelligent customer support. It provides context-aware responses and can handle complex technical queries automatically.",
                glass: "The Glass Fracture Analysis project uses CNNs to detect and classify glass fractures in real-time. It's particularly useful for quality control in manufacturing and automotive industries.",
                recreation: "The AI-based Image Recreation project uses advanced deep learning to reconstruct and enhance images. It's great for restoration work and creative applications."
            },
            skills: {
                programming: "Priyabrat is proficient in Python, JavaScript, SQL, and R. He specializes in building scalable AI systems and web applications.",
                ml: "His ML expertise includes PyTorch, TensorFlow, AutoGluon, scikit-learn, and Pandas. He's particularly strong in deep learning and predictive modeling.",
                cloud: "He has extensive experience with AWS services, Docker containerization, and building cloud-native applications.",
                frameworks: "He works with FastAPI for backend development, LangChain for LLM applications, and FAISS for vector search systems."
            },
            contact: "You can reach Priyabrat at priyabrat.mishra.official@gmail.com or connect with him on LinkedIn. He's always open to discussing exciting ML/AI opportunities!",
            default: [
                "That's an interesting question! Could you be more specific about what you'd like to know about Priyabrat's work?",
                "I'd love to help! Are you interested in his projects, technical skills, or experience?",
                "Great question! Feel free to ask about his ML projects, AI expertise, or professional background."
            ]
        };
        this.init();
    }

    init() {
        this.createChatWidget();
        this.setupEventListeners();
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-toggle" id="chatToggle">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chat-popup" id="chatPopup">
                <div class="chat-header">
                    <h4>Chat with AI Assistant</h4>
                    <button class="chat-close" id="chatClose">&times;</button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot-message">
                        <div class="message-content">
                            ${this.responses.greetings[0]}
                        </div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="Ask me about Priyabrat's work..." maxlength="500">
                    <button id="chatSend"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(chatWidget);
    }

    setupEventListeners() {
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');

        chatToggle.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        const popup = document.getElementById('chatPopup');
        this.isOpen = !this.isOpen;
        popup.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            document.getElementById('chatInput').focus();
        }
    }

    closeChat() {
        const popup = document.getElementById('chatPopup');
        this.isOpen = false;
        popup.style.display = 'none';
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
        }, 300);
    }

    addMessage(message, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store in conversation history
        this.conversationHistory.push({ message, type, timestamp: new Date() });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting patterns
        if (this.matchesPattern(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon'])) {
            return this.getRandomResponse(this.responses.greetings);
        }
        
        // Project-specific queries
        if (this.matchesPattern(lowerMessage, ['vanaciretain', 'employee attrition', 'employee turnover'])) {
            return this.responses.projects.vanaciretain;
        }
        
        if (this.matchesPattern(lowerMessage, ['support assistant', 'customer support', 'technical support'])) {
            return this.responses.projects.support;
        }
        
        if (this.matchesPattern(lowerMessage, ['glass fracture', 'fracture analysis', 'cnn'])) {
            return this.responses.projects.glass;
        }
        
        if (this.matchesPattern(lowerMessage, ['image recreation', 'image restoration', 'image enhancement'])) {
            return this.responses.projects.recreation;
        }
        
        // Skills queries
        if (this.matchesPattern(lowerMessage, ['programming', 'languages', 'python', 'javascript'])) {
            return this.responses.skills.programming;
        }
        
        if (this.matchesPattern(lowerMessage, ['machine learning', 'ml', 'pytorch', 'tensorflow', 'deep learning'])) {
            return this.responses.skills.ml;
        }
        
        if (this.matchesPattern(lowerMessage, ['cloud', 'aws', 'docker', 'deployment'])) {
            return this.responses.skills.cloud;
        }
        
        if (this.matchesPattern(lowerMessage, ['frameworks', 'fastapi', 'langchain', 'faiss'])) {
            return this.responses.skills.frameworks;
        }
        
        // Contact information
        if (this.matchesPattern(lowerMessage, ['contact', 'email', 'reach', 'linkedin', 'hire'])) {
            return this.responses.contact;
        }
        
        // General project inquiry
        if (this.matchesPattern(lowerMessage, ['projects', 'work', 'portfolio', 'what has he built'])) {
            return "Priyabrat has worked on several exciting projects including VanaciRetain (employee attrition prediction), an Agentic Technical Support Assistant, Glass Fracture Analysis using CNNs, and AI-based Image Recreation. Which project would you like to know more about?";
        }
        
        // Experience/background
        if (this.matchesPattern(lowerMessage, ['experience', 'background', 'about', 'who is'])) {
            return "Priyabrat is a Machine Learning Engineer specializing in AI-native systems, agentic workflows, and deep learning. He has extensive experience building scalable ML solutions and has worked on projects ranging from predictive analytics to computer vision. What specific aspect of his background interests you?";
        }
        
        // Default responses
        return this.getRandomResponse(this.responses.default);
    }

    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
}); 