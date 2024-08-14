import { ObjectToParam } from "./types"

export const objectToParam : ObjectToParam = (object) => {
    let output = ''
    
    for (const key in object) {
        if (!Object.prototype.hasOwnProperty.call(object, key)) {
            continue
        }

        let value = object[key]

        if (Array.isArray(value)) {
            value = value.join(',')
        }

        output += output == '' ? '?' : '&'
        output += `${key}=${value}`
    }

    return output
}