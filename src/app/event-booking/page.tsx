import { Metadata } from "next";
import { EventPageProvider } from "@/event-booking/components/event-page-provider";
import { HeadlineSetter } from "@/event-booking/components/headline-setter";

export const metadata: Metadata = {
    title: `Memorable Event Imaging Provider | ${ process.env.NEXT_PUBLIC_APP_NAME || 'Lyfe Foto' }`,
}

export default function Home() {
    return (
        <>
            <div className="my-5 py-5"></div>
            <EventPageProvider/>
            <HeadlineSetter imgUrl=""/>
        </>
    )
}
