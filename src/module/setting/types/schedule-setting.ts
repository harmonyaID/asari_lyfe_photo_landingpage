export interface ScheduleSetting {
    id          : number
    name        : string
    code        : string
    isActive    : boolean
    value       : any
    rawValue    : string
    valueType   : {
        id      : number
        name    : string
    }
    updatedAt   : string
}
