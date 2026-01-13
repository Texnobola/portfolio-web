import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ism maydonini to\'ldirish kerak'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email maydonini to\'ldirish kerak'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Yaroqli email manzilini kiriting'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Xabar maydonini to\'ldirish kerak'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setStatus(null)
    
    try {
      // Send email notification via EmailJS
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_8mks8vo',
          template_id: 'template_zrdyckm', 
          user_id: 'r8EsTfcwMUiumB6Yx',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'Portfolio Contact',
            message: formData.message,
            to_email: 'pixeluzpro@gmail.com'
          }
        })
      })
      
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-bg via-bg to-card/20">
        <div className="container-main">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4">Aloqa</h1>
            <p className="text-muted">
              Loyiha g'oyangiz bormi? Keling, uni birga muhokama qilaylik. 
              Professional yechimlar va sifatli natija kafolatlanadi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid-12 gap-8">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <h2 className="mb-6">Xabar yuborish</h2>
                
                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-s flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle size={20} className="text-primary" />
                    <span className="text-primary">Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.</span>
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div 
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-s flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-red-400">Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Ism *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input w-full ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        placeholder="Ismingizni kiriting"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input w-full ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Mavzu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Xabar mavzusi"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Xabar *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`input w-full resize-none ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="Loyihangiz haqida batafsil yozing..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={loading}
                    loading={loading}
                    className="w-full md:w-auto"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {loading ? 'Yuborilmoqda...' : 'Xabar yuborish'}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-4 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Contact Details */}
              <Card>
                <h3 className="font-heading font-semibold mb-4">Bog'lanish</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-primary" />
                    <div>
                      <div className="text-sm text-muted">Email</div>
                      <div className="font-medium">pixeluzpro@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-primary" />
                    <div>
                      <div className="text-sm text-muted">Telefon</div>
                      <div className="font-medium">+998 88 089 07 93</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-primary" />
                    <div>
                      <div className="text-sm text-muted">Manzil</div>
                      <div className="font-medium">Almaliq, O'zbekiston</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Response Time */}
              <Card>
                <h3 className="font-heading font-semibold mb-4">Javob vaqti</h3>
                <p className="text-muted text-sm mb-4">
                  Odatda 24 soat ichida javob beramiz. Shoshilinch loyihalar uchun telefon orqali bog'laning.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Email javob:</span>
                    <span className="text-primary">24 soat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Telefon:</span>
                    <span className="text-primary">Darhol</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Loyiha tahlili:</span>
                    <span className="text-primary">2-3 kun</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact