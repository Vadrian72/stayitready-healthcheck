import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:io';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Geovi Chat Flutter',
      theme: ThemeData(
        primarySwatch: Colors.green,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: ChatScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  final ScrollController _scrollController = ScrollController();
  
  // N8N Configuration - EXACT CA ÎN JAVASCRIPT
  final String webhookUrl = 'https://73fc8f0beddf.ngrok-free.app/webhook/268d2104-8c70-48e3-b421-29a032c97e0d/chat';
  late String sessionId;
  bool isLoading = false;
  
  List<ChatMessage> messages = [
    ChatMessage(
      text: "Salut! Sunt Geovi, asistentul tău AI pentru încălzire! 🔥\n\n"
            "Te pot ajuta cu:\n"
            "• Radiatoare și calorifere\n"
            "• Cazane și centrale termice\n"
            "• Sisteme de încălzire\n"
            "• Sfaturi tehnice și economisire\n"
            "• Configurări personalizate\n\n"
            "Cu ce te pot ajuta astăzi?",
      isUser: false,
    ),
  ];

  @override
  void initState() {
    super.initState();
    // Generate session ID - EXACT CA ÎN JAVASCRIPT
    sessionId = 'geovi-flutter-${DateTime.now().millisecondsSinceEpoch}-${_generateRandomString(9)}';
    print('🔥 Geovi Flutter connected to n8n: $webhookUrl');
    print('📱 Session ID: $sessionId');
  }

  String _generateRandomString(int length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return String.fromCharCodes(Iterable.generate(
      length, (_) => chars.codeUnitAt((DateTime.now().millisecondsSinceEpoch % chars.length))
    ));
  }

  @override
  void dispose() {
    _textController.dispose();
    _focusNode.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  // N8N API CALL - EXACT CA ÎN JAVASCRIPT
  Future<String> _sendToN8N(String message) async {
    try {
      // N8N Chat Agent format - IDENTIC CU JAVASCRIPT
      final payload = {
        'action': 'sendMessage',
        'sessionId': sessionId,
        'chatInput': message,
      };

      print('🚀 Sending to n8n: $payload');

      final client = HttpClient();
      client.badCertificateCallback = (cert, host, port) => true; // Pentru dezvoltare
      
      final request = await client.postUrl(Uri.parse(webhookUrl));
      request.headers.set('Content-Type', 'application/json');
      request.add(utf8.encode(jsonEncode(payload)));
      
      final response = await request.close();
      
      print('📡 Response status: ${response.statusCode}');
      
      if (response.statusCode == 200) {
        final responseBody = await response.transform(utf8.decoder).join();
        final data = jsonDecode(responseBody);
        
        print('📥 n8n Response: $data');
        
        // Handle n8n chat response format - EXACT CA ÎN JAVASCRIPT
        String botMessage = '';
        
        if (data['output'] != null) {
          botMessage = data['output'].toString();
        } else if (data['response'] != null) {
          botMessage = data['response'].toString();
        } else if (data['message'] != null) {
          botMessage = data['message'].toString(); 
        } else if (data is String) {
          botMessage = data;
        } else {
          botMessage = 'Am primit răspunsul, dar nu îl pot afișa corect.';
        }
        
        return botMessage;
        
      } else {
        throw Exception('HTTP ${response.statusCode}');
      }
      
    } catch (error) {
      print('❌ Geovi n8n error: $error');
      return 'Îmi pare rău, am o problemă de conexiune cu sistemul AI. Te rog încearcă din nou.';
    }
  }

  void _sendMessage() async {
    if (_textController.text.trim().isEmpty || isLoading) return;

    String userMessage = _textController.text.trim();
    _textController.clear();

    setState(() {
      // Add user message
      messages.add(ChatMessage(
        text: userMessage,
        isUser: true,
      ));
      
      // Add loading message
      messages.add(ChatMessage(
        text: "Se încarcă...",
        isUser: false,
        isLoading: true,
      ));
      
      isLoading = true;
    });

    // Scroll to bottom after adding messages
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });

    // Send to n8n AI - EXACT CA ÎN JAVASCRIPT
    String aiResponse = await _sendToN8N(userMessage);

    setState(() {
      // Remove loading message
      messages.removeLast();
      
      // Add AI response
      messages.add(ChatMessage(
        text: aiResponse,
        isUser: false,
      ));
      
      isLoading = false;
    });

    // Scroll to bottom after AI response
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // CRUCIAL: Permite redimensionarea când apare tastatura
      resizeToAvoidBottomInset: true,
      backgroundColor: Color(0xFFF8F9FA),
      body: SafeArea(
        child: Container(
          // Ocupa 90% din înălțimea disponibilă
          height: MediaQuery.of(context).size.height * 0.9,
          margin: EdgeInsets.symmetric(
            vertical: MediaQuery.of(context).size.height * 0.05,
            horizontal: 16,
          ),
          child: Column(
            children: [
              // HEADER
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF00FF99), Color(0xFF00CC7A)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(16),
                    topRight: Radius.circular(16),
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Center(
                        child: Text('🔥', style: TextStyle(fontSize: 20)),
                      ),
                    ),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Geovi',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            'Asistent AI pentru încălzire • Connected to n8n',
                            style: TextStyle(
                              fontSize: 13,
                              color: Colors.white.withOpacity(0.9),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // MESSAGES AREA - Expandable și scrollable
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(16),
                      bottomRight: Radius.circular(16),
                    ),
                  ),
                  child: Column(
                    children: [
                      // Messages List
                      Expanded(
                        child: SingleChildScrollView(
                          controller: _scrollController,
                          padding: EdgeInsets.all(16),
                          child: Column(
                            children: messages.map((message) {
                              return ChatBubble(message: message);
                            }).toList(),
                          ),
                        ),
                      ),

                      // INPUT AREA - Mereu în partea de jos
                      Container(
                        padding: EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.grey[50],
                          border: Border(
                            top: BorderSide(color: Colors.grey[200]!),
                          ),
                        ),
                        child: Row(
                          children: [
                            // Text Field
                            Expanded(
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(22),
                                  border: Border.all(color: Colors.grey[300]!),
                                ),
                                child: TextField(
                                  controller: _textController,
                                  focusNode: _focusNode,
                                  maxLines: null,
                                  textInputAction: TextInputAction.send,
                                  onSubmitted: (_) => _sendMessage(),
                                  enabled: !isLoading,
                                  decoration: InputDecoration(
                                    hintText: isLoading 
                                        ? 'Se trimite...' 
                                        : 'Scrie mesajul tău aici...',
                                    hintStyle: TextStyle(color: Colors.grey[500]),
                                    border: InputBorder.none,
                                    contentPadding: EdgeInsets.symmetric(
                                      horizontal: 16,
                                      vertical: 12,
                                    ),
                                  ),
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Color(0xFF2C3E50),
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 12),
                            // Send Button
                            GestureDetector(
                              onTap: isLoading ? null : _sendMessage,
                              child: Container(
                                width: 44,
                                height: 44,
                                decoration: BoxDecoration(
                                  gradient: isLoading
                                      ? null
                                      : LinearGradient(
                                          colors: [Color(0xFF00FF99), Color(0xFF00CC7A)],
                                          begin: Alignment.topLeft,
                                          end: Alignment.bottomRight,
                                        ),
                                  color: isLoading ? Colors.grey[300] : null,
                                  borderRadius: BorderRadius.circular(22),
                                ),
                                child: Center(
                                  child: isLoading
                                      ? SizedBox(
                                          width: 20,
                                          height: 20,
                                          child: CircularProgressIndicator(
                                            strokeWidth: 2,
                                            valueColor: AlwaysStoppedAnimation<Color>(
                                              Colors.grey[600]!,
                                            ),
                                          ),
                                        )
                                      : Icon(
                                          Icons.send,
                                          color: Color(0xFF2C3E50),
                                          size: 20,
                                        ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ChatMessage {
  final String text;
  final bool isUser;
  final bool isLoading;
  
  ChatMessage({
    required this.text, 
    required this.isUser, 
    this.isLoading = false
  });
}

class ChatBubble extends StatelessWidget {
  final ChatMessage message;
  
  const ChatBubble({Key? key, required this.message}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment: message.isUser 
            ? MainAxisAlignment.end 
            : MainAxisAlignment.start,
        children: [
          Flexible(
            child: Container(
              constraints: BoxConstraints(
                maxWidth: MediaQuery.of(context).size.width * 0.8,
              ),
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: message.isUser 
                    ? Color(0xFF00FF99)
                    : Colors.white,
                borderRadius: BorderRadius.circular(16).copyWith(
                  bottomLeft: message.isUser 
                      ? Radius.circular(16) 
                      : Radius.circular(4),
                  bottomRight: message.isUser 
                      ? Radius.circular(4) 
                      : Radius.circular(16),
                ),
                border: message.isUser 
                    ? null 
                    : Border.all(color: Colors.grey[200]!),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 8,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: message.isLoading
                  ? Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              Color(0xFF00FF99),
                            ),
                          ),
                        ),
                        SizedBox(width: 8),
                        Text(
                          message.text,
                          style: TextStyle(
                            fontSize: 15,
                            color: Color(0xFF2C3E50),
                            height: 1.4,
                          ),
                        ),
                      ],
                    )
                  : Text(
                      message.text,
                      style: TextStyle(
                        fontSize: 15,
                        color: Color(0xFF2C3E50),
                        height: 1.4,
                      ),
                    ),
            ),
          ),
        ],
      ),
    );
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // CRUCIAL: Permite redimensionarea când apare tastatura
      resizeToAvoidBottomInset: true,
      backgroundColor: Color(0xFFF8F9FA),
      body: SafeArea(
        child: Container(
          // Ocupa 90% din înălțimea disponibilă
          height: MediaQuery.of(context).size.height * 0.9,
          margin: EdgeInsets.symmetric(
            vertical: MediaQuery.of(context).size.height * 0.05,
            horizontal: 16,
          ),
          child: Column(
            children: [
              // HEADER
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF00FF99), Color(0xFF00CC7A)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(16),
                    topRight: Radius.circular(16),
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Center(
                        child: Text('🔥', style: TextStyle(fontSize: 20)),
                      ),
                    ),
                    SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Geovi',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            'Asistent AI pentru încălzire',
                            style: TextStyle(
                              fontSize: 13,
                              color: Colors.white.withOpacity(0.9),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // MESSAGES AREA - Expandable și scrollable
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(16),
                      bottomRight: Radius.circular(16),
                    ),
                  ),
                  child: Column(
                    children: [
                      // Messages List
                      Expanded(
                        child: SingleChildScrollView(
                          controller: _scrollController,
                          padding: EdgeInsets.all(16),
                          child: Column(
                            children: messages.map((message) {
                              return ChatBubble(message: message);
                            }).toList(),
                          ),
                        ),
                      ),

                      // INPUT AREA - Mereu în partea de jos
                      Container(
                        padding: EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.grey[50],
                          border: Border(
                            top: BorderSide(color: Colors.grey[200]!),
                          ),
                        ),
                        child: Row(
                          children: [
                            // Text Field
                            Expanded(
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(22),
                                  border: Border.all(color: Colors.grey[300]!),
                                ),
                                child: TextField(
                                  controller: _textController,
                                  focusNode: _focusNode,
                                  maxLines: null,
                                  textInputAction: TextInputAction.send,
                                  onSubmitted: (_) => _sendMessage(),
                                  decoration: InputDecoration(
                                    hintText: 'Scrie mesajul tău aici...',
                                    hintStyle: TextStyle(color: Colors.grey[500]),
                                    border: InputBorder.none,
                                    contentPadding: EdgeInsets.symmetric(
                                      horizontal: 16,
                                      vertical: 12,
                                    ),
                                  ),
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Color(0xFF2C3E50),
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 12),
                            // Send Button
                            GestureDetector(
                              onTap: _sendMessage,
                              child: Container(
                                width: 44,
                                height: 44,
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    colors: [Color(0xFF00FF99), Color(0xFF00CC7A)],
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                  ),
                                  borderRadius: BorderRadius.circular(22),
                                ),
                                child: Center(
                                  child: Icon(
                                    Icons.send,
                                    color: Color(0xFF2C3E50),
                                    size: 20,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ChatMessage {
  final String text;
  final bool isUser;
  
  ChatMessage({required this.text, required this.isUser});
}

class ChatBubble extends StatelessWidget {
  final ChatMessage message;
  
  const ChatBubble({Key? key, required this.message}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment: message.isUser 
            ? MainAxisAlignment.end 
            : MainAxisAlignment.start,
        children: [
          Flexible(
            child: Container(
              constraints: BoxConstraints(
                maxWidth: MediaQuery.of(context).size.width * 0.8,
              ),
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: message.isUser 
                    ? LinearGradient(
                        colors: [Color(0xFF00FF99), Color(0xFF00CC7A)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ).createShader(Rect.fromLTWH(0, 0, 200, 70)).toString() != null
                      ? Color(0xFF00FF99)
                      : Color(0xFF00FF99)
                    : Colors.white,
                borderRadius: BorderRadius.circular(16).copyWith(
                  bottomLeft: message.isUser 
                      ? Radius.circular(16) 
                      : Radius.circular(4),
                  bottomRight: message.isUser 
                      ? Radius.circular(4) 
                      : Radius.circular(16),
                ),
                border: message.isUser 
                    ? null 
                    : Border.all(color: Colors.grey[200]!),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 8,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: Text(
                message.text,
                style: TextStyle(
                  fontSize: 15,
                  color: message.isUser 
                      ? Color(0xFF2C3E50)
                      : Color(0xFF2C3E50),
                  height: 1.4,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
