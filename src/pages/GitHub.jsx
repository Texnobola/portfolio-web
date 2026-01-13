import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Card from '../components/ui/Card'

const GitHub = () => (
  <div className="pt-16">
    <section className="section-padding">
      <div className="container-main">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-4">GitHub Profillarim</h1>
          <p className="text-muted">Loyihalar va kod namunalari</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Main GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center h-full">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github size={32} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold mb-3">Asosiy GitHub</h3>
              <p className="text-muted mb-4 text-sm">Loyihalar va open source kodlar</p>
              <a
                href="https://github.com/Texnobola"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ExternalLink size={16} />
                github.com/Texnobola
              </a>
            </Card>
          </motion.div>

          {/* Secondary GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center h-full">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github size={32} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold mb-3">Ikkinchi GitHub</h3>
              <p className="text-muted mb-4 text-sm">Qo'shimcha loyihalar va eksperimentlar</p>
              <a
                href="https://github.com/texnobola-copy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ExternalLink size={16} />
                github.com/texnobola-copy
              </a>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
)

export default GitHub