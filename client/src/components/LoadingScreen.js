import { Box } from '@mui/material'
import { motion } from 'framer-motion'

const backdropVariants = {
  initial: { opacity: 0 },
  in:      { opacity: 1 },
  out:     { opacity: 0 }
}

const dotVariants = {
  animate: i => ({
    scale: [0.3, 1, 0.3],
    transition: {
      repeat: Infinity,
      duration: 0.9,
      ease: 'easeInOut',
      delay: i * 0.2
    }
  })
}

export default function LoadingScreen() {
  return (
    <motion.div
      variants={backdropVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          zIndex: 2000,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[0, 1, 2].map(i => (
            <motion.div
              custom={i}
              variants={dotVariants}
              animate="animate"
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#1976d2',
              }}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  )
}