import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, LogOut, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const Profile = () => {
  const { user, isAdmin } = useAuth()
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    role: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) throw error
      
      setProfile({
        full_name: data.full_name || '',
        email: data.email || user.email,
        role: data.role || 'user'
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: profile.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
      
      if (error) throw error
      setMessage('Profil muvaffaqiyatli yangilandi!')
    } catch (error) {
      setMessage('Xatolik yuz berdi: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  if (!user) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <Card>
          <div className="p-8 text-center">
            <h2 className="text-xl font-heading font-semibold mb-4">Kirish talab qilinadi</h2>
            <p className="text-muted mb-6">Profilni ko'rish uchun tizimga kiring</p>
            <Button asChild>
              <a href="/auth">Kirish</a>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <h1 className="mb-4">Profil</h1>
              <p className="text-muted">Shaxsiy ma'lumotlaringizni boshqaring</p>
            </div>

            <Card>
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-border">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <User size={32} className="text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-heading font-semibold">
                      {profile.full_name || 'Foydalanuvchi'}
                    </h2>
                    <p className="text-muted text-sm break-all">{profile.email}</p>
                    <Badge variant={isAdmin ? 'success' : 'status'} size="small" className="mt-2">
                      {profile.role === 'admin' ? 'Administrator' : 'Foydalanuvchi'}
                    </Badge>
                  </div>
                </div>

                {/* Success/Error Message */}
                {message && (
                  <div className={`mb-6 p-3 rounded-lg text-sm ${
                    message.includes('muvaffaqiyatli')
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Profile Form */}
                <form onSubmit={updateProfile} className="space-y-6">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium mb-2">
                      To'liq ism
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={profile.full_name}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Ismingizni kiriting"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
                      <input
                        type="email"
                        id="email"
                        value={profile.email}
                        className="input w-full pl-10 bg-card/50"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted mt-1">Email o'zgartirib bo'lmaydi</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      loading={loading}
                      className="flex-1 w-full"
                    >
                      <Save size={16} className="mr-2" />
                      {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={signOut}
                      className="flex-1 w-full"
                    >
                      <LogOut size={16} className="mr-2" />
                      Chiqish
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Profile