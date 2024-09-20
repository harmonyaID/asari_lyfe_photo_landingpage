import { FormatPhoneNumber } from "./types";

export const formatPhoneNumber : FormatPhoneNumber = (number) => {
    if (!number) {
        return number
    }

    return number.replace(/^\++/g, '')
        .replace(/^0+/g, '62')
        .replaceAll('-', '')
}