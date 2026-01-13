import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import MissionVision from './pages/MissionVision'
import Skills from './pages/Skills'
import SkillDetail from './pages/SkillDetail'
import Experience from './pages/Experience'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import GitHub from './pages/GitHub'
import Blog from './pages/Blog'
import Article from './pages/Article'
import Testimonials from './pages/Testimonials'
import Stats from './pages/Stats'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import AdminMessages from './pages/AdminMessages'
import NotFound from './pages/NotFound'

function AppContent() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300">
        <Navbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission-vision" element={<MissionVision />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/skills/:skillId" element={<SkillDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/github" element={<GitHub />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleId" element={<Article />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App