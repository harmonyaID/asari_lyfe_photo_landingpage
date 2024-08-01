import { toast } from "react-toastify";
import { defaultTimeout, toastPosition } from "./configs";
import { NotifyFunction } from "./types";

export const notifySuccess : NotifyFunction = (message, timeout = defaultTimeout) => {
    toast.success(message, {
        position: toastPosition,
        autoClose: timeout
    })
}

export const notifyError : NotifyFunction = (message, timeout = defaultTimeout) => {
    toast.error(message, {
        position: toastPosition,
        autoClose: timeout
    })
}

export const notifyWarning : NotifyFunction = (message, timeout = defaultTimeout) => {
    toast.warning(message, {
        position: toastPosition,
        autoClose: timeout
    })
}

export const notifyInfo : NotifyFunction = (message, timeout = defaultTimeout) => {
    toast.info(message, {
        position: toastPosition,
        autoClose: timeout
    })
}