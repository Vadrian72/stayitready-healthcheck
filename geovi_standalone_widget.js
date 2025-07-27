/*!
 * Geovi Chat Widget v5.0 - Hauzen Style
 * Sidebar pe desktop + Full-screen app pe mobile
 * © 2025 Crego.ro
 */

(function() {
    'use strict';

    if (window.GeoviChatWidget) {
        return;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /(iPad|tablet)/i.test(navigator.userAgent);

    const CSS_STYLES = `
        /* RESET */
        .geovi-widget-v5, 
        .geovi-widget-v5 *,
        .geovi-widget-v5 *::before,
        .geovi-widget-v5 *::after {
            box-sizing: border-box !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        /* WIDGET CONTAINER */
        .geovi-widget-v5 {
            position: fixed !important;
            bottom: 25px !important;
            right: 25px !important;
            z-index: 999999 !important;
        }

        /* CHAT BUBBLE - Hauzen Style */
        .geovi-bubble-v5 {
            width: 64px !important;
            height: 64px !important;
            background: linear-gradient(135deg, #00ff99, #00cc7a) !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            box-shadow: 0 8px 24px rgba(0, 255, 153, 0.3) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            border: none !important;
            position: relative !important;
        }

        .geovi-bubble-v5:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 12px 32px rgba(0, 255, 153, 0.4) !important;
        }

        .geovi-bubble-v5:active {
            transform: scale(0.98) !important;
        }

        /* FIRE ICON */
        .geovi-fire-v5 {
            font-size: 28px !important;
            line-height: 1 !important;
        }

        /* PULSE ANIMATION */
        @keyframes geovi-pulse-v5 {
            0%, 100% { 
                box-shadow: 0 8px 24px rgba(0, 255, 153, 0.3);
            }
            50% { 
                box-shadow: 0 8px 32px rgba(0, 255, 153, 0.5);
            }
        }

        .geovi-bubble-v5.pulse {
            animation: geovi-pulse-v5 2s infinite !important;
        }

        /* NOTIFICATION DOT */
        .geovi-notification-v5 {
            position: absolute !important;
            top: -2px !important;
            right: -2px !important;
            width: 16px !important;
            height: 16px !important;
            background: #ff4757 !important;
            border-radius: 50% !important;
            border: 2px solid white !important;
            display: none !important;
        }

        .geovi-notification-v5.show {
            display: block !important;
            animation: geovi-bounce-v5 0.6s ease !important;
        }

        @keyframes geovi-bounce-v5 {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-4px);
            }
            60% {
                transform: translateY(-2px);
            }
        }

        /* WELCOME MESSAGE */
        .geovi-welcome-v5 {
            position: absolute !important;
            bottom: 80px !important;
            right: 0 !important;
            width: 280px !important;
            background: white !important;
            border: 1px solid #e1e5e9 !important;
            border-radius: 12px !important;
            padding: 16px !important;
            font-size: 14px !important;
            color: #2c3e50 !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
            opacity: 0 !important;
            transform: translateY(10px) scale(0.95) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            z-index: 1000000 !important;
        }

        .geovi-welcome-v5.show {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
        }

        .geovi-welcome-v5::after {
            content: '' !important;
            position: absolute !important;
            bottom: -8px !important;
            right: 24px !important;
            width: 0 !important;
            height: 0 !important;
            border-left: 8px solid transparent !important;
            border-right: 8px solid transparent !important;
            border-top: 8px solid white !important;
        }

        /* MOBILE STYLES - Full Screen App (DEFAULT) */
        .geovi-chat-v5 {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: #f8f9fa !important;
            z-index: 1000001 !important;
            display: none !important;
            flex-direction: column !important;
            transform: translateX(100%) !important;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            /* Prevent zoom and scroll */
            touch-action: manipulation !important;
            -webkit-user-select: none !important;
            user-select: none !important;
        }

        .geovi-chat-v5.open {
            display: flex !important;
            transform: translateX(0) !important;
        }

        /* HEADER - Mobile App Style */
        .geovi-header-v5 {
            background: white !important;
            padding: 16px 20px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            flex-shrink: 0 !important;
            border-bottom: 1px solid #e1e5e9 !important;
            /* Safe area for notch */
            padding-top: max(16px, env(safe-area-inset-top)) !important;
        }

        .geovi-avatar-v5 {
            width: 40px !important;
            height: 40px !important;
            background: linear-gradient(135deg, #00ff99, #00cc7a) !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 18px !important;
            margin-right: 12px !important;
        }

        .geovi-header-info-v5 {
            flex: 1 !important;
            display: flex !important;
            align-items: center !important;
        }

        .geovi-title-v5 {
            font-size: 18px !important;
            font-weight: 600 !important;
            color: #2c3e50 !important;
            margin: 0 !important;
            line-height: 1.2 !important;
        }

        .geovi-status-v5 {
            font-size: 13px !important;
            color: #7f8c8d !important;
            margin-top: 2px !important;
        }

        .geovi-close-v5 {
            width: 40px !important;
            height: 40px !important;
            border: none !important;
            border-radius: 50% !important;
            background: #f1f3f4 !important;
            font-size: 18px !important;
            color: #5f6368 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s ease !important;
        }

        .geovi-close-v5:active {
            background: #e8eaed !important;
            transform: scale(0.95) !important;
        }

        /* MESSAGES AREA - Hauzen Style */
        .geovi-messages-v5 {
            flex: 1 !important;
            padding: 16px !important;
            overflow-y: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            -webkit-overflow-scrolling: touch !important;
            scroll-behavior: smooth !important;
        }

        /* MESSAGE BUBBLES - Hauzen Style */
        .geovi-msg-v5 {
            max-width: 85% !important;
            padding: 12px 16px !important;
            border-radius: 16px !important;
            font-size: 15px !important;
            line-height: 1.4 !important;
            word-wrap: break-word !important;
            display: block !important;
            position: relative !important;
        }

        .geovi-msg-v5.bot {
            background: white !important;
            color: #2c3e50 !important;
            align-self: flex-start !important;
            border-bottom-left-radius: 4px !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
            border: 1px solid #e1e5e9 !important;
        }

        .geovi-msg-v5.user {
            background: linear-gradient(135deg, #00ff99, #00cc7a) !important;
            color: #2c3e50 !important;
            align-self: flex-end !important;
            border-bottom-right-radius: 4px !important;
            font-weight: 500 !important;
        }

        /* INPUT AREA - Fixed Bottom */
        .geovi-input-v5 {
            padding: 16px 20px !important;
            background: white !important;
            border-top: 1px solid #e1e5e9 !important;
            display: flex !important;
            gap: 12px !important;
            align-items: flex-end !important;
            flex-shrink: 0 !important;
            position: relative !important;
            /* Safe area for home indicator */
            padding-bottom: max(16px, env(safe-area-inset-bottom)) !important;
        }

        .geovi-input-v5.keyboard-open {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1000002 !important;
        }

        .geovi-field-v5 {
            flex: 1 !important;
            min-height: 44px !important;
            max-height: 120px !important;
            padding: 12px 16px !important;
            border: 1px solid #e1e5e9 !important;
            border-radius: 22px !important;
            font-size: 16px !important;
            outline: none !important;
            background: #f8f9fa !important;
            color: #2c3e50 !important;
            resize: none !important;
            font-family: inherit !important;
            /* Prevent zoom on iOS */
            -webkit-appearance: none !important;
            appearance: none !important;
        }

        .geovi-field-v5:focus {
            border-color: #00ff99 !important;
            background: white !important;
        }

        .geovi-field-v5::placeholder {
            color: #95a5a6 !important;
        }

        .geovi-send-v5 {
            width: 44px !important;
            height: 44px !important;
            background: linear-gradient(135deg, #00ff99, #00cc7a) !important;
            border: none !important;
            border-radius: 50% !important;
            font-size: 18px !important;
            color: #2c3e50 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s ease !important;
            flex-shrink: 0 !important;
        }

        .geovi-send-v5:active {
            transform: scale(0.95) !important;
        }

        .geovi-send-v5:disabled {
            opacity: 0.5 !important;
            cursor: not-allowed !important;
        }

        /* LOADING ANIMATION */
        .geovi-loading-v5 {
            display: flex !important;
            gap: 6px !important;
            padding: 12px 16px !important;
            justify-content: flex-start !important;
        }

        .geovi-dot-v5 {
            width: 8px !important;
            height: 8px !important;
            background: #bdc3c7 !important;
            border-radius: 50% !important;
            animation: geovi-loading-v5 1.4s infinite ease-in-out !important;
        }

        .geovi-dot-v5:nth-child(1) { animation-delay: -0.32s !important; }
        .geovi-dot-v5:nth-child(2) { animation-delay: -0.16s !important; }
        .geovi-dot-v5:nth-child(3) { animation-delay: 0s !important; }

        @keyframes geovi-loading-v5 {
            0%, 80%, 100% { 
                transform: scale(0.6) !important; 
                opacity: 0.4 !important;
            }
            40% { 
                transform: scale(1) !important; 
                opacity: 1 !important;
            }
        }

        /* DESKTOP STYLES - Right Sidebar (DOAR PE DESKTOP MARE) */
        @media (min-width: 1024px) {
            .geovi-chat-v5 {
                position: fixed !important;
                top: 0 !important;
                right: 0 !important;
                left: auto !important;
                bottom: 0 !important;
                width: 400px !important;
                height: 100vh !important;
                transform: translateX(100%) !important;
                box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12) !important;
                border-left: 1px solid #e1e5e9 !important;
                touch-action: auto !important;
                -webkit-user-select: text !important;
                user-select: text !important;
            }

            .geovi-chat-v5.open {
                transform: translateX(0) !important;
            }

            .geovi-header-v5 {
                padding-top: 20px !important;
                padding-bottom: 20px !important;
            }

            .geovi-messages-v5 {
                padding: 20px !important;
            }

            .geovi-input-v5 {
                padding: 20px !important;
                padding-bottom: 20px !important;
            }

            .geovi-input-v5.keyboard-open {
                position: relative !important;
                bottom: auto !important;
            }

            .geovi-msg-v5 {
                max-width: 90% !important;
                font-size: 14px !important;
            }

            .geovi-welcome-v5 {
                width: 320px !important;
                right: 420px !important;
                bottom: 100px !important;
            }

            .geovi-welcome-v5::after {
                bottom: 15px !important;
                right: -6px !important;
                left: auto !important;
                border-top: 6px solid transparent !important;
                border-bottom: 6px solid transparent !important;
                border-left: 6px solid white !important;
                border-right: none !important;
            }
        }

        /* PREVENT BODY SCROLL WHEN CHAT IS OPEN - DOAR PE MOBILE */
        body.geovi-chat-open-v5 {
            overflow: hidden !important;
            height: 100vh !important;
            position: fixed !important;
            width: 100% !important;
        }

        /* DESKTOP: Don't prevent body scroll */
        @media (min-width: 1024px) {
            body.geovi-chat-open-v5 {
                overflow: auto !important;
                height: auto !important;
                position: static !important;
                width: auto !important;
            }
        }

        /* ACCESSIBILITY */
        .geovi-widget-v5 *:focus {
            outline: 2px solid #00ff99 !important;
            outline-offset: 2px !important;
        }

        /* SMOOTH SCROLLING */
        .geovi-messages-v5 {
            scroll-behavior: smooth !important;
        }
    `;

    const WIDGET_HTML = `
        <div class="geovi-welcome-v5" id="geovi-welcome">
            Salut! Sunt Geovi și te ajut cu încălzirea! 🔥
        </div>
        
        <button class="geovi-bubble-v5 pulse" id="geovi-bubble" aria-label="Deschide chat cu Geovi">
            <div class="geovi-notification-v5" id="geovi-notification"></div>
            <span class="geovi-fire-v5">🔥</span>
        </button>

        <div class="geovi-chat-v5" id="geovi-chat" role="dialog" aria-labelledby="geovi-title">
            <div class="geovi-header-v5">
                <div class="geovi-header-info-v5">
                    <div class="geovi-avatar-v5">🔥</div>
                    <div>
                        <h3 class="geovi-title-v5" id="geovi-title">Geovi</h3>
                        <div class="geovi-status-v5">Asistent AI pentru încălzire</div>
                    </div>
                </div>
                <button class="geovi-close-v5" id="geovi-close" aria-label="Închide chat">&times;</button>
            </div>
            
            <div class="geovi-messages-v5" id="geovi-messages" role="log" aria-live="polite">
                <div class="geovi-msg-v5 bot">
                    Salut! Sunt Geovi, asistentul tău AI pentru încălzire! 🔥<br><br>
                    Te pot ajuta cu:<br>
                    • Radiatoare și calorifere<br>
                    • Cazane și centrale termice<br>
                    • Sisteme de încălzire<br>
                    • Sfaturi tehnice și economisire<br>
                    • Configurări personalizate<br><br>
                    Cu ce te pot ajuta astăzi?
                </div>
            </div>
            
            <div class="geovi-input-v5" id="geovi-input">
                <textarea 
                    class="geovi-field-v5" 
                    id="geovi-field" 
                    placeholder="Scrie mesajul tău aici..." 
                    rows="1"
                    aria-label="Mesajul tău"
                ></textarea>
                <button class="geovi-send-v5" id="geovi-send" aria-label="Trimite mesaj">➤</button>
            </div>
        </div>
    `;

    class GeoviChatWidget {
        constructor(options = {}) {
            this.options = {
                webhook: options.webhook || '',
                greeting: options.greeting || 'Salut! Sunt Geovi și te ajut cu încălzirea! 🔥',
                ...options
            };

            this.isConnected = false;
            this.sessionId = this.generateSessionId();
            this.keyboardOpen = false;
            this.originalViewportHeight = window.innerHeight;
            
            this.init();
        }

        init() {
            this.cleanup();
            this.injectCSS();
            this.createContainer();
            this.bindEvents();
            this.setupKeyboardHandling();
            this.showGreeting();

            if (this.options.webhook) {
                this.connect(this.options.webhook);
            }

            console.log('🔥 Geovi Chat Widget v5.0 - Hauzen Style!');
        }

        cleanup() {
            const oldContainer = document.getElementById('geovi-widget-v5');
            if (oldContainer) oldContainer.remove();
            
            const oldStyles = document.getElementById('geovi-styles-v5');
            if (oldStyles) oldStyles.remove();

            document.body.classList.remove('geovi-chat-open-v5');
        }

        injectCSS() {
            const style = document.createElement('style');
            style.id = 'geovi-styles-v5';
            style.textContent = CSS_STYLES;
            document.head.appendChild(style);
        }

        createContainer() {
            this.container = document.createElement('div');
            this.container.id = 'geovi-widget-v5';
            this.container.className = 'geovi-widget-v5';
            this.container.innerHTML = WIDGET_HTML;

            document.body.appendChild(this.container);

            // Get elements
            this.bubble = document.getElementById('geovi-bubble');
            this.welcome = document.getElementById('geovi-welcome');
            this.chat = document.getElementById('geovi-chat');
            this.messages = document.getElementById('geovi-messages');
            this.field = document.getElementById('geovi-field');
            this.send = document.getElementById('geovi-send');
            this.close = document.getElementById('geovi-close');
            this.inputArea = document.getElementById('geovi-input');
            this.notification = document.getElementById('geovi-notification');
        }

        bindEvents() {
            this.bubble.addEventListener('click', () => this.toggleChat());
            this.close.addEventListener('click', () => this.closeChat());
            this.send.addEventListener('click', () => this.sendMessage());
            
            this.field.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            this.field.addEventListener('input', () => this.autoResize());

            // Hide welcome when clicking elsewhere
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.geovi-widget-v5')) {
                    this.hideWelcome();
                }
            });

            // ESC key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.chat.classList.contains('open')) {
                    this.closeChat();
                }
            });
        }

        setupKeyboardHandling() {
            if (!isMobile) return;

            let initialHeight = window.innerHeight;
            
            const handleResize = () => {
                const currentHeight = window.innerHeight;
                const heightDiff = initialHeight - currentHeight;
                
                if (heightDiff > 150) {
                    // Keyboard open
                    this.keyboardOpen = true;
                    this.inputArea.classList.add('keyboard-open');
                    this.adjustForKeyboard(true);
                } else {
                    // Keyboard closed
                    this.keyboardOpen = false;
                    this.inputArea.classList.remove('keyboard-open');
                    this.adjustForKeyboard(false);
                }
            };

            window.addEventListener('resize', handleResize);

            // iOS Visual Viewport API support
            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', () => {
                    const keyboardHeight = window.innerHeight - window.visualViewport.height;
                    if (keyboardHeight > 0 && this.chat.classList.contains('open')) {
                        this.inputArea.style.transform = `translateY(-${keyboardHeight}px)`;
                    } else {
                        this.inputArea.style.transform = '';
                    }
                });
            }

            // Focus handling
            this.field.addEventListener('focus', () => {
                setTimeout(() => {
                    this.scrollToBottom();
                }, 300);
            });
        }

        adjustForKeyboard(isOpen) {
            if (isOpen) {
                this.messages.style.paddingBottom = '100px';
                setTimeout(() => this.scrollToBottom(), 100);
            } else {
                // Resetează padding în funcție de dimensiunea ecranului
                this.messages.style.paddingBottom = window.innerWidth >= 1024 ? '20px' : '16px';
            }
        }

        autoResize() {
            this.field.style.height = 'auto';
            const scrollHeight = this.field.scrollHeight;
            const maxHeight = 120;
            this.field.style.height = Math.min(scrollHeight, maxHeight) + 'px';
        }

        showGreeting() {
            setTimeout(() => {
                this.welcome.classList.add('show');
                this.notification.classList.add('show');
            }, 2000);

            setTimeout(() => {
                this.hideWelcome();
            }, 8000);
        }

        hideWelcome() {
            this.welcome.classList.remove('show');
        }

        toggleChat() {
            this.hideWelcome();
            this.bubble.classList.remove('pulse');
            this.notification.classList.remove('show');
            
            const isOpen = this.chat.classList.contains('open');
            if (isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        openChat() {
            this.chat.classList.add('open');
            
            // Pe mobile (sub 1024px) blochează scroll-ul body
            if (window.innerWidth < 1024) {
                document.body.classList.add('geovi-chat-open-v5');
            }

            setTimeout(() => {
                this.field.focus();
                this.scrollToBottom();
            }, 400);
        }

        closeChat() {
            this.chat.classList.remove('open');
            document.body.classList.remove('geovi-chat-open-v5');
            
            // Reset keyboard handling
            this.inputArea.classList.remove('keyboard-open');
            this.inputArea.style.transform = '';
            this.messages.style.paddingBottom = window.innerWidth >= 1024 ? '20px' : '16px';
        }

        scrollToBottom() {
            setTimeout(() => {
                this.messages.scrollTop = this.messages.scrollHeight;
            }, 50);
        }

        connect(webhookUrl) {
            this.options.webhook = webhookUrl;
            this.isConnected = true;
            console.log('🔥 Geovi connected to n8n chat:', webhookUrl);
        }

        async sendMessage() {
            const message = this.field.value.trim();
            if (!message) return;

            // Add user message
            this.addMessage(message, 'user');
            this.field.value = '';
            this.autoResize();
            this.send.disabled = true;

            // Show loading
            const loadingElement = this.showLoading();

            try {
                if (this.options.webhook) {
                    // N8N Chat Agent format - EXACT CA ÎNAINTE
                    const payload = {
                        action: 'sendMessage',
                        sessionId: this.sessionId,
                        chatInput: message
                    };

                    console.log('🚀 Sending to n8n:', payload);

                    const response = await fetch(this.options.webhook, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload)
                    });

                    console.log('📡 Response status:', response.status);

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log('📥 n8n Response:', data);
                    
                    loadingElement.remove();
                    
                    // Handle n8n chat response format - EXACT CA ÎNAINTE
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
                    
                } else {
                    // Demo response dacă nu e webhook
                    setTimeout(() => {
                        loadingElement.remove();
                        this.addMessage('Sistemul nu este conectat la AI încă. Te rog configurează webhook-ul.', 'bot');
                    }, 1000);
                }
                
            } catch (error) {
                console.error('❌ Geovi n8n error:', error);
                loadingElement.remove();
                this.addMessage('Îmi pare rău, am o problemă de conexiune cu sistemul AI. Te rog încearcă din nou.', 'bot');
            }

            this.send.disabled = false;
            this.field.focus();
        }

        addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `geovi-msg-v5 ${sender}`;
            
            if (message.includes('<br>') || message.includes('<')) {
                messageElement.innerHTML = message;
            } else {
                messageElement.textContent = message;
            }
            
            this.messages.appendChild(messageElement);
            this.scrollToBottom();
        }

        showLoading() {
            const loadingElement = document.createElement('div');
            loadingElement.className = 'geovi-msg-v5 bot';
            loadingElement.innerHTML = `
                <div class="geovi-loading-v5">
                    <div class="geovi-dot-v5"></div>
                    <div class="geovi-dot-v5"></div>
                    <div class="geovi-dot-v5"></div>
                </div>
            `;
            
            this.messages.appendChild(loadingElement);
            this.scrollToBottom();
            
            return loadingElement;
        }

        generateSessionId() {
            return 'geovi-hauzen-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }

        // Public API methods
        destroy() {
            this.cleanup();
        }

        setWebhook(url) {
            this.connect(url);
        }

        showNotification() {
            this.notification.classList.add('show');
        }

        hideNotification() {
            this.notification.classList.remove('show');
        }
    }

    // Global API
    window.GeoviChatWidget = GeoviChatWidget;
    
    window.Geovi = {
        init: function(options) {
            if (typeof options === 'string') {
                options = { webhook: options };
            }
            return new GeoviChatWidget(options);
        }
    };

    // Auto-init on DOM ready if data attributes exist
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.querySelector('script[data-geovi-webhook]');
        if (script) {
            const webhook = script.getAttribute('data-geovi-webhook');
            window.Geovi.init({ webhook: webhook });
        }
    });

})();
