import { FormatCurrency, FormatPhoneNumber } from "./types";

export const formatPhoneNumber : FormatPhoneNumber = (number) => {
    if (!number) {
        return number
    }

    return number.replace(/^\++/g, '')
        .replace(/^0+/g, '62')
        .replaceAll('-', '')
}

export const formatCurrency : FormatCurrency = (num, currency = 'Rp') => {
    let subject = num
    if (typeof subject == 'string') {
        subject = parseFloat(subject)
    }
    if (isNaN(subject)) {
        return num as string
    }

    const formatted = subject.toLocaleString('id-ID')
    return `${currency}${formatted}`
}