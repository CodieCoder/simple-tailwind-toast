import SimpleToaster from './SimpleToaster'
import SimpleToastProvider from './store'
import { useSimpleToast } from './store/Context'
export * from './typings'

const simpleToaster = { SimpleToaster, SimpleToastProvider, useSimpleToast }

export default simpleToaster
