import { motion } from 'framer-motion'
import Card from '../components/ui/Card'

const Skills = () => (
  <div className="pt-16">
    <section className="section-padding">
      <div className="container-main">
        <motion.div className="text-center max-w-3xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4">Ko'nikmalarim</h1>
          <p className="text-muted">Texnologiyalar va ko'nikmalar...</p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted leading-relaxed">
                Men zamonaviy frontend texnologiyalari asosida ishlab, yuqori sifatli va ishlab chiqarishga tayyor veb va mobil ilovalar yarataman. Asosiy texnik ko'nikmalarimga JavaScript, React, HTML, CSS, Tailwind CSS, Ant Design, Flowbite va Node.js kiradi. Frontend infratuzilmasida Vite, SPA arxitekturasi, React Router, state management va komponent asosidagi dizayn yondashuvi bilan ishlayman. Backend bilan ishlashda REST API, Supabase, OAuth autentifikatsiya tizimlari va ma'lumotlar bazasi integratsiyasi tajribam mavjud. Deploy va release jarayonlarida Netlify, Vercel va mobil platformalar uchun Capacitor orqali Android ilovalar yarataman. Shuningdek, modding (APK tahlili va modifikatsiya), UI animatsiyalar va interaktiv effektlar yaratish, hamda ilovalarni optimallashtirish va xavfsizlikni kuchaytirish bo'yicha amaliy tajribaga egaman.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  </div>
)

export default Skills