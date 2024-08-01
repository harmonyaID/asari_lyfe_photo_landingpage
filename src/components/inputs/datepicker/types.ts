import { Datepicker } from "vanillajs-datepicker"

interface Detail {
    date        : Date
    viewDate    : Date
    viewId      : number
    datepicker  : Datepicker
}

export interface DatepickerEvent extends Event {
    detail: Detail
}