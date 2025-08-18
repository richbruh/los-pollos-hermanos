import { useState, useEffect, useRef } from 'react'
import type { Message } from '../Models/Message'
import { chatService } from '../services/chatService'


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId] = useState(() => 'session_' + Date.now())
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🍗 Halo! Selamat datang di Los Pollos Hermanos! \n\nSaya adalah AI Assistant yang bisa membantu Anda dengan:\n• Informasi menu dan harga lengkap\n• Deskripsi makanan detail\n• Rekomendasi menu personal\n• Jam buka & lokasi\n• Pertanyaan lainnya tentang restaurant\n\nAda yang bisa saya bantu hari ini?',
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check backend connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await chatService.checkConnection()
      setIsOnline(connected)
    }
    checkConnection()
  }, [])

  // Fallback responses untuk offline mode
  const getFallbackResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('menu') || input.includes('makanan')) {
      return `🍗 **Menu Unggulan Los Pollos Hermanos:**
      
**AYAM CRISPY:**
• Original Crispy Chicken - Rp 45.000
• Spicy Wings (6pcs) - Rp 35.000  
• Chicken Sandwich - Rp 28.000

**PAKET KELUARGA:**
• Family Bucket (8pcs) - Rp 120.000

⚠️ *Mode offline - Untuk info lebih detail, coba lagi nanti ya!*`
    }

    if (input.includes('harga')) {
      return 'Harga menu berkisar Rp 28.000 - Rp 120.000. Untuk detail lengkap, tunggu koneksi kembali normal ya! 😊'
    }

    return `⚠️ **Mode Offline**

Maaf, saat ini AI assistant sedang offline. Anda bisa:

📞 **Hubungi langsung:** (505) 555-0123
🕒 **Jam buka:** 10.00-22.00 (Sen-Kam)
📍 **Alamat:** Jl. Chicken Street No. 123

Coba lagi dalam beberapa menit untuk fitur AI lengkap!`
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputText
    setInputText('')
    setIsLoading(true)

    try {
      let botResponseText: string

      if (isOnline) {
        // Use RAG AI Backend
        const response = await chatService.sendMessage(currentInput, sessionId)
        botResponseText = response.response
      } else {
        // Fallback response
        await new Promise(resolve => setTimeout(resolve, 800)) // Simulate delay
        botResponseText = getFallbackResponse(currentInput)
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date(),
        type: isOnline ? 'text' : 'error'
      }

      setMessages(prev => [...prev, botMessage])
      
    } catch (error) {
      console.error('Send message error:', error)
      
      // Switch to offline mode
      setIsOnline(false)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '⚠️ Koneksi terputus, beralih ke mode offline.\n\n' + getFallbackResponse(currentInput),
        isUser: false,
        timestamp: new Date(),
        type: 'error'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Quick reply buttons yang cocok untuk RAG
  const quickReplies = [
    "Rekomendasi menu untuk 4 orang",
    "Menu ayam tidak pedas apa saja?", 
    "Berapa harga family bucket?",
    "Jam buka hari minggu"
  ]

  const handleQuickReply = (reply: string) => {
    setInputText(reply)
  }

  // Retry connection
  const retryConnection = async () => {
    setIsLoading(true)
    const connected = await chatService.checkConnection()
    setIsOnline(connected)
    setIsLoading(false)
    
    if (connected) {
      const reconnectMessage: Message = {
        id: Date.now().toString(),
        text: '✅ Koneksi berhasil! AI Assistant sudah siap membantu Anda dengan informasi lengkap.',
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, reconnectMessage])
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isOpen ? 'bg-red-600 rotate-45' : 'bg-red-600 hover:bg-red-700'
        }`}
        aria-label={isOpen ? 'Tutup chat' : 'Buka chat'}
      >
        <span className="text-white text-2xl">
          {isOpen ? '✕' : '🤖'}
        </span>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[500px] bg-white rounded-lg shadow-2xl border-2 border-red-200 flex flex-col z-40">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Los Pollos Hermanos</h3>
                <p className="text-sm text-red-200">AI Assistant 🤖</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span className="text-xs text-red-200">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Connection Status Banner */}
          {!isOnline && (
            <div className="bg-yellow-100 border-b border-yellow-200 p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-800">⚠️ Mode Offline</span>
                <button 
                  onClick={retryConnection}
                  disabled={isLoading}
                  className="text-xs text-yellow-600 hover:text-yellow-800 underline disabled:opacity-50"
                >
                  {isLoading ? 'Connecting...' : 'Retry'}
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg whitespace-pre-line ${
                    message.isUser
                      ? 'bg-red-600 text-white'
                      : message.type === 'error' 
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('id-ID', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Contoh pertanyaan:</p>
              <div className="flex flex-wrap gap-1">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isOnline ? "Tanya apapun tentang menu kami..." : "Mode offline - fitur terbatas"}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputText.trim()}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Kirim pesan"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot