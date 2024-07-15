import { ChangeEventHandler } from "react";
import { ChangeEventTarget, InputChangeHandler } from "./types";

export const changeHandlerGenerator = <T = HTMLInputElement> (onChange : InputChangeHandler | undefined) : ChangeEventHandler<T> => {
    return (event) => {
        if (typeof onChange != 'function') {
            return
        }

        const target = event.currentTarget as unknown as ChangeEventTarget
        if (!target) {
            return
        }

        const name = target?.name
        const type = target?.type
        let value : any
        if (type == 'checkbox') {
            value = target.checked
        } else {
            value = target.value
        }

        onChange({ name: name, value: value })
    }
}