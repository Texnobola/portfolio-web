import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Card from '../components/ui/Card'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Siz qanday xizmatlarni taklif qilasiz?",
      answer: "Men zamonaviy veb-ilovalar, frontend interfeyslar, admin panellar, startup loyihalar, mobil ilovalar (web → Android), hamda maxsus tizimlar ishlab chiqish xizmatlarini taklif qilaman. Shuningdek, UI animatsiyalar, modding va mavjud ilovalarni optimallashtirish bilan ham shug'ullanaman."
    },
    {
      question: "Qaysi texnologiyalar bilan ishlaysiz?",
      answer: "Asosiy texnologiyalarim: JavaScript, React, HTML, CSS, Tailwind CSS, Ant Design, Flowbite, Node.js, Supabase, REST API, Vite, OAuth, Netlify, Vercel, Capacitor."
    },
    {
      question: "Loyihani noldan ishlab chiqasizmi?",
      answer: "Ha. G'oyadan boshlab dizayn, frontend, backend integratsiya, deploy va mobil versiyagacha to'liq ishlab chiqaman."
    },
    {
      question: "Mavjud loyihani yaxshilab bera olasizmi?",
      answer: "Albatta. Mavjud kodni refaktor qilish, tezlikni oshirish, dizaynni yangilash, xavfsizlikni kuchaytirish va yangi funksiyalar qo'shish xizmatlarini ko'rsataman."
    },
    {
      question: "Mobil ilova ham tayyorlab berasizmi?",
      answer: "Ha. Web-ilovalarni Android ilovaga aylantiraman va Play Market yoki alternativ marketlar uchun tayyor APK/AAB fayl beraman."
    },
    {
      question: "Animatsiya va interaktiv effektlar qilasizmi?",
      answer: "Ha. Zamonaviy UI animatsiyalar, sahifa o'tishlari, mikro-interaksiyalar va vizual effektlar yarataman."
    },
    {
      question: "Modding xizmatlari ham bormi?",
      answer: "Ha. Men Minecraft modding bilan shug'ullanaman. Minecraft uchun maxsus modlar yaratish, mavjud modlarni sozlash va optimallashtirish, modpack yig'ish, konfiguratsiya qilish hamda server va singleplayer uchun moslashtirilgan tizimlar ishlab chiqaman. Shuningdek, performance optimizatsiyasi, balans sozlash, yangi mexanikalar qo'shish va maxsus gameplay tizimlari yaratish bo'yicha tajribaga egaman."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="pt-16">
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4">Tez-tez so'raladigan savollar</h1>
            <p className="text-muted">Xizmatlarim va ish jarayonim haqida eng ko'p so'raladigan savollar</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-card/50 transition-colors"
                  >
                    <h3 className="font-heading font-semibold pr-4">{faq.question}</h3>
                    <ChevronDown 
                      size={20} 
                      className={`text-muted transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      <div className="p-6 pt-4">
                        <p className="text-muted leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ