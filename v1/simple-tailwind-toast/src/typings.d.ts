/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

export interface ISimpleToastContent {
  title?: React.ReactNode
  description?: React.ReactNode
  type?: 'error' | 'success' | 'warning'
}

export interface ISimpleToast {
  id?: string
  content: ISimpleToastContent
  duration?: number
}

export interface IToastContextStore {
  toasts: ISimpleToast[]
}

export type TToastReducer = {
  type: string
  payload?: any
}

export type IToastContextDispatch = React.Dispatch<TToastReducer>

export type SimpleToaster = React.JSX.Element

export type SimpleToastProvider = React.FC<{ children: React.ReactNode }>
