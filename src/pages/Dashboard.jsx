import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Calendar, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const Dashboard = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
    fetchMessages()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setMessages(messages.filter(msg => msg.id !== id))
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4">Admin Dashboard</h1>
            <p className="text-muted">Xabarlar va tizim boshqaruvi</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <Card>
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted text-xs sm:text-sm">Jami xabarlar</p>
                    <p className="text-xl sm:text-2xl font-bold">{messages.length}</p>
                  </div>
                  <Mail className="text-primary" size={20} />
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted text-xs sm:text-sm">O'qilmagan</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {messages.filter(msg => msg.status === 'unread').length}
                    </p>
                  </div>
                  <Badge variant="warning">Yangi</Badge>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted text-xs sm:text-sm">Foydalanuvchi</p>
                    <p className="text-sm sm:text-lg font-medium truncate">{user?.email}</p>
                  </div>
                  <User className="text-primary" size={20} />
                </div>
              </div>
            </Card>
          </div>

          {/* Messages */}
          <Card>
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-heading font-semibold mb-4 sm:mb-6">Xabarlar</h2>
              
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Mail size={48} className="text-muted mx-auto mb-4" />
                  <p className="text-muted">Hozircha xabarlar yo'q</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-border rounded-lg p-3 sm:p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{message.name}</h3>
                            <Badge 
                              variant={message.status === 'unread' ? 'warning' : 'success'}
                              size="small"
                            >
                              {message.status === 'unread' ? 'O\'qilmagan' : 'O\'qilgan'}
                            </Badge>
                          </div>
                          <p className="text-muted text-xs sm:text-sm mb-1 break-all">{message.email}</p>
                          {message.subject && (
                            <p className="text-xs sm:text-sm font-medium mb-2 break-words">{message.subject}</p>
                          )}
                          <p className="text-xs sm:text-sm break-words">{message.message}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:ml-4 shrink-0">
                          <div className="text-xs text-muted flex items-center gap-1">
                            <Calendar size={12} />
                            <span className="hidden sm:inline">{new Date(message.created_at).toLocaleDateString('uz-UZ')}</span>
                            <span className="sm:hidden">{new Date(message.created_at).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-3 border-t border-border">
                        {message.status === 'unread' && (
                          <Button
                            size="small"
                            variant="ghost"
                            onClick={() => updateStatus(message.id, 'read')}
                            className="text-xs sm:text-sm w-full sm:w-auto"
                          >
                            O'qilgan deb belgilash
                          </Button>
                        )}
                        <Button
                          size="small"
                          variant="ghost"
                          onClick={() => deleteMessage(message.id)}
                          className="text-red-400 hover:text-red-300 text-xs sm:text-sm w-full sm:w-auto"
                        >
                          <Trash2 size={12} className="mr-1" />
                          O'chirish
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Dashboard