import { 
    Inter as FontInter, 
    Noto_Sans, 
    Nunito_Sans, 
    Poppins as FontPoppins, 
    Varela_Round 
} from "next/font/google";

export const NotoSans = Noto_Sans({ 
    display: 'swap',
    subsets: ['latin'],
})

export const NunitoSans = Nunito_Sans({ 
    display: 'swap',
    subsets: ['latin'],
})

export const VarelaRound = Varela_Round({
    display : 'swap',
    weight  : '400',
    subsets : ['latin'],
})

export const Inter = FontInter({ 
    display: 'swap',
    subsets: ["latin"]
})

export const Poppins = FontPoppins({
    display: 'swap',
    subsets: ['latin'],
    weight: ['600']
})