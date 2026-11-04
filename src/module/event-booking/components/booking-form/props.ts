import { Package } from "@/event-booking/types/package";
import { ComponentWithLogo } from "@/types/components";

export interface BookingFormProps extends ComponentWithLogo {
    eventPackage: Package
}