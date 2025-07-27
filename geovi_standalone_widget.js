/*!
 * Geovi Chat Widget v3.0 - Fresh Start
 * AI Assistant pentru sisteme de încălzire - Optimizat pentru n8n
 * © 2025 Crego.ro
 */

(function() {
    'use strict';

    // Prevent multiple initialization
    if (window.GeoviChatWidget) {
        return;
    }

    // CSS Styles - FRESH START
    const CSS_STYLES = `
        /* RESET COMPLET */
        .geovi-widget-v3, 
        .geovi-widget-v3 *,
        .geovi-widget-v3 *::before,
        .geovi-widget-v3 *::after {
            all: unset !important;
            box-sizing: border-box !important;
            font-family: system-ui, -apple-system, sans-serif !important;
        }

        /* WIDGET CONTAINER - SIMPLU ȘI CLAR */
        .geovi-widget-v3 {
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 90px !important;
            height: 90px !important;
            z-index: 999999 !important;
            display: block !important;
        }

        /* BUTTON PRINCIPAL */
        .geovi-btn-v3 {
            position: relative !important;
            width: 90px !important;
            height: 90px !important;
            cursor: pointer !important;
            display: block !important;
            transition: transform 0.2s ease !important;
        }

        .geovi-btn-v3:active {
            transform: scale(0.95) !important;
        }

        /* SMILEY FACE */
        .geovi-face-v3 {
            width: 80px !important;
            height: 80px !important;
            background: #FFD700 !important;
            border: 4px solid #000 !important;
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
        .geovi-eyes-v3 {
            display: flex !important;
            gap: 14px !important;
            margin-bottom: 8px !important;
        }

        .geovi-eye-v3 {
            width: 14px !important;
            height: 14px !important;
            background: #000 !important;
            border-radius: 50% !important;
        }

        /* SMILE */
        .geovi-mouth-v3 {
            width: 30px !important;
            height: 15px !important;
            border: 3px solid #000 !important;
            border-top: none !important;
            border-radius: 0 0 30px 30px !important;
        }

        /* BUBBLE */
        .geovi-bubble-v3 {
            position: absolute !important;
            bottom: 100px !important;
            right: -50px !important;
            width: 190px !important;
            background: white !important;
            border: 3px solid #FFD700 !important;
            border-radius: 15px !important;
            padding: 12px 15px !important;
            font-size: 14px !important;
            color: #333 !important;
            text-align: center !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
            opacity: 0 !important;
            transform: translateY(20px) !important;
            transition: all 0.3s ease !important;
            pointer-events: none !important;
            display: block !important;
        }

        .geovi-bubble-v3.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* Bubble arrow */
        .geovi-bubble-v3::after {
            content: '' !important;
            position: absolute !important;
            bottom: -10px !important;
            left: 70px !important;
            width: 0 !important;
            height: 0 !important;
            border-left: 10px solid transparent !important;
            border-right: 10px solid transparent !important;
            border-top: 10px solid white !important;
        }

        .geovi-bubble-v3::before {
            content: '' !important;
            position: absolute !important;
            bottom: -13px !important;
            left: 67px !important;
            width: 0 !important;
            height: 0 !important;
            border-left: 13px solid transparent !important;
            border-right: 13px solid transparent !important;
            border-top: 13px solid #FFD700 !important;
        }

        /* CHAT WINDOW - FULL SCREEN */
        .geovi-chat-v3 {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: white !important;
            z-index: 1000000 !important;
            display: none !important;
            flex-direction: column !important;
        }

        .geovi-chat-v3.open {
            display: flex !important;
        }

        /* HEADER */
        .geovi-header-v3 {
            background: linear-gradient(135deg, #FFD700, #FFA500) !important;
            padding: 20px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-bottom: 2px solid #000 !important;
            flex-shrink: 0 !important;
        }

        .geovi-title-v3 {
            font-size: 20px !important;
            font-weight: bold !important;
            color: #333 !important;
            margin: 0 !important;
        }

        .geovi-close-v3 {
            width: 40px !important;
            height: 40px !important;
            border: 2px solid #000 !important;
            border-radius: 50% !important;
            background: none !important;
            font-size: 24px !important;
            color: #000 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s ease !important;
        }

        .geovi-close-v3:active {
            background: #000 !important;
            color: #FFD700 !important;
        }

        /* MESSAGES AREA */
        .geovi-messages-v3 {
            flex: 1 !important;
            padding: 20px !important;
            overflow-y: auto !important;
            background: #f8f8f8 !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 15px !important;
        }

        /* MESSAGE BUBBLES */
        .geovi-msg-v3 {
            max-width: 80% !important;
            padding: 15px 18px !important;
            border-radius: 20px !important;
            font-size: 16px !important;
            line-height: 1.4 !important;
            border: 2px solid #ddd !important;
            word-wrap: break-word !important;
            display: block !important;
        }

        .geovi-msg-v3.bot {
            background: white !important;
            border-color: #FFD700 !important;
            color: #333 !important;
            align-self: flex-start !important;
        }

        .geovi-msg-v3.user {
            background: #FFD700 !important;
            border-color: #000 !important;
            color: #333 !important;
            align-self: flex-end !important;
            font-weight: 500 !important;
        }

        /* INPUT AREA */
        .geovi-input-v3 {
            padding: 20px !important;
            border-top: 2px solid #FFD700 !important;
            background: white !important;
            display: flex !important;
            gap: 12px !important;
            align-items: center !important;
            flex-shrink: 0 !important;
            min-height: 90px !important;
            height: 90px !important;
        }

        .geovi-field-v3 {
            flex: 1 !important;
            padding: 15px 18px !important;
            border: 2px solid #FFD700 !important;
            border-radius: 25px !important;
            font-size: 16px !important;
            outline: none !important;
            background: white !important;
            color: #333 !important;
            display: block !important;
            width: 100% !important;
            height: 50px !important;
            line-height: normal !important;
            appearance: none !important;
            -webkit-appearance: none !important;
        }

        .geovi-field-v3:focus {
            border-color: #000 !important;
        }

        .geovi-send-v3 {
            padding: 15px 20px !important;
            background: #FFD700 !important;
            border: 2px solid #000 !important;
            border-radius: 25px !important;
            font-size: 16px !important;
            font-weight: bold !important;
            color: #333 !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            display: block !important;
            min-width: 80px !important;
            height: 50px !important;
            flex-shrink: 0 !important;
        }

        .geovi-send-v3:active {
            background: #000 !important;
            color: #FFD700 !important;
        }

        .geovi-send-v3:disabled {
            opacity: 0.5 !important;
            cursor: not-allowed !important;
        }

        /* LOADING */
        .geovi-loading-v3 {
            display: flex !important;
            gap: 4px !important;
            padding: 15px 18px !important;
            justify-content: center !important;
        }

        .geovi-dot-v3 {
            width: 8px !important;
            height: 8px !important;
            background: #ccc !important;
            border-radius: 50% !important;
            animation: geovi-bounce-v3 1.4s infinite ease-in-out !important;
        }

        .geovi-dot-v3:nth-child(1) { animation-delay: -0.32s !important; }
        .geovi-dot-v3:nth-child(2) { animation-delay: -0.16s !important; }

        @keyframes geovi-bounce-v3 {
            0%, 80%, 100% { transform: scale(0) !important; }
            40% { transform: scale(1) !important; }
        }

        /* DESKTOP STYLES */
        @media (min-width: 1200px) {
            .geovi-widget-v3 {
                width: 70px !important;
                height: 70px !important;
            }

            .geovi-btn-v3 {
                width: 70px !important;
                height: 70px !important;
            }

            .geovi-face-v3 {
                width: 60px !important;
                height: 60px !important;
                border: 3px solid #000 !important;
            }

            .geovi-eyes-v3 {
                gap: 10px !important;
                margin-bottom: 6px !important;
            }

            .geovi-eye-v3 {
                width: 10px !important;
                height: 10px !important;
            }

            .geovi-mouth-v3 {
                width: 20px !important;
                height: 10px !important;
                border: 2px solid #000 !important;
                border-radius: 0 0 20px 20px !important;
            }

            .geovi-chat-v3 {
                position: absolute !important;
                top: auto !important;
                bottom: 80px !important;
                right: 0 !important;
                left: auto !important;
                width: 380px !important;
                height: 500px !important;
                border-radius: 15px !important;
                border: 3px solid #FFD700 !important;
            }

            .geovi-bubble-v3 {
                bottom: 10px !important;
                right: 80px !important;
                width: 250px !important;
                text-align: left !important;
            }

            .geovi-bubble-v3::after {
                bottom: 15px !important;
                right: -8px !important;
                left: auto !important;
                border-top: 8px solid transparent !important;
                border-bottom: 8px solid transparent !important;
                border-left: 8px solid white !important;
                border-right: none !important;
            }

            .geovi-bubble-v3::before {
                bottom: 13px !important;
                right: -11px !important;
                left: auto !important;
                border-top: 11px solid transparent !important;
                border-bottom: 11px solid transparent !important;
                border-left: 11px solid #FFD700 !important;
                border-right: none !important;
            }
        }
    `;

    // Widget HTML Template
    const WIDGET_HTML = `
        <div class="geovi-bubble-v3" id="geovi-bubble">
            Salut! Sunt Geovi și te ajut cu încălzirea! 🔥
        </div>
        
        <div class="geovi-btn-v3" id="geovi-btn">
            <div class="geovi-face-v3">
                <div class="geovi-eyes-v3">
                    <div class="geovi-eye-v3"></div>
                    <div class="geovi-eye-v3"></div>
                </div>
                <div class="geovi-mouth-v3"></div>
            </div>
        </div>

        <div class="geovi-chat-v3" id="geovi-chat">
            <div class="geovi-header-v3">
                <h3 class="geovi-title-v3">🔥 Geovi - Asistent AI</h3>
                <button class="geovi-close-v3" id="geovi-close">&times;</button>
            </div>
            <div class="geovi-messages-v3" id="geovi-messages">
                <div class="geovi-msg-v3 bot">
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
            <div class="geovi-input-v3">
                <input type="text" class="geovi-field-v3" id="geovi-field" placeholder="Scrie mesajul tău aici..." />
                <button class="geovi-send-v3" id="geovi-send">Trimite</button>
            </div>
        </div>
    `;

    // Main Widget Class - FUNCȚIONALITATEA N8N PĂSTRATĂ IDENTICĂ
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
            // Remove old version if exists
            this.cleanup();
            
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

            console.log('🔥 Geovi Chat Widget v3.0 - Fresh Start!');
        }

        cleanup() {
            // Remove old versions
            const oldContainer = document.getElementById('geovi-chat-container');
            if (oldContainer) oldContainer.remove();
            
            const oldStyles = document.getElementById('geovi-chat-styles');
            if (oldStyles) oldStyles.remove();
        }

        injectCSS() {
            const style = document.createElement('style');
            style.id = 'geovi-styles-v3';
            style.textContent = CSS_STYLES;
            document.head.appendChild(style);
        }

        createContainer() {
            this.container = document.createElement('div');
            this.container.id = 'geovi-widget';
            this.container.className = 'geovi-widget-v3';
            this.container.innerHTML = WIDGET_HTML;

            document.body.appendChild(this.container);

            // Get elements
            this.btn = document.getElementById('geovi-btn');
            this.bubble = document.getElementById('geovi-bubble');
            this.chat = document.getElementById('geovi-chat');
            this.messages = document.getElementById('geovi-messages');
            this.field = document.getElementById('geovi-field');
            this.send = document.getElementById('geovi-send');
            this.close = document.getElementById('geovi-close');

            // DEBUG - Check if elements exist
            console.log('🔍 Geovi Debug:');
            console.log('- Field element:', this.field);
            console.log('- Send element:', this.send);
            console.log('- Chat element:', this.chat);
            
            if (this.field) {
                console.log('- Field visible:', window.getComputedStyle(this.field).display);
                console.log('- Field opacity:', window.getComputedStyle(this.field).opacity);
            }
        }

        bindEvents() {
            this.btn.addEventListener('click', () => this.toggleChat());
            this.close.addEventListener('click', () => this.closeChat());
            this.send.addEventListener('click', () => this.sendMessage());
            this.field.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        showGreeting() {
            setTimeout(() => {
                this.bubble.classList.add('visible');
            }, 2000);

            setTimeout(() => {
                this.bubble.classList.remove('visible');
            }, 8000);
        }

        toggleChat() {
            this.bubble.classList.remove('visible');
            const isOpen = this.chat.classList.contains('open');
            
            if (isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        openChat() {
            this.chat.classList.add('open');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                this.field.focus();
            }, 100);
        }

        closeChat() {
            this.chat.classList.remove('open');
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

            const message = this.field.value.trim();
            if (!message) return;

            // Add user message
            this.addMessage(message, 'user');
            this.field.value = '';
            this.send.disabled = true;

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

            this.send.disabled = false;
            this.field.focus();
        }

        addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `geovi-msg-v3 ${sender}`;
            
            // Handle HTML content safely - PĂSTRAT IDENTIC
            if (message.includes('<br>')) {
                messageElement.innerHTML = message;
            } else {
                messageElement.textContent = message;
            }
            
            this.messages.appendChild(messageElement);
            this.messages.scrollTop = this.messages.scrollHeight;
        }

        showLoading() {
            const loadingElement = document.createElement('div');
            loadingElement.className = 'geovi-msg-v3 bot geovi-loading-v3';
            loadingElement.innerHTML = `
                <div class="geovi-dot-v3"></div>
                <div class="geovi-dot-v3"></div>
                <div class="geovi-dot-v3"></div>
            `;
            
            this.messages.appendChild(loadingElement);
            this.messages.scrollTop = this.messages.scrollHeight;
            
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
            const styles = document.getElementById('geovi-styles-v3');
            if (styles) {
                styles.remove();
            }
            document.body.style.overflow = '';
        }

        setWebhook(url) {
            this.connect(url);
        }

        openChat() {
            this.bubble.classList.remove('visible');
            this.chat.classList.add('open');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                this.field.focus();
            }, 100);
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
