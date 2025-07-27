/*!
 * Geovi Chat Widget v2.0 - n8n Chat Agent Compatible
 * AI Assistant pentru sisteme de încălzire - Optimizat pentru n8n
 * © 2025 Crego.ro
 */

(function() {
    'use strict';

    // Prevent multiple initialization
    if (window.GeoviChatWidget) {
        return;
    }

    // CSS Styles - same as before
    const CSS_STYLES = `
        /* Geovi Chat Widget Styles */
        .geovi-chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        }

        @media (max-width: 768px) {
            .geovi-chat-container {
                bottom: 15px;
                right: 15px;
            }
        }

        .geovi-character {
            position: relative;
            width: 70px;
            height: 70px;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: geovi-bounce 4s infinite;
            touch-action: manipulation;
        }

        .geovi-character:hover {
            transform: scale(1.1);
        }

        @media (hover: none) and (pointer: coarse) {
            .geovi-character:active {
                transform: scale(1.1);
            }
        }

        @media (max-width: 768px) {
            .geovi-character {
                width: 100px;
                height: 100px;
            }
        }

        .geovi-smiley-face {
            width: 60px;
            height: 60px;
            background: #FFD700;
            border: 4px solid #000;
            border-radius: 50%;
            position: absolute;
            top: 5px;
            left: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }

        @media (max-width: 768px) {
            .geovi-smiley-face {
                width: 90px;
                height: 90px;
                border: 5px solid #000;
                top: 5px;
                left: 5px;
            }
        }

        .geovi-eyes {
            display: flex;
            gap: 10px;
            margin-bottom: 6px;
        }

        .geovi-eye {
            width: 10px;
            height: 10px;
            background: #000;
            border-radius: 50%;
            animation: geovi-blink 3s infinite;
        }

        @media (max-width: 768px) {
            .geovi-eyes {
                gap: 14px;
                margin-bottom: 10px;
            }

            .geovi-eye {
                width: 16px;
                height: 16px;
            }
        }

        .geovi-smile {
            width: 24px;
            height: 12px;
            border: 3px solid #000;
            border-top: none;
            border-radius: 0 0 24px 24px;
        }

        @media (max-width: 768px) {
            .geovi-smile {
                width: 34px;
                height: 17px;
                border: 4px solid #000;
                border-top: none;
                border-radius: 0 0 34px 34px;
            }
        }

        .geovi-speech-bubble {
            position: absolute;
            bottom: 10px;
            right: 90px;
            background: white;
            padding: 12px 16px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 280px;
            min-width: 200px;
            font-size: 13px;
            line-height: 1.4;
            color: #333;
            opacity: 0;
            transform: translateX(10px);
            transition: all 0.3s ease;
            pointer-events: none;
            border: 2px solid #FFD700;
            box-sizing: border-box;
        }

        .geovi-speech-bubble.show {
            opacity: 1;
            transform: translateX(0);
            pointer-events: all;
        }

        .geovi-speech-bubble::after {
            content: '';
            position: absolute;
            bottom: 20px;
            right: -8px;
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid white;
        }

        .geovi-speech-bubble::before {
            content: '';
            position: absolute;
            bottom: 18px;
            right: -10px;
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 10px solid #FFD700;
        }

        @media (max-width: 768px) {
            .geovi-speech-bubble {
                bottom: 80px;
                right: -50px;
                left: -50px;
                max-width: 250px;
                min-width: 180px;
                font-size: 12px;
                padding: 10px 14px;
                transform: translateY(10px);
                text-align: center;
            }

            .geovi-speech-bubble.show {
                transform: translateY(0);
            }

            .geovi-speech-bubble::after {
                bottom: -8px;
                right: 50%;
                left: auto;
                transform: translateX(50%);
                border-top: 8px solid white;
                border-bottom: none;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
            }

            .geovi-speech-bubble::before {
                bottom: -10px;
                right: 50%;
                left: auto;
                transform: translateX(50%);
                border-top: 10px solid #FFD700;
                border-bottom: none;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
            }
        }

        .geovi-chat-window {
            position: absolute;
            bottom: 90px;
            right: 0;
            width: 320px;
            height: 400px;
            background: white;
            border-radius: 15px;
            border: 3px solid #FFD700;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            box-sizing: border-box;
        }

        .geovi-chat-window.show {
            display: flex;
            animation: geovi-slideUp 0.3s ease;
        }

        @media (max-width: 768px) {
            .geovi-chat-window {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                height: 100dvh; /* Dynamic viewport height - better for mobile */
                max-height: none;
                border-radius: 0;
                border: none;
                z-index: 999999;
            }
        }

        @media (max-width: 480px) {
            /* Removed - using full screen now */
        }

        .geovi-chat-header {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #333;
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #000;
        }

        .geovi-chat-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
        }

        .geovi-close-btn {
            background: none;
            border: 2px solid #000;
            color: #000;
            font-size: 16px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 50%;
            transition: all 0.2s;
            font-weight: bold;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .geovi-close-btn:hover {
            background: #000;
            color: #FFD700;
        }

        .geovi-chat-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #fafafa;
        }

        .geovi-message {
            max-width: 80%;
            padding: 10px 14px;
            border-radius: 15px;
            font-size: 13px;
            line-height: 1.4;
            border: 2px solid #ddd;
            box-sizing: border-box;
        }

        .geovi-message.bot {
            background: white;
            border-color: #FFD700;
            align-self: flex-start;
            color: #1a1a1a;
        }

        .geovi-message.user {
            background: #FFD700;
            color: #333;
            border-color: #000;
            align-self: flex-end;
        }

        .geovi-chat-input-container {
            padding: 12px;
            border-top: 2px solid #FFD700;
            display: flex;
            gap: 8px;
            background: white;
            /* Prevent keyboard from covering input on mobile */
            position: sticky;
            bottom: 0;
        }

        .geovi-chat-input {
            flex: 1;
            padding: 10px 14px;
            border: 2px solid #FFD700;
            border-radius: 20px;
            outline: none;
            font-size: 13px;
            box-sizing: border-box;
        }

        .geovi-chat-input:focus {
            border-color: #000;
        }

        .geovi-send-btn {
            background: #FFD700;
            color: #333;
            border: 2px solid #000;
            padding: 10px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 13px;
            font-weight: bold;
            transition: all 0.2s;
        }

        .geovi-send-btn:hover {
            background: #000;
            color: #FFD700;
        }

        .geovi-send-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .geovi-loading {
            display: flex;
            gap: 3px;
            padding: 12px 16px;
        }

        .geovi-loading-dot {
            width: 6px;
            height: 6px;
            background: #cbd5e0;
            border-radius: 50%;
            animation: geovi-loadingBounce 1.4s infinite ease-in-out both;
        }

        .geovi-loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .geovi-loading-dot:nth-child(2) { animation-delay: -0.16s; }

        /* Animations */
        @keyframes geovi-bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-6px);
            }
            60% {
                transform: translateY(-3px);
            }
        }

        @keyframes geovi-blink {
            0%, 90%, 100% {
                height: 10px;
            }
            95% {
                height: 1px;
            }
        }

        @media (max-width: 768px) {
            @keyframes geovi-blink {
                0%, 90%, 100% {
                    height: 8px;
                }
                95% {
                    height: 1px;
                }
            }
        }

        @keyframes geovi-slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes geovi-loadingBounce {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }
    `;

    // Widget HTML Template
    const WIDGET_HTML = `
        <div class="geovi-speech-bubble" id="geovi-speech-bubble">
            Salut! Sunt Geovi și te ajut cu încălzirea! 🔥
        </div>
        
        <div class="geovi-character" id="geovi-character">
            <div class="geovi-smiley-face">
                <div class="geovi-eyes">
                    <div class="geovi-eye"></div>
                    <div class="geovi-eye"></div>
                </div>
                <div class="geovi-smile"></div>
            </div>
        </div>

        <div class="geovi-chat-window" id="geovi-chat-window">
            <div class="geovi-chat-header">
                <h3>🔥 Geovi - Asistent AI</h3>
                <button class="geovi-close-btn" id="geovi-close-btn">&times;</button>
            </div>
            <div class="geovi-chat-messages" id="geovi-chat-messages">
                <div class="geovi-message bot">
                    Salut! Sunt Geovi, asistentul tău AI! 🔥<br><br>
                    Te pot ajuta cu:
                    <br>• Radiatoare și calorifere
                    <br>• Cazane și centrale termice  
                    <br>• Sisteme de încălzire
                    <br>• Sfaturi tehnice
                    <br><br>
                    Cu ce te pot ajuta astăzi?
                </div>
            </div>
            <div class="geovi-chat-input-container">
                <input type="text" class="geovi-chat-input" id="geovi-chat-input" placeholder="Scrie mesajul tău aici..." />
                <button class="geovi-send-btn" id="geovi-send-btn">Trimite</button>
            </div>
        </div>
    `;

    // Main Widget Class - ADAPTED FOR N8N CHAT AGENT
    class GeoviChatWidget {
        constructor(options = {}) {
            this.options = {
                webhook: options.webhook || '',
                position: options.position || 'bottom-right',
                greeting: options.greeting || 'Salut! Sunt Geovi și te ajut cu încălzirea! 🔥',
                ...options
            };

            this.isConnected = false;
            this.sessionId = this.generateSessionId();
            
            this.init();
        }

        init() {
            // Inject CSS
            this.injectCSS();
            
            // Create container
            this.createContainer();
            
            // Bind events
            this.bindEvents();
            
            // Show greeting
            this.showGreeting();

            // Connect to n8n chat endpoint
            if (this.options.webhook) {
                this.connect(this.options.webhook);
            }

            console.log('🔥 Geovi Chat Widget initialized for n8n');
        }

        injectCSS() {
            if (!document.getElementById('geovi-chat-styles')) {
                const style = document.createElement('style');
                style.id = 'geovi-chat-styles';
                style.textContent = CSS_STYLES;
                document.head.appendChild(style);
            }
        }

        createContainer() {
            // Remove existing container
            const existing = document.getElementById('geovi-chat-container');
            if (existing) {
                existing.remove();
            }

            // Create new container
            this.container = document.createElement('div');
            this.container.id = 'geovi-chat-container';
            this.container.className = 'geovi-chat-container';
            this.container.innerHTML = WIDGET_HTML;

            // Add to page
            document.body.appendChild(this.container);

            // Get elements
            this.character = document.getElementById('geovi-character');
            this.speechBubble = document.getElementById('geovi-speech-bubble');
            this.chatWindow = document.getElementById('geovi-chat-window');
            this.chatMessages = document.getElementById('geovi-chat-messages');
            this.chatInput = document.getElementById('geovi-chat-input');
            this.sendBtn = document.getElementById('geovi-send-btn');
            this.closeBtn = document.getElementById('geovi-close-btn');
        }

        bindEvents() {
            this.character.addEventListener('click', () => this.toggleChat());
            this.closeBtn.addEventListener('click', () => this.closeChat());
            this.sendBtn.addEventListener('click', () => this.sendMessage());
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        showGreeting() {
            setTimeout(() => {
                this.speechBubble.classList.add('show');
            }, 3000);

            setTimeout(() => {
                this.speechBubble.classList.remove('show');
            }, 9000);
        }

        toggleChat() {
            this.speechBubble.classList.remove('show');
            const isShowing = this.chatWindow.classList.contains('show');
            
            if (isShowing) {
                this.chatWindow.classList.remove('show');
                this.enableBodyScroll();
            } else {
                this.chatWindow.classList.add('show');
                this.disableBodyScroll();
                
                // Focus input after a short delay to ensure proper rendering
                setTimeout(() => {
                    this.chatInput.focus();
                }, 100);
            }
        }

        closeChat() {
            this.chatWindow.classList.remove('show');
            this.enableBodyScroll();
        }

        disableBodyScroll() {
            // Prevent body scroll on mobile and handle viewport issues
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.height = '100%';
                
                // Save current scroll position
                this.scrollPosition = window.pageYOffset;
                document.body.style.top = `-${this.scrollPosition}px`;
            }
        }

        enableBodyScroll() {
            // Re-enable body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            
            // Restore scroll position
            if (this.scrollPosition !== undefined) {
                window.scrollTo(0, this.scrollPosition);
            }
        }

        connect(webhookUrl) {
            this.options.webhook = webhookUrl;
            this.isConnected = true;
            console.log('🔥 Geovi connected to n8n chat:', webhookUrl);
        }

        async sendMessage() {
            if (!this.isConnected || !this.options.webhook) {
                this.addMessage('Geovi nu este conectat încă. Te rog să încerci mai târziu.', 'bot');
                return;
            }

            const message = this.chatInput.value.trim();
            if (!message) return;

            // Add user message
            this.addMessage(message, 'user');
            this.chatInput.value = '';
            this.sendBtn.disabled = true;

            // Show loading
            const loadingElement = this.showLoading();

            try {
                // N8N Chat Agent format
                const payload = {
                    action: 'sendMessage',
                    sessionId: this.sessionId,
                    chatInput: message
                };

                console.log('Sending to n8n:', payload);

                const response = await fetch(this.options.webhook, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('n8n Response:', data);
                
                // Remove loading
                loadingElement.remove();
                
                // Handle n8n chat response format
                let botMessage = '';
                
                if (data.output) {
                    botMessage = data.output;
                } else if (data.response) {
                    botMessage = data.response;
                } else if (data.message) {
                    botMessage = data.message;
                } else if (typeof data === 'string') {
                    botMessage = data;
                } else {
                    botMessage = 'Am primit răspunsul, dar nu îl pot afișa corect.';
                }
                
                this.addMessage(botMessage, 'bot');
                
            } catch (error) {
                console.error('Geovi n8n error:', error);
                loadingElement.remove();
                this.addMessage('Îmi pare rău, am o problemă de conexiune cu sistemul AI. Te rog încearcă din nou.', 'bot');
            }

            this.sendBtn.disabled = false;
            this.chatInput.focus();
        }

        addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `geovi-message ${sender}`;
            
            // Handle HTML content safely
            if (message.includes('<br>')) {
                messageElement.innerHTML = message;
            } else {
                messageElement.textContent = message;
            }
            
            this.chatMessages.appendChild(messageElement);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }

        showLoading() {
            const loadingElement = document.createElement('div');
            loadingElement.className = 'geovi-message bot geovi-loading';
            loadingElement.innerHTML = `
                <div class="geovi-loading-dot"></div>
                <div class="geovi-loading-dot"></div>
                <div class="geovi-loading-dot"></div>
            `;
            
            this.chatMessages.appendChild(loadingElement);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            
            return loadingElement;
        }

        generateSessionId() {
            return 'geovi-n8n-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }

        // Public methods
        destroy() {
            if (this.container) {
                this.container.remove();
            }
            const styles = document.getElementById('geovi-chat-styles');
            if (styles) {
                styles.remove();
            }
        }

        setWebhook(url) {
            this.connect(url);
        }

        openChat() {
            this.speechBubble.classList.remove('show');
            this.chatWindow.classList.add('show');
            this.chatInput.focus();
        }
    }

    // Global API
    window.GeoviChatWidget = GeoviChatWidget;
    
    // Simple API for easy integration
    window.Geovi = {
        init: function(options) {
            if (typeof options === 'string') {
                options = { webhook: options };
            }
            return new GeoviChatWidget(options);
        }
    };

    // Auto-init if data attributes exist
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.querySelector('script[data-geovi-webhook]');
        if (script) {
            const webhook = script.getAttribute('data-geovi-webhook');
            window.Geovi.init(webhook);
        }
    });

})();
