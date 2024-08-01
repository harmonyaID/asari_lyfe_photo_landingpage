'use client';

import { FC, useMemo } from "react";
import { LocationSelectProps } from "./props";
import { useGetLocation } from "../../hooks";
import { Select, SelectOptionType } from "@/components/inputs/select";

export const LocationSelect : FC<LocationSelectProps> = ({
    className = '',
    ...props
}) => {
    const { data, isLoading } = useGetLocation()

    const parsedOptions = useMemo<SelectOptionType[]>(() => {
        const output : SelectOptionType[] = [
            { label: "Select Location", value: '' }
        ]

        if (!isLoading && data?.result?.length) {
            data.result.forEach((location) => {
                output.push({
                    label: location.name,
                    value: `${location.id}`
                })
            })
        }

        return output
    }, [data, isLoading])

    return (
        <Select
            name="locationId"
            label="Location"
            className={className}
            options={parsedOptions}
            { ...props }
        />
    )
}