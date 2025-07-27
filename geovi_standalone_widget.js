/*!
 * Geovi Chat Widget v2.2 - Standalone & Zoom Independent
 * AI Assistant pentru sisteme de încălzire - Optimizat pentru n8n
 * © 2025 Crego.ro
 */

(function() {
    'use strict';

    // Prevent multiple initialization
    if (window.GeoviChatWidget) {
        return;
    }

    // CSS Styles - STANDALONE & ZOOM INDEPENDENT
    const CSS_STYLES = `
        /* RESET & ISOLATION - Widget complet izolat */
        .geovi-chat-container, 
        .geovi-chat-container *,
        .geovi-chat-container *::before,
        .geovi-chat-container *::after {
            all: initial !important;
            box-sizing: border-box !important;
            /* Force specific font to avoid inheritance */
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif !important;
        }

        /* CONTAINER - Poziționare SIGURĂ în ecran */
        .geovi-chat-container {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            z-index: 2147483647 !important;
            /* Dimensiuni exacte pentru a nu ieși din ecran */
            width: 80px !important;
            height: 80px !important;
            /* ANTI-ZOOM */
            transform: scale(1) !important;
            transform-origin: bottom right !important;
            pointer-events: auto !important;
            isolation: isolate !important;
        }

        /* CHARACTER BUTTON - MĂRIT SUFICIENT */
        .geovi-character {
            position: relative !important;
            width: 80px !important;
            height: 80px !important;
            cursor: pointer !important;
            transition: transform 0.3s ease !important;
            animation: geovi-bounce 4s infinite !important;
            touch-action: manipulation !important;
            display: block !important;
            /* Anti-zoom și anti-interference */
            transform-origin: center !important;
            user-select: none !important;
            -webkit-user-select: none !important;
        }

        .geovi-character:active {
            transform: scale(0.9) !important;
        }

        /* SMILEY FACE - Dimensiuni fixe */
        .geovi-smiley-face {
            width: 70px !important;
            height: 70px !important;
            background: #FFD700 !important;
            border: 5px solid #000 !important;
            border-radius: 50% !important;
            position: absolute !important;
            top: 5px !important;
            left: 5px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
        }

        /* EYES */
        .geovi-eyes {
            display: flex !important;
            gap: 12px !important;
            margin-bottom: 8px !important;
        }

        .geovi-eye {
            width: 12px !important;
            height: 12px !important;
            background: #000 !important;
            border-radius: 50% !important;
            animation: geovi-blink 3s infinite !important;
        }

        /* SMILE */
        .geovi-smile {
            width: 28px !important;
            height: 14px !important;
            border: 3px solid #000 !important;
            border-top: none !important;
            border-radius: 0 0 28px 28px !important;
        }

        /* SPEECH BUBBLE - Poziționare SIGURĂ */
        .geovi-speech-bubble {
            position: absolute !important;
            bottom: 90px !important;
            /* Poziționare simplă care nu iese din ecran */
            right: 0px !important;
            width: 200px !important;
            /* Centrare prin transform */
            transform-origin: bottom center !important;
            margin-right: -60px !important;
            background: white !important;
            padding: 12px 16px !important;
            border-radius: 18px !important;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: 1.4 !important;
            color: #333 !important;
            opacity: 0 !important;
            transform: translateY(10px) scale(0.9) !important;
            transition: all 0.4s ease !important;
            pointer-events: none !important;
            border: 3px solid #FFD700 !important;
            text-align: center !important;
            display: block !important;
        }

        .geovi-speech-bubble.show {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
        }

        /* Speech bubble arrow - CENTRAT */
        .geovi-speech-bubble::after {
            content: '' !important;
            position: absolute !important;
            bottom: -12px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 0 !important;
            height: 0 !important;
            border-top: 12px solid white !important;
            border-left: 12px solid transparent !important;
            border-right: 12px solid transparent !important;
        }

        .geovi-speech-bubble::before {
            content: '' !important;
            position: absolute !important;
            bottom: -15px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 0 !important;
            height: 0 !important;
            border-top: 15px solid #FFD700 !important;
            border-left: 15px solid transparent !important;
            border-right: 15px solid transparent !important;
        }

        /* CHAT WINDOW - LAYOUT FIX: Top=Chat, Middle=Input, Bottom=Keyboard */
        .geovi-chat-window {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            background: white !important;
            display: none !important;
            flex-direction: column !important;
            overflow: hidden !important;
            z-index: 2147483647 !important;
            /* Anti-zoom */
            transform: scale(1) !important;
            transform-origin: center !important;
        }

        .geovi-chat-window.show {
            display: flex !important;
            animation: geovi-slideUp 0.3s ease !important;
        }

        /* HEADER - Fixed height */
        .geovi-chat-header {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%) !important;
            color: #333 !important;
            padding: 15px 20px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 3px solid #000 !important;
            /* Fixed height pentru layout predictibil */
            height: 70px !important;
            min-height: 70px !important;
            flex-shrink: 0 !important;
            /* Safe area pentru notch */
            padding-top: max(15px, env(safe-area-inset-top, 0px)) !important;
        }

        .geovi-chat-header h3 {
            margin: 0 !important;
            font-size: 18px !important;
            font-weight: bold !important;
            color: #333 !important;
        }

        .geovi-close-btn {
            background: none !important;
            border: 3px solid #000 !important;
            color: #000 !important;
            font-size: 20px !important;
            cursor: pointer !important;
            padding: 0 !important;
            border-radius: 50% !important;
            transition: all 0.2s ease !important;
            font-weight: bold !important;
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            line-height: 1 !important;
        }

        .geovi-close-btn:active {
            background: #000 !important;
            color: #FFD700 !important;
            transform: scale(0.9) !important;
        }

        /* MESSAGES AREA - Flex grow pentru tot spațiul rămas */
        .geovi-chat-messages {
            flex: 1 !important;
            padding: 20px !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 15px !important;
            background: #fafafa !important;
            /* Smooth scrolling */
            -webkit-overflow-scrolling: touch !important;
            scroll-behavior: smooth !important;
        }

        /* MESSAGE BUBBLES */
        .geovi-message {
            max-width: 85% !important;
            padding: 14px 18px !important;
            border-radius: 18px !important;
            font-size: 16px !important;
            line-height: 1.5 !important;
            border: 3px solid #ddd !important;
            word-wrap: break-word !important;
            animation: geovi-messageSlide 0.3s ease !important;
            display: block !important;
        }

        .geovi-message.bot {
            background: white !important;
            border-color: #FFD700 !important;
            align-self: flex-start !important;
            color: #1a1a1a !important;
        }

        .geovi-message.user {
            background: #FFD700 !important;
            color: #333 !important;
            border-color: #000 !important;
            align-self: flex-end !important;
            font-weight: 500 !important;
        }

        /* INPUT CONTAINER - Fixed height la bottom */
        .geovi-chat-input-container {
            padding: 18px 20px !important;
            border-top: 3px solid #FFD700 !important;
            display: flex !important;
            gap: 12px !important;
            background: white !important;
            /* Fixed height pentru layout predictibil */
            height: 80px !important;
            min-height: 80px !important;
            flex-shrink: 0 !important;
            align-items: center !important;
            /* Safe area pentru home indicator */
            padding-bottom: max(18px, env(safe-area-inset-bottom, 0px)) !important;
        }

        .geovi-chat-input {
            flex: 1 !important;
            padding: 14px 18px !important;
            border: 3px solid #FFD700 !important;
            border-radius: 25px !important;
            outline: none !important;
            /* IMPORTANT: Previne zoom pe iOS */
            font-size: 16px !important;
            background: white !important;
            color: #333 !important;
            /* Anti-zoom */
            transform: scale(1) !important;
        }

        .geovi-chat-input:focus {
            border-color: #000 !important;
            box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2) !important;
        }

        .geovi-send-btn {
            background: #FFD700 !important;
            color: #333 !important;
            border: 3px solid #000 !important;
            padding: 14px 20px !important;
            border-radius: 25px !important;
            cursor: pointer !important;
            font-size: 16px !important;
            font-weight: bold !important;
            transition: all 0.2s ease !important;
            min-width: 70px !important;
            height: 48px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .geovi-send-btn:active {
            background: #000 !important;
            color: #FFD700 !important;
            transform: scale(0.95) !important;
        }

        .geovi-send-btn:disabled {
            opacity: 0.6 !important;
            cursor: not-allowed !important;
        }

        /* LOADING ANIMATION */
        .geovi-loading {
            display: flex !important;
            gap: 6px !important;
            padding: 14px 18px !important;
            justify-content: center !important;
        }

        .geovi-loading-dot {
            width: 8px !important;
            height: 8px !important;
            background: #cbd5e0 !important;
            border-radius: 50% !important;
            animation: geovi-loadingBounce 1.4s infinite ease-in-out both !important;
        }

        .geovi-loading-dot:nth-child(1) { animation-delay: -0.32s !important; }
        .geovi-loading-dot:nth-child(2) { animation-delay: -0.16s !important; }

        /* ANIMATIONS */
        @keyframes geovi-bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) !important;
            }
            40% {
                transform: translateY(-8px) !important;
            }
            60% {
                transform: translateY(-4px) !important;
            }
        }

        @keyframes geovi-blink {
            0%, 90%, 100% {
                height: 12px !important;
            }
            95% {
                height: 2px !important;
            }
        }

        @keyframes geovi-slideUp {
            from {
                opacity: 0 !important;
                transform: translateY(100%) !important;
            }
            to {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        }

        @keyframes geovi-messageSlide {
            from {
                opacity: 0 !important;
                transform: translateY(10px) !important;
            }
            to {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        }

        @keyframes geovi-loadingBounce {
            0%, 80%, 100% {
                transform: scale(0) !important;
            }
            40% {
                transform: scale(1) !important;
            }
        }

        /* DESKTOP OVERRIDE - Doar pentru desktop */
        @media (min-width: 1024px) {
            .geovi-chat-container {
                bottom: 20px !important;
                right: 20px !important;
                width: 70px !important;
                height: 70px !important;
            }
            
            .geovi-character {
                width: 70px !important;
                height: 70px !important;
            }
            
            .geovi-smiley-face {
                width: 60px !important;
                height: 60px !important;
                border: 4px solid #000 !important;
            }
            
            .geovi-eyes {
                gap: 10px !important;
                margin-bottom: 6px !important;
            }
            
            .geovi-eye {
                width: 10px !important;
                height: 10px !important;
            }
            
            .geovi-smile {
                width: 24px !important;
                height: 12px !important;
                border: 3px solid #000 !important;
                border-radius: 0 0 24px 24px !important;
            }

            .geovi-chat-window {
                position: absolute !important;
                bottom: 90px !important;
                right: 0 !important;
                left: auto !important;
                top: auto !important;
                width: 350px !important;
                height: 450px !important;
                border-radius: 15px !important;
                border: 3px solid #FFD700 !important;
                box-shadow: 0 8px 25px rgba(0,0,0,0.2) !important;
            }

            .geovi-speech-bubble {
                bottom: 10px !important;
                right: 80px !important;
                margin-right: 0 !important;
                width: 260px !important;
                text-align: left !important;
                font-size: 13px !important;
                padding: 12px 16px !important;
                transform: translateX(10px) !important;
            }

            .geovi-speech-bubble.show {
                transform: translateX(0) !important;
            }

            .geovi-speech-bubble::after {
                bottom: 20px !important;
                right: -8px !important;
                left: auto !important;
                transform: none !important;
                border-top: 8px solid transparent !important;
                border-bottom: 8px solid transparent !important;
                border-left: 8px solid white !important;
                border-right: none !important;
            }

            .geovi-speech-bubble::before {
                bottom: 18px !important;
                right: -10px !important;
                left: auto !important;
                transform: none !important;
                border-top: 10px solid transparent !important;
                border-bottom: 10px solid transparent !important;
                border-left: 10px solid #FFD700 !important;
                border-right: none !important;
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

    // Main Widget Class - FUNCȚIONALITATEA N8N PĂSTRATĂ INTACTĂ
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

            console.log('🔥 Geovi Chat Widget initialized - Standalone & Zoom Independent');
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
            }, 1500);

            setTimeout(() => {
                this.speechBubble.classList.remove('show');
            }, 8000);
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
                
                setTimeout(() => {
                    if (this.chatInput) {
                        this.chatInput.focus();
                    }
                }, 300);
            }
        }

        closeChat() {
            this.chatWindow.classList.remove('show');
            this.enableBodyScroll();
        }

        disableBodyScroll() {
            document.body.style.overflow = 'hidden';
        }

        enableBodyScroll() {
            document.body.style.overflow = '';
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
                // N8N Chat Agent format - PĂSTRAT IDENTIC
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
                
                // Handle n8n chat response format - PĂSTRAT IDENTIC
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
            
            // Handle HTML content safely - PĂSTRAT IDENTIC
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

        // Public methods - PĂSTRATE IDENTIC
        destroy() {
            if (this.container) {
                this.container.remove();
            }
            const styles = document.getElementById('geovi-chat-styles');
            if (styles) {
                styles.remove();
            }
            this.enableBodyScroll();
        }

        setWebhook(url) {
            this.connect(url);
        }

        openChat() {
            this.speechBubble.classList.remove('show');
            this.chatWindow.classList.add('show');
            this.disableBodyScroll();
            setTimeout(() => {
                this.chatInput.focus();
            }, 300);
        }
    }

    // Global API - PĂSTRAT IDENTIC
    window.GeoviChatWidget = GeoviChatWidget;
    
    // Simple API for easy integration - PĂSTRAT IDENTIC
    window.Geovi = {
        init: function(options) {
            if (typeof options === 'string') {
                options = { webhook: options };
            }
            return new GeoviChatWidget(options);
        }
    };

    // Auto-init if data attributes exist - PĂSTRAT IDENTIC
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.querySelector('script[data-geovi-webhook]');
        if (script) {
            const webhook = script.getAttribute('data-geovi-webhook');
            window.Geovi.init(webhook);
        }
    });

})();
