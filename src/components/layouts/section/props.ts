import { NavItems } from "@/contexts/navbar-context/types";
import { ComponentPropsWithoutRef } from "react";

export interface SectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'id'> {
    id?         : NavItems
    observable? : boolean
    ratio?      : number
}