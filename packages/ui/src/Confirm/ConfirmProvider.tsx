import { ReactNode, createContext, useCallback, useContext, useState } from "react"
import { Confirm, ConfirmProps } from "./Confirm"

export type ConfirmOptions = Partial<ConfirmProps>
type RequestConfirm = (req: ConfirmOptions) => void
const confirmContext = createContext<RequestConfirm | null>(null)

export const useConfirm = () => {
  const context = useContext(confirmContext)

  if (!context) {
    throw new Error('Component must be wrapped in a ConfirmProvider!')
  }

  return useCallback((req: ConfirmOptions) => {
    context(req)
  }, [context])
}
export const ConfirmProvider = ({children}: {children?: ReactNode}) => {
  const [show, setShow] = useState(false)
  const [confirmRequest, setConfirmRequest] = useState<ConfirmOptions | null>(null)

  const requestConfirm = useCallback((req: ConfirmOptions) => {
    setConfirmRequest(req)
    setShow(true)
  }, [])

  return (
    <confirmContext.Provider value={requestConfirm}>
      {children}
      {confirmRequest && (
        <Confirm 
          {...confirmRequest}
          open={show}
          onClose={() => setShow(false)}
        />
      )}
    </confirmContext.Provider>
  )
}
