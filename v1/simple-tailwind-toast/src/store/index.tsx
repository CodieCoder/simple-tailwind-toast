import { useReducer } from 'react'
import {
  toastContextStore as ToastStore,
  toastContextDispatch as ToastDispatch,
  initialValues
} from './Context'
import { toastReducer } from './reducer'

const SimpleToastProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialValues)

  return (
    <ToastStore.Provider value={state}>
      <ToastDispatch.Provider value={dispatch}>
        {children}
      </ToastDispatch.Provider>
    </ToastStore.Provider>
  )
}

export default SimpleToastProvider
