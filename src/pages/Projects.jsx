import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Card from '../components/ui/Card'

const Projects = () => {
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
            <h1 className="mb-4">Loyihalarim</h1>
            <p className="text-muted">
              Zamonaviy texnologiyalar yordamida yaratilgan loyihalar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold">Fikr</h2>
                <a
                  href="https://fikr-web.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink size={20} />
                  fikr-web.netlify.app
                </a>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted leading-relaxed">
                  Fikr — foydalanuvchilarga o'z fikrlarini erkin ulashish, muhokama qilish va jamiyat bilan bog'lanish imkonini beruvchi zamonaviy ijtimoiy platforma. Ilova Vite + React asosida ishlab chiqilgan bo'lib, Supabase backend infratuzilmasi bilan integratsiya qilingan. Platformada OAuth autentifikatsiya, post yaratish va tahrirlash, real vaqt xabarlar, bildirishnomalar, rollarga asoslangan boshqaruv (admin, moderator, verified user) hamda moderatsiya tizimi mavjud. SPA arxitekturasi asosida qurilgan tizim tezkor navigatsiya, yuqori ishlash tezligi va mukammal foydalanuvchi tajribasini ta'minlaydi. Ilova Netlify/Vercel orqali deploy qilingan va Capacitor yordamida Android platformaga moslashtirilgan.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Projects