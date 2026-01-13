import { Link } from 'react-router-dom'
import { Github, Linkedin, Send, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    navigation: [
      { name: 'Haqida', path: '/about' },
      { name: 'Koʻnikmalar', path: '/skills' },
      { name: 'Loyihalar', path: '/projects' },
      { name: 'Xizmatlar', path: '/services' }
    ],
    resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'GitHub', path: '/github' },
      { name: 'Statistika', path: '/stats' },
      { name: 'FAQ', path: '/faq' }
    ],
    legal: [
      { name: 'Maxfiylik siyosati', path: '/privacy' },
      { name: 'Foydalanish shartlari', path: '/terms' },
      { name: 'Aloqa', path: '/contact' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Texnobola', color: 'hover:text-primary' },
    { name: 'GitHub 2', icon: Github, url: 'https://github.com/texnobola-copy', color: 'hover:text-primary' },
    { name: 'Telegram', icon: Send, url: 'https://t.me/pixelanim', color: 'hover:text-blue-500' }
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-main section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col items-center space-y-4 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <img src="/logo.png" alt="O'razali Logo" className="h-48 w-48" />
              </div>
              <span className="text-2xl font-heading font-bold text-primary">O'razali</span>
            </Link>
            <p className="text-muted mb-4">
              Zamonaviy web va mobil ilovalar ishlab chiquvchi. React, JavaScript va UI/UX bo'yicha mutaxassis.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading font-semibold text-text mb-4">Navigatsiya</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-text mb-4">Resurslar</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-text mb-4">Aloqa</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted">
                <Mail size={16} />
                <span>pixeluzpro@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted">
                <Phone size={16} />
                <span>+998 88 089 07 93</span>
              </div>
              <div className="flex items-center space-x-3 text-muted">
                <MapPin size={16} />
                <span>Almaliq, O'zbekiston</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted text-sm">
              © {currentYear} O'razali. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer