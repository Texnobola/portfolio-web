import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, CheckCircle, Trash2, Eye, Search } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const AdminMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all', 'unread', 'read'
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [])

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

  const updateMessageStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, status } : msg
        )
      )
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const deleteMessage = async (id) => {
    if (!confirm('Bu xabarni o\'chirishni xohlaysizmi?')) return
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setMessages(prev => prev.filter(msg => msg.id !== id))
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || message.status === filter
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'read': return 'success'
      case 'unread': return 'warning'
      default: return 'status'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'read': return 'O\'qilgan'
      case 'unread': return 'O\'qilmagan'
      default: return status
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
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-bg via-bg to-card/20">
        <div className="container-main">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="mb-2">Xabarlar boshqaruvi</h1>
              <p className="text-muted">
                Jami {messages.length} ta xabar, {messages.filter(m => m.status === 'unread').length} ta o'qilmagan
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" onClick={fetchMessages}>
                Yangilash
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 bg-card/20 border-b border-border">
        <div className="container-main">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Filters */}
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Barchasi' },
                { key: 'unread', label: 'O\'qilmagan' },
                { key: 'read', label: 'O\'qilgan' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={filter === key ? 'primary' : 'ghost'}
                  size="small"
                  onClick={() => setFilter(key)}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Messages List */}
      <section className="section-padding">
        <div className="container-main">
          {filteredMessages.length === 0 ? (
            <Card className="text-center py-12">
              <Mail size={48} className="text-muted mx-auto mb-4" />
              <h3 className="font-heading font-semibold mb-2">Xabarlar topilmadi</h3>
              <p className="text-muted">
                {searchTerm ? 'Qidiruv bo\'yicha natija yo\'q' : 'Hozircha xabarlar yo\'q'}
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`${message.status === 'unread' ? 'border-primary/50' : ''}`}>
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Message Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-heading font-semibold text-lg">
                              {message.name}
                            </h3>
                            <p className="text-muted text-sm">{message.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(message.status)} size="small">
                              {getStatusText(message.status)}
                            </Badge>
                            <div className="flex items-center gap-1 text-muted text-sm">
                              <Clock size={14} />
                              {new Date(message.created_at).toLocaleDateString('uz-UZ')}
                            </div>
                          </div>
                        </div>

                        {message.subject && (
                          <div className="mb-3">
                            <span className="text-sm text-muted">Mavzu: </span>
                            <span className="font-medium">{message.subject}</span>
                          </div>
                        )}

                        <div className="bg-bg/50 rounded-s p-4 mb-4">
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2 lg:w-32">
                        {message.status === 'unread' ? (
                          <Button
                            variant="outline"
                            size="small"
                            onClick={() => updateMessageStatus(message.id, 'read')}
                            className="flex items-center gap-2"
                          >
                            <Eye size={14} />
                            O'qilgan
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="small"
                            onClick={() => updateMessageStatus(message.id, 'unread')}
                            className="flex items-center gap-2"
                          >
                            <Mail size={14} />
                            O'qilmagan
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => deleteMessage(message.id)}
                          className="flex items-center gap-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                          O'chirish
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminMessages