import React, { useCallback } from "react"
import { ISimpleToastProps } from "../types"
import { useSimpleToast } from "../store/hooks"
import "./styles.css"
import { DEFAULT_CLASSES, TOAST_CLASSES } from "../constants"

const Toast: React.FC<ISimpleToastProps> = ({ toast, classNames }) => {
  const [hideToast, setHideToast] = React.useState("")
  const { toast: dispatch } = useSimpleToast()

  const removeToast = useCallback(() => {
    setHideToast(DEFAULT_CLASSES.hideToast)
    setTimeout(() => {
      dispatch.remove(toast.id)
    }, 200)
  }, [setHideToast, dispatch, toast.id])

  React.useEffect(() => {
    setTimeout(() => {
      removeToast()
    }, toast.duration * 1000)
  }, [removeToast, toast.duration])

  const typeClass =
    classNames?.types?.[toast.content.type ?? "default"] ??
    TOAST_CLASSES.types![toast.content.type!]

  return (
    <div
      key={toast.id}
      className={`${DEFAULT_CLASSES.toast} ${typeClass ?? ""} ${hideToast ?? ""}`}
    >
      <div className="w-[95%]">
        <div className={`text-center ${classNames?.title ?? ""}`}>
          {toast.content.title}
        </div>
        <div className={`mt-[0.3rem] ${classNames.description ?? ""}`}>
          {toast.content.description}
        </div>
      </div>
      <div className={` ${classNames?.close ?? ""}`}>
        <span className="cursor-pointer" onClick={removeToast}>
          x
        </span>
      </div>
    </div>
  )
}

export default Toast
