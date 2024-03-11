import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { useResponsive } from "ahooks/lib"

type Props = {
  className?: string,
  children: ReactNode
}

export default function PageTransition({children, className}: Props) {
  const responsive = useResponsive()
  const [x] = useState(responsive?.['md'] ? 1024 : 375)

  return (
    <motion.div
      initial={{ x, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -x, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
      }}
      className={`grow ${className ?? ''} flex`}
    >
      {children}
    </motion.div>
  )
}
