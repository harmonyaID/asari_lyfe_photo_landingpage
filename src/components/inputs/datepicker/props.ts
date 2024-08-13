import { InputProps } from "../input";

export interface DatePickerProps extends Omit<InputProps, 'type'> {
    maxNumberOfDates?   : number
    datesDisabled?      : string[]
}