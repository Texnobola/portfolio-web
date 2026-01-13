import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const Card = forwardRef(({ 
  children, 
  variant = 'default', 
  hover = true,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'bg-card border border-border rounded-m transition-all duration-300'
  
  const variants = {
    default: 'p-l',
    project: 'p-0 overflow-hidden hover:scale-[1.03] hover:border-primary hover:shadow-soft',
    blog: 'p-l hover:border-primary/50',
    testimonial: 'p-l text-center',
    compact: 'p-m'
  }
  
  const hoverClasses = hover ? 'hover:border-primary/50 hover:shadow-soft' : ''
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`
  
  const MotionCard = motion.div
  
  return (
    <MotionCard
      ref={ref}
      className={classes}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </MotionCard>
  )
})

Card.displayName = 'Card'

export default Card