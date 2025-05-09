'use client';

import { FC, useMemo, useState } from "react";
import { LocationSelectProps } from "./props";
import { useGetLocation } from "../../hooks";
import { Select, SelectOptionType } from "@/components/inputs/select";
import { SearchableSelect } from "@/components/inputs/searchable-select";

export const LocationSelect : FC<LocationSelectProps> = ({
    className = '',
    ...props
}) => {
    const [filter, setFilter] = useState<Record<string, any>>({
        search  : '',
        isActive: '1',
    })

    const { data, isLoading } = useGetLocation(filter)

    const handleSearch = (search: string) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            search: search
        }))
    }

    return (
        <SearchableSelect
            name="locationId"
            label="Location"
            className={className}
            data={data?.result || []}
            itemLabelKey="name"
            onSearch={handleSearch}
            loading={isLoading}
            notFoundMessage="Unable to find location"
            emptyMessage="No more location to select"
            searchPlaceholder="Select location"
            { ...props }
        />
    )
}