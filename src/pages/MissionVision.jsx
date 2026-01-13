// MissionVision.jsx
import { motion } from 'framer-motion'

const MissionVision = () => {
  return (
    <div className="pt-16">
      <section className="section-padding">
        <div className="container-main">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4">Missiya va Viziya</h1>
            <p className="text-muted">Kelajakda qo'shiladi...</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MissionVision