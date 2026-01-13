import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, ExternalLink, Code, Palette, Smartphone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProjects()
  }, [])

  const fetchFeaturedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .limit(3)
      
      if (error) throw error
      setFeaturedProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback data if Supabase fails
      setFeaturedProjects([
        {
          id: 1,
          title: 'Todo Pro — Web task manager',
          description: 'Kichik team uchun realtime task manager. React, Node.js, WebSocket texnologiyalari yordamida yaratilgan.',
          tech_stack: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
          live_url: 'https://todo.example.com',
          github_url: 'https://github.com/orazali/todo-pro',
          featured: true
        },
        {
          id: 2,
          title: 'Shoply — E-commerce dashboard',
          description: 'Savdogarlar uchun admin dashboard. React, Tailwind CSS va Supabase yordamida ishlab chiqilgan.',
          tech_stack: ['React', 'Tailwind', 'Supabase', 'Chart.js'],
          github_url: 'https://github.com/orazali/shoply'
        },
        {
          id: 3,
          title: 'MobTrade — Mobile marketplace',
          description: 'Hybrid mobile app marketplace. React Native va Firebase yordamida yaratilgan mobil ilova.',
          tech_stack: ['React Native', 'Firebase', 'Redux', 'Expo'],
          github_url: 'https://github.com/orazali/mobtrade'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const services = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'React, Vue.js va Angular yordamida zamonaviy web ilovalar yarataman.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Foydalanuvchi tajribasini yaxshilaydigan chiroyli va funksional dizaynlar.',
      features: ['User Research', 'Prototyping', 'Design Systems']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'React Native yordamida iOS va Android uchun mobil ilovalar ishlab chiqaman.',
      features: ['Cross-platform', 'Native Performance', 'App Store Ready']
    }
  ]

  const stats = [
    { label: 'Loyihalar', value: '20+' },
    { label: 'Yillik tajriba', value: '3+' },
    { label: 'Mijozlar', value: '10+' },
    { label: 'Texnologiyalar', value: '15+' }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-bg via-bg to-card/20">
        <div className="container-main">
          <div className="grid-12 items-center min-h-[80vh]">
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge variant="status" className="mb-4">
                    Frontend Developer
                  </Badge>
                </motion.div>
                
                <h1 className="text-gradient">
                  Frontend Developer & UI Engineer
                </h1>
                
                <p className="text-muted max-w-2xl">
                  Zamonaviy web va mobil ilovalar yarataman — React, JavaScript va UI/UX bo'yicha mutaxassis. 
                  Har bir loyihada foydalanuvchi tajribasini birinchi o'ringa qo'yaman.
                </p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button className="btn-primary">
                  <Link to="/projects">
                    Loyihalarga qarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline">
                  <Link to="/contact">Menga yozing</Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-heading font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full animate-float"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/logo.png" alt="O'razali Logo" className="w-64 h-64 object-contain" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fikr Project */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Fikr</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Zamonaviy ijtimoiy platforma - erkin fikr almashish va jamiyat bilan bog'lanish uchun.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="project">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Code size={40} className="text-primary" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-semibold">Fikr</h3>
                </div>
                <p className="text-muted text-sm mb-4">
                  Fikr — foydalanuvchilarga o'z fikrlarini erkin ulashish, muhokama qilish va jamiyat bilan bog'lanish imkonini beruvchi zamonaviy ijtimoiy platforma.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="tech" size="small">React</Badge>
                  <Badge variant="tech" size="small">Vite</Badge>
                  <Badge variant="tech" size="small">Supabase</Badge>
                  <Badge variant="tech" size="small">Tailwind</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://fikr-web.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="outline">
              <Link to="/projects">Batafsil ma'lumot</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-card/20">
        <div className="container-main">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Xizmatlarim</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Sizning g'oyalaringizni hayotga tatbiq etish uchun keng ko'lamli xizmatlar taklif etaman.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted flex items-center justify-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Loyihangizni muhokama qilaylikmi?</h2>
            <p className="text-muted mb-6 max-w-2xl mx-auto">
              G'oyangiz bormi? Keling, uni birga hayotga tatbiq etaylik. 
              Professional yechimlar va sifatli natija kafolatlanadi.
            </p>
            <Button size="large">
              <Link to="/contact">Bepul maslahat olish</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home