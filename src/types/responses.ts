export interface ResponseStatus {
    code        : number
    message     : string
    internalMsg : string|null
    attributes  : string[]|null
}

export interface ResponsePagination {
    count       : number
    currentPage : number
    perPage     : number
    total       : number
    totalPage   : number
    links       : {
        next    : number
        previous: number
    }
}

export interface Response<Data = null> {
    status      : ResponseStatus
    result      : Data | null
    pagination? : ResponsePagination
}
