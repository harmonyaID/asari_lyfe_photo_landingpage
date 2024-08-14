import { InputProps } from "@/components/inputs/input"

export interface ScheduleSelectProps extends Omit<InputProps, 'name' | 'type' | 'label'> {
    locationId? : number
    date?       : string
}