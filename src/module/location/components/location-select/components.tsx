'use client';

import { FC, useEffect, useMemo, useState } from "react";
import { LocationSelectProps } from "./props";
import { useGetLocation } from "../../hooks";
import { Select, SelectOptionType } from "@/components/inputs/select";
import { SearchableSelect } from "@/components/inputs/searchable-select";

export const LocationSelect : FC<LocationSelectProps> = ({
    className = '',
    value,
    ...props
}) => {
    const [filter, setFilter] = useState<Record<string, any>>({
        search  : '',
        isActive: '1',
        selectedId  : !Array.isArray(value) && typeof value == 'number' ?  value : undefined,
        selectedIds : Array.isArray(value) && value.length && typeof value[0] == 'number' ? value.join(',') : undefined
    })

    const { data, isLoading } = useGetLocation(filter)

    const handleSearch = (search: string) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            search: search
        }))
    }

    
    useEffect(() => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            selectedId  : !Array.isArray(value) && typeof value == 'number' ?  value : undefined,
            selectedIds : Array.isArray(value) && value.length && typeof value[0] == 'number' ? value.join(',') : undefined
        }))
    }, [value])

    return (
        <SearchableSelect
            name="locationId"
            label="Location"
            className={className}
            data={data?.result || []}
            value={value}
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