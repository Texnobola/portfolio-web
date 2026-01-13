import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'tech', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium transition-colors'
  
  const variants = {
    tech: 'bg-card border border-primary text-primary',
    status: 'bg-primary/10 text-primary',
    category: 'bg-muted/10 text-muted',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20'
  }
  
  const sizes = {
    small: 'px-xxs py-1 text-xs rounded-s',
    medium: 'px-s py-xxs text-small rounded-round',
    large: 'px-m py-xs text-sm rounded-m'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.span
      className={classes}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export default Badge