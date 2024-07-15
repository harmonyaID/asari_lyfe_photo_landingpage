export interface ChangeResult {
    name    : string
    value   : any
}

export type InputChangeHandler = (result : ChangeResult) => void
export type ChangeEventTarget = EventTarget & HTMLInputElement