import { Metadata } from "next";
import { EventPageProvider } from "@/event-booking/components/event-page-provider";
import { HeadlineSetter } from "@/event-booking/components/headline-setter";
import { getAppSettings } from "@/setting/services/app-setting";
import { getAppName } from "@/helpers/app/functions";


export async function generateMetadata() : Promise<Metadata> {
    
    const appName = await getAppName()
    
    return {
        title: `Memorable Event Imaging Provider | ${ appName}`,
    }
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
