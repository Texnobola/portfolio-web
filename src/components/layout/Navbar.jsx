import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user, isAdmin } = useAuth()

  const navItems = [
    { name: 'Haqida', path: '/about' },
    { name: 'Koʻnikmalar', path: '/skills' },
    { name: 'Loyihalar', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Aloqa', path: '/contact' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-heading font-bold text-primary">O'razali</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/dashboard" className="text-sm text-muted hover:text-primary">
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-bg font-medium">
                  {user.email?.[0]?.toUpperCase()}
                </Link>
              </div>
            ) : (
              <>
                <Link to="/auth" className="text-sm text-muted hover:text-primary">
                  Kirish
                </Link>
                <Link to="/contact" className="btn-primary">
                  Menga yozing
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted hover:text-primary"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="container-main py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.path) ? 'text-primary' : 'text-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  {user ? (
                    <div className="flex flex-col space-y-2">
                      {isAdmin && (
                        <Link
                          to="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="text-sm text-muted hover:text-primary"
                        >
                          Dashboard
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-muted hover:text-primary"
                      >
                        Profil
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-muted hover:text-primary"
                      >
                        Kirish
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className="btn-primary inline-block text-center"
                      >
                        Menga yozing
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar