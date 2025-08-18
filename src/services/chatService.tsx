export interface ChatResponse {
  response: string
  sessionId: string
  timestamp: Date
}

class ChatService {
  private baseUrl = 'http://localhost:8000/api' // Adjust to your backend URL
  
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      return response.ok
    } catch (error) {
      console.warn('Backend connection failed:', error)
      return false
    }
  }

  async sendMessage(message: string, sessionId: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          timestamp: new Date().toISOString()
        }),
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        response: data.response || data.message || 'Maaf, terjadi kesalahan.',
        sessionId: data.sessionId || sessionId,
        timestamp: new Date(data.timestamp || Date.now())
      }
    } catch (error) {
      console.error('Chat service error:', error)
      throw new Error('Failed to send message to backend')
    }
  }
}

export const chatService = new ChatService()