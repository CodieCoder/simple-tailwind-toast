import React from 'react'
import { ISimpleToast } from './typings'
import { useSimpleToast } from './store/Context'
import { FiX } from 'react-icons/fi'

const Toast: React.FC<{ toast: ISimpleToast }> = ({ toast }) => {
  const [className, setClassName] = React.useState('')
  const { toast: dispatch } = useSimpleToast()

  const removeToast = () => {
    setClassName('hideToast')
    setTimeout(() => {
      dispatch.remove(toast.id)
    }, 200)
  }

  React.useEffect(() => {
    setTimeout(() => {
      removeToast()
    }, toast?.duration || 5 * 1000)
  }, [])

  return (
    <div
      key={toast.id}
      className={`simple-toast type-${toast.content.type} ${className}`}
    >
      <div className='left'>
        <div className='toast-title'>{toast.content.title}</div>
        <div className='toast-description'>{toast.content.description}</div>
      </div>
      <div className='right'>
        <FiX onClick={removeToast} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  )
}

export default Toast
