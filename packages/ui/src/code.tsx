import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  className?: string
}

export default function Code({ children, className }: Props) {
  return (
    <code
      className={className}
      style={{ background: '#eee', padding: 4, borderRadius: 4 }}
    >
      {children}
    </code>
  )
}
