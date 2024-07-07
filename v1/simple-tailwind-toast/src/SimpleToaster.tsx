import { useSimpleToast } from './store/Context'
import Toast from './Toast'
import './style.scss'

const SimpleToaster = () => {
  const { store } = useSimpleToast()

  return (
    <div className='simple-toaster'>
      {store?.toasts?.map((toast) => (
        <Toast toast={toast} key={toast.id} />
      ))}
    </div>
  )
}

export default SimpleToaster
