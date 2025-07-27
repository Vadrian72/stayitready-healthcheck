/*!
 * Geovi Chat Widget v2.1 - Mobile Optimized
 * AI Assistant pentru sisteme de încălzire - Optimizat pentru n8n
 * © 2025 Crego.ro
 */

(function() {
    'use strict';

    // Prevent multiple initialization
    if (window.GeoviChatWidget) {
        return;
    }

    // CSS Styles - Mobile Optimized
    const CSS_STYLES = `
        /* Geovi Chat Widget Styles */
        .geovi-chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        }

        /* MOBILE FIRST APPROACH */
        .geovi-character {
            position: relative;
            width: 120px;
            height: 120px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: geovi-bounce 4s infinite;
            touch-action: manipulation;
            /* Better touch target */
            min-width: 44px;
            min-height: 44px;
        }

        /* Desktop override */
        @media (min-width: 769px) {
            .geovi-character {
                width: 70px;
                height: 70px;
            }
            
            .geovi-chat-container {
                bottom: 20px;
                right: 20px;
            }
        }

        /* Touch interactions */
        .geovi-character:active {
            transform: scale(0.95);
        }

        @media (hover: hover) and (pointer: fine) {
            .geovi-character:hover {
                transform: scale(1.1);
            }
            
            .geovi-character:active {
                transform: scale(1.05);
            }
        }

        /* SMILEY FACE - Mobile First */
        .geovi-smiley-face {
            width: 110px;
            height: 110px;
            background: #FFD700;
            border: 5px solid #000;
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

        /* Desktop override */
        @media (min-width: 769px) {
            .geovi-smiley-face {
                width: 60px;
                height: 60px;
                border: 4px solid #000;
                top: 5px;
                left: 5px;
            }
        }

        /* EYES - Mobile First */
        .geovi-eyes {
            display: flex;
            gap: 18px;
            margin-bottom: 12px;
        }

        .geovi-eye {
            width: 20px;
            height: 20px;
            background: #000;
            border-radius: 50%;
            animation: geovi-blink 3s infinite;
        }

        /* Desktop override */
        @media (min-width: 769px) {
            .geovi-eyes {
                gap: 10px;
                margin-bottom: 6px;
            }

            .geovi-eye {
                width: 10px;
                height: 10px;
            }
        }

        /* SMILE - Mobile First */
        .geovi-smile {
            width: 40px;
            height: 20px;
            border: 4px solid #000;
            border-top: none;
            border-radius: 0 0 40px 40px;
        }

        /* Desktop override */
        @media (min-width: 769px) {
            .geovi-smile {
                width: 24px;
                height: 12px;
                border: 3px solid #000;
                border-top: none;
                border-radius: 0 0 24px 24px;
            }
        }

        /* SPEECH BUBBLE - Mobile First */
        .geovi-speech-bubble {
            position: absolute;
            bottom: 140px;
            right: -60px;
            left: -60px;
            background: white;
            padding: 16px 20px;
            border-radius: 20px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.25);
            max-width: 280px;
            min-width: 200px;
            margin: 0 auto;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            opacity: 0;
            transform: translateY(10px) scale(0.9);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            border: 3px solid #FFD700;
            box-sizing: border-box;
            text-align: center;
            font-weight: 500;
        }

        .geovi-speech-bubble.show {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }

        /* Speech bubble arrow - mobile */
        .geovi-speech-bubble::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-top: 12px solid white;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
        }

        .geovi-speech-bubble::before {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-top: 15px solid #FFD700;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
        }

        /* Desktop speech bubble */
        @media (min-width: 769px) {
            .geovi-speech-bubble {
                bottom: 10px;
                right: 90px;
                left: auto;
                max-width: 280px;
                min-width: 200px;
                font-size: 13px;
                line-height: 1.4;
                padding: 12px 16px;
                text-align: left;
                transform: translateX(10px);
            }

            .geovi-speech-bubble.show {
                transform: translateX(0);
            }

            .geovi-speech-bubble::after {
                bottom: 20px;
                right: -8px;
                left: auto;
                transform: none;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-left: 8px solid white;
                border-right: none;
            }

            .geovi-speech-bubble::before {
                bottom: 18px;
                right: -10px;
                left: auto;
                transform: none;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-left: 10px solid #FFD700;
                border-right: none;
            }
        }

        /* CHAT WINDOW - Mobile First (Half Screen) */
        .geovi-chat-window {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: 50vh;
            width: 100%;
            height: 50vh;
            max-height: 50vh;
            background: white;
            border-radius: 20px 20px 0 0;
            border: 3px solid #FFD700;
            border-bottom: none;
            box-shadow: 0 -8px 25px rgba(0,0,0,0.3);
            display: none;
            flex-direction: column;
            overflow: hidden;
            box-sizing: border-box;
            z-index: 999999;
            /* Smooth transitions */
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .geovi-chat-window.show {
            display: flex;
            animation: geovi-slideUpMobile 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Desktop chat window */
        @media (min-width: 769px) {
            .geovi-chat-window {
                position: absolute;
                bottom: 90px;
                right: 0;
                left: auto;
                top: auto;
                width: 320px;
                height: 400px;
                max-height: 400px;
                border-radius: 15px;
                border: 3px solid #FFD700;
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            }

            .geovi-chat-window.show {
                animation: geovi-slideUp 0.3s ease;
            }
        }

        /* CHAT HEADER - Mobile Optimized */
        .geovi-chat-header {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #333;
            padding: 20px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #000;
            /* Safe area for notches */
            padding-top: max(20px, env(safe-area-inset-top, 0px));
        }

        .geovi-chat-header h3 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
        }

        .geovi-close-btn {
            background: none;
            border: 3px solid #000;
            color: #000;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.2s;
            font-weight: bold;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            /* Better touch target */
            min-width: 44px;
            min-height: 44px;
        }

        .geovi-close-btn:active {
            background: #000;
            color: #FFD700;
            transform: scale(0.95);
        }

        /* Desktop header */
        @media (min-width: 769px) {
            .geovi-chat-header {
                padding: 12px 16px;
            }

            .geovi-chat-header h3 {
                font-size: 16px;
            }

            .geovi-close-btn {
                font-size: 16px;
                padding: 4px 8px;
                width: 30px;
                height: 30px;
                border: 2px solid #000;
            }

            .geovi-close-btn:hover {
                background: #000;
                color: #FFD700;
            }
        }

        /* CHAT MESSAGES - Mobile Optimized */
        .geovi-chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
            background: #fafafa;
            /* Smooth scrolling */
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
        }

        /* Desktop messages */
        @media (min-width: 769px) {
            .geovi-chat-messages {
                padding: 16px;
                gap: 12px;
            }
        }

        /* MESSAGE BUBBLES - Mobile First */
        .geovi-message {
            max-width: 85%;
            padding: 16px 20px;
            border-radius: 20px;
            font-size: 16px;
            line-height: 1.5;
            border: 2px solid #ddd;
            box-sizing: border-box;
            word-wrap: break-word;
            animation: geovi-messageSlide 0.3s ease;
        }

        .geovi-message.bot {
            background: white;
            border-color: #FFD700;
            align-self: flex-start;
            color: #1a1a1a;
            border-width: 3px;
        }

        .geovi-message.user {
            background: #FFD700;
            color: #333;
            border-color: #000;
            border-width: 3px;
            align-self: flex-end;
            font-weight: 500;
        }

        /* Desktop messages */
        @media (min-width: 769px) {
            .geovi-message {
                max-width: 80%;
                padding: 10px 14px;
                border-radius: 15px;
                font-size: 13px;
                line-height: 1.4;
                border-width: 2px;
            }

            .geovi-message.bot {
                border-width: 2px;
            }

            .geovi-message.user {
                border-width: 2px;
                font-weight: normal;
            }
        }

        /* INPUT CONTAINER - Mobile Optimized with Keyboard Support */
        .geovi-chat-input-container {
            padding: 20px;
            border-top: 3px solid #FFD700;
            display: flex;
            gap: 12px;
            background: white;
            /* Keyboard handling */
            position: sticky;
            bottom: 0;
            /* Safe area for home indicator */
            padding-bottom: max(20px, env(safe-area-inset-bottom, 0px));
        }

        .geovi-chat-input {
            flex: 1;
            padding: 16px 20px;
            border: 3px solid #FFD700;
            border-radius: 25px;
            outline: none;
            font-size: 16px;
            box-sizing: border-box;
            /* Prevent zoom on iOS */
            font-size: max(16px, 1rem);
        }

        .geovi-chat-input:focus {
            border-color: #000;
            box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
        }

        .geovi-send-btn {
            background: #FFD700;
            color: #333;
            border: 3px solid #000;
            padding: 16px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.2s;
            /* Better touch target */
            min-width: 60px;
            min-height: 48px;
        }

        .geovi-send-btn:active {
            background: #000;
            color: #FFD700;
            transform: scale(0.95);
        }

        .geovi-send-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* Desktop input */
        @media (min-width: 769px) {
            .geovi-chat-input-container {
                padding: 12px;
                gap: 8px;
                border-top: 2px solid #FFD700;
            }

            .geovi-chat-input {
                padding: 10px 14px;
                border: 2px solid #FFD700;
                border-radius: 20px;
                font-size: 13px;
            }

            .geovi-send-btn {
                padding: 10px 16px;
                border: 2px solid #000;
                border-radius: 20px;
                font-size: 13px;
                min-width: auto;
                min-height: auto;
            }

            .geovi-send-btn:hover {
                background: #000;
                color: #FFD700;
            }
        }

        /* LOADING ANIMATION - Mobile Optimized */
        .geovi-loading {
            display: flex;
            gap: 4px;
            padding: 16px 20px;
            justify-content: center;
        }

        .geovi-loading-dot {
            width: 8px;
            height: 8px;
            background: #cbd5e0;
            border-radius: 50%;
            animation: geovi-loadingBounce 1.4s infinite ease-in-out both;
        }

        .geovi-loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .geovi-loading-dot:nth-child(2) { animation-delay: -0.16s; }

        /* Desktop loading */
        @media (min-width: 769px) {
            .geovi-loading {
                gap: 3px;
                padding: 12px 16px;
            }

            .geovi-loading-dot {
                width: 6px;
                height: 6px;
            }
        }

        /* ANIMATIONS - Enhanced */
        @keyframes geovi-bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-8px);
            }
            60% {
                transform: translateY(-4px);
            }
        }

        @keyframes geovi-blink {
            0%, 90%, 100% {
                height: 20px;
            }
            95% {
                height: 2px;
            }
        }

        @media (min-width: 769px) {
            @keyframes geovi-blink {
                0%, 90%, 100% {
                    height: 10px;
                }
                95% {
                    height: 1px;
                }
            }
        }

        @keyframes geovi-slideUpMobile {
            from {
                opacity: 0;
                transform: translateY(100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
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

        @keyframes geovi-messageSlide {
            from {
                opacity: 0;
                transform: translateY(10px);
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

        /* UTILITY CLASSES */
        .geovi-mobile-active {
            /* Prevent background scroll when chat is open */
        }

        /* Landscape orientation adjustments */
        @media (max-height: 500px) and (orientation: landscape) {
            .geovi-chat-window {
                top: 20px;
                height: calc(100vh - 20px);
                max-height: calc(100vh - 20px);
            }

            .geovi-character {
                width: 80px;
                height: 80px;
            }

            .geovi-smiley-face {
                width: 70px;
                height: 70px;
                border: 3px solid #000;
            }

            .geovi-eyes {
                gap: 12px;
                margin-bottom: 8px;
            }

            .geovi-eye {
                width: 12px;
                height: 12px;
            }

            .geovi-smile {
                width: 24px;
                height: 12px;
                border: 3px solid #000;
                border-top: none;
                border-radius: 0 0 24px 24px;
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

    // Main Widget Class - PĂSTRATĂ FUNCȚIONALITATEA N8N INTACTĂ
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
            
            // Detect mobile and add class
            this.detectMobile();
            
            // Bind events
            this.bindEvents();
            
            // Show greeting - TIMING ÎMBUNĂTĂȚIT
            this.showGreeting();

            // Connect to n8n chat endpoint
            if (this.options.webhook) {
                this.connect(this.options.webhook);
            }

            console.log('🔥 Geovi Chat Widget initialized for n8n');
            console.log('📱 Is Mobile:', this.isMobile);
            console.log('📏 Screen size:', window.innerWidth + 'x' + window.innerHeight);
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

        detectMobile() {
            // Enhanced mobile detection
            this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                           window.innerWidth <= 768 ||
                           ('ontouchstart' in window) ||
                           (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
            
            console.log('🔍 Mobile detection enhanced:');
            console.log('- User Agent Mobile:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
            console.log('- Screen Width <= 768:', window.innerWidth <= 768);
            console.log('- Touch Support:', 'ontouchstart' in window);
            console.log('- Max Touch Points:', navigator.maxTouchPoints);
            console.log('- Final isMobile:', this.isMobile);
            
            // Add mobile class to container (nu mai e necesar, folosim mobile-first CSS)
            if (this.isMobile) {
                document.body.classList.add('geovi-mobile-active');
            }
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

            // Enhanced viewport handling for mobile
            if (this.isMobile) {
                // Handle visual viewport changes (keyboard show/hide)
                if (window.visualViewport) {
                    window.visualViewport.addEventListener('resize', () => {
                        this.handleViewportChange();
                    });
                }

                // Fallback for older browsers
                window.addEventListener('resize', () => {
                    if (this.chatWindow.classList.contains('show')) {
                        this.handleViewportChange();
                    }
                });

                // Handle orientation changes
                window.addEventListener('orientationchange', () => {
                    setTimeout(() => {
                        this.handleViewportChange();
                    }, 100);
                });
            }
        }

        handleViewportChange() {
            if (!this.chatWindow.classList.contains('show')) return;

            // Force recalculation for keyboard handling
            const chatWindow = this.chatWindow;
            const isLandscape = window.innerHeight < 500;
            
            if (isLandscape) {
                chatWindow.style.top = '20px';
                chatWindow.style.height = 'calc(100vh - 20px)';
                chatWindow.style.maxHeight = 'calc(100vh - 20px)';
            } else {
                chatWindow.style.top = '50vh';
                chatWindow.style.height = '50vh';
                chatWindow.style.maxHeight = '50vh';
            }
        }

        showGreeting() {
            // TIMING ÎMBUNĂTĂȚIT - apare mai devreme și stă mai mult
            setTimeout(() => {
                this.speechBubble.classList.add('show');
            }, 1500); // Redus de la 3000ms la 1500ms

            setTimeout(() => {
                this.speechBubble.classList.remove('show');
            }, 12000); // Mărit de la 9000ms la 12000ms
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
                
                // Focus input after animation
                setTimeout(() => {
                    if (this.chatInput) {
                        this.chatInput.focus();
                    }
                }, 300); // Sincronizat cu durata animației
            }
        }

        closeChat() {
            this.chatWindow.classList.remove('show');
            this.enableBodyScroll();
        }

        disableBodyScroll() {
            if (this.isMobile) {
                // Pe mobile, prevenim scroll-ul în background
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
        }

        enableBodyScroll() {
            if (this.isMobile) {
                // Restabilim scroll-ul
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
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
            // Cleanup mobile styles
            document.body.classList.remove('geovi-mobile-active');
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
