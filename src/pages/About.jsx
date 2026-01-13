import { motion } from 'framer-motion'
import { User, MapPin, Calendar, Award } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const About = () => {
  return (
    <div className="pt-16">
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4">Men haqimda</h1>
            <p className="text-muted">
              Frontend development va UI/UX dizayn sohasida 3+ yillik tajribaga ega mutaxassisman.
            </p>
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
                  Men zamonaviy raqamli mahsulotlar yaratishga ixtisoslashgan, natijaga yo'naltirilgan Frontend dasturchiman. Mening asosiy maqsadim — tezkor, xavfsiz, masshtablanuvchi va foydalanuvchi uchun qulay bo'lgan web va mobil ilovalar ishlab chiqishdir. Har bir loyihaga muhandislik yondashuvi bilan qarayman va kod sifati, tizim arxitekturasi hamda foydalanuvchi tajribasini ustuvor deb bilaman.
                </p>
                
                <p className="text-muted leading-relaxed">
                  Asosiy texnologiyalarim: JavaScript, React, HTML, CSS, Tailwind CSS, Ant Design, Flowbite va Node.js. Zamonaviy frontend infratuzilmasi bilan faol ishlayman: Vite, SPA arxitekturasi, REST API, Supabase, OAuth autentifikatsiya tizimlari, hamda Netlify va Vercel orqali avtomatlashtirilgan deploy jarayonlari.
                </p>
                
                <p className="text-muted leading-relaxed">
                  Men murakkab tizimlarni noldan ishlab chiqish, UI/UX dizaynni texnik jihatdan mukammal amalga oshirish, backend bilan to'liq integratsiya qilish va real foydalanuvchilar uchun tayyor mahsulot yaratish tajribasiga egaman. Loyihalarni ishlab chiqarish darajasiga yetkazish, optimallashtirish va xavfsizlikni ta'minlash mening ustuvor vazifalarimdan biridir.
                </p>
                
                <p className="text-muted leading-relaxed">
                  Shuningdek, web-ilovalarni Android platformaga moslashtirish (Capacitor orqali) tajribam mavjud bo'lib, mobil qurilmalar uchun tezkor va barqaror ilovalar yarataman.
                </p>
                
                <p className="text-muted leading-relaxed">
                  Bundan tashqari, men Minecraft modding bilan ham shug'ullanaman. Minecraft uchun maxsus modlar yaratish, mavjud modlarni sozlash, modpack yig'ish, konfiguratsiya qilish, performance optimizatsiyasi va yangi gameplay mexanikalarini joriy etish bo'yicha tajribaga egaman. Bu yo'nalish menga tizimlarni ichki darajada chuqur tushunish va noan'anaviy yechimlar ishlab chiqish imkonini beradi.
                </p>
                
                <p className="text-muted leading-relaxed">
                  Men, shuningdek, UI animatsiyalar va interaktiv effektlar yaratishda tajribaga egaman. Sahifa o'tishlari, mikro-interaksiyalar va vizual effektlar orqali mahsulotga zamonaviy va premium darajadagi ko'rinish beraman.
                </p>
                
                <p className="text-muted leading-relaxed">
                  Men uchun dasturlash — bu shunchaki kod yozish emas, balki muammoni tahlil qilish, optimal yechim topish va biznesga real foyda keltiradigan mahsulot yaratishdir. Har bir loyihada samaradorlik, xavfsizlik va foydalanish qulayligini ta'minlashga intilaman.
                </p>
                
                <p className="text-muted leading-relaxed">
                  Mening maqsadim — global darajadagi mahsulotlar yaratish, zamonaviy texnologiyalar bilan ishlash va yuqori sifatli dasturiy yechimlar orqali foydalanuvchilarning hayotini osonlashtirishdir.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About