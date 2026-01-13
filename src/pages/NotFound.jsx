import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFound = () => (
  <div className="pt-16">
    <section className="section-padding">
      <div className="container-main">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4">404 - Sahifa topilmadi</h1>
          <p className="text-muted mb-6">Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
          <Button asChild>
            <Link to="/">Bosh sahifaga qaytish</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </div>
)

export default NotFound