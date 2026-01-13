import { motion } from 'framer-motion'
import { Youtube, Instagram } from 'lucide-react'
import Card from '../components/ui/Card'

const Blog = () => (
  <div className="pt-16">
    <section className="section-padding">
      <div className="container-main">
        <motion.div className="text-center max-w-3xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4">Blog va Kanallar</h1>
          <p className="text-muted">Texnologiya, animatsiya va modding bo'yicha kontent</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Animation YouTube Channel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center h-full p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Youtube size={24} className="text-red-500 sm:hidden" />
                <Youtube size={32} className="text-red-500 hidden sm:block" />
              </div>
              <h3 className="font-heading font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Animatsiya</h3>
              <p className="text-muted mb-3 sm:mb-4 text-xs sm:text-sm">UI animatsiyalar va motion design bo'yicha video darslar</p>
              <a
                href="https://youtube.com/@itspiksel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 transition-colors font-medium text-sm break-all"
              >
                @itspiksel
              </a>
            </Card>
          </motion.div>

          {/* Modding Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center h-full p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Instagram size={24} className="text-pink-500 sm:hidden" />
                <Instagram size={32} className="text-pink-500 hidden sm:block" />
              </div>
              <h3 className="font-heading font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Modding</h3>
              <p className="text-muted mb-3 sm:mb-4 text-xs sm:text-sm">O'yin va ilova modifikatsiyasi bo'yicha kontent</p>
              <a
                href="https://instagram.com/texnokiddo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-colors font-medium text-sm break-all"
              >
                @texnokiddo
              </a>
            </Card>
          </motion.div>

          {/* Blog Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="text-center h-full p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Instagram size={24} className="text-pink-500 sm:hidden" />
                <Instagram size={32} className="text-pink-500 hidden sm:block" />
              </div>
              <h3 className="font-heading font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Blog</h3>
              <p className="text-muted mb-3 sm:mb-4 text-xs sm:text-sm">Dasturlash va texnologiya bo'yicha postlar</p>
              <a
                href="https://instagram.com/sultonovdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-colors font-medium text-sm break-all"
              >
                @sultonovdev
              </a>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
)

export default Blog