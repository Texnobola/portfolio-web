import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Calendar, User, Code, CheckCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'

const ProjectDetail = () => {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)

  // Mock project data - in real app, fetch from API
  useEffect(() => {
    const projects = {
      1: {
        id: 1,
        title: 'Todo Pro — Web task manager',
        subtitle: 'Kichik jamoalar uchun professional vazifalar boshqaruv tizimi',
        description: 'Todo Pro - bu zamonaviy web-based task management tizimi bo\'lib, kichik va o\'rta jamoalar uchun mo\'ljallangan. Real vaqtda hamkorlik, vazifalarni taqsimlash, progress tracking va hisobotlar yaratish imkoniyatlarini taqdim etadi.',
        image: '/api/placeholder/800/400',
        gallery: [
          '/api/placeholder/800/400',
          '/api/placeholder/800/400',
          '/api/placeholder/800/400'
        ],
        tech: ['React', 'Node.js', 'WebSocket', 'MongoDB', 'Express', 'JWT', 'Tailwind CSS'],
        category: 'Full Stack',
        timeline: '3 oy',
        role: 'Full Stack Developer',
        client: 'StartupHub',
        liveUrl: 'https://todo.example.com',
        githubUrl: 'https://github.com/orazali/todo-pro',
        status: 'Tugallangan',
        problem: 'Jamoalar o\'rtasida vazifalarni taqsimlash va kuzatishda muammolar mavjud edi. Mavjud yechimlar juda murakkab yoki qimmat edi.',
        solution: 'Oddiy va intuitiv interfeys bilan real-vaqt rejimida ishlaydigan task manager yaratdik. WebSocket texnologiyasi orqali bir vaqtda bir nechta foydalanuvchi ishlashi mumkin.',
        results: [
          'Jamoa samaradorligi 40% ga oshdi',
          'Vazifalarni bajarish vaqti 25% qisqardi',
          'Mijoz mamnunligi 95% ga yetdi',
          'Foydalanuvchilar soni 500+ ga yetdi'
        ],
        features: [
          'Real-time collaboration',
          'Drag & drop interface',
          'Team management',
          'Progress tracking',
          'File attachments',
          'Comments system',
          'Email notifications',
          'Mobile responsive'
        ]
      }
    }
    
    setProject(projects[projectId] || null)
  }, [projectId])

  if (!project) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Loyiha topilmadi</h2>
          <Button asChild>
            <Link to="/projects">Loyihalarga qaytish</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-bg via-bg to-card/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ghost" className="mb-6" asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Loyihalarga qaytish
              </Link>
            </Button>

            <div className="grid-12 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="status">{project.category}</Badge>
                  <Badge variant="success">{project.status}</Badge>
                </div>
                
                <h1 className="mb-4">{project.title}</h1>
                <p className="text-muted text-lg mb-6">{project.subtitle}</p>
                
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <Button asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4">
                <Card>
                  <h3 className="font-heading font-semibold mb-4">Loyiha ma'lumotlari</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-primary" />
                      <div>
                        <div className="text-sm text-muted">Muddat</div>
                        <div className="font-medium">{project.timeline}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-primary" />
                      <div>
                        <div className="text-sm text-muted">Rol</div>
                        <div className="font-medium">{project.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code size={16} className="text-primary" />
                      <div>
                        <div className="text-sm text-muted">Mijoz</div>
                        <div className="font-medium">{project.client}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
              <Code size={80} className="text-primary" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.gallery.map((image, index) => (
                <div key={index} className="aspect-video bg-gradient-to-br from-primary/5 to-primary/2 rounded-lg flex items-center justify-center">
                  <Code size={40} className="text-primary/50" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-card/20">
        <div className="container-main">
          <div className="grid-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Problem */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-4">Muammo</h2>
                <p className="text-muted">{project.problem}</p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="mb-4">Yechim</h2>
                <p className="text-muted">{project.solution}</p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="mb-4">Natijalar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0" />
                      <span className="text-muted">{result}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <h3 className="font-heading font-semibold mb-4">Texnologiyalar</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="tech">{tech}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <h3 className="font-heading font-semibold mb-4">Xususiyatlar</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-padding">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-center">Boshqa loyihalar</h2>
            <div className="text-center">
              <Button asChild>
                <Link to="/projects">Barcha loyihalarni ko'rish</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail