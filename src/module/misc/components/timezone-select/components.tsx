'use client'

import { FC, useEffect, useState } from "react"
import { TimezoneSelectProps } from "./props"
import { useGetTimezone } from "../../hooks/useGetTimezone"
import { SearchableSelect } from "@/components/inputs/searchable-select"

export const TimezoneSelect : FC<TimezoneSelectProps> = ({
    id,
    name        = '',
    label       = 'Timezone',
    multiple    = false,
    value,
    ...props
}) => {
    const inputName = name ? name : multiple ? 'timezones' : 'timezone'
    const inputId   = id || `input-${inputName}`

    const [filter, setFilter] = useState<Record<string, any>>({
        search  : '',
        selected: value,
    })
    const {data, isLoading} = useGetTimezone(filter)

    const handleSearch = (search: string) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            search: search
        }))
    }

    useEffect(() => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            selected    : !Array.isArray(value) && typeof value == 'string' ? value : undefined,
            selecteds   : Array.isArray(value) && value.length && typeof value[0] == 'string' ? value.join(',') : undefined
        }))
    }, [value])

    return (
        <SearchableSelect
            id={inputId}
            name={inputName}
            data={data?.result || []}
            label={label}
            itemLabelKey="name"
            onSearch={handleSearch}
            loading={isLoading}
            multiple={multiple}
            notFoundMessage="Unable to find any timezone"
            emptyMessage="No more timezone to select"
            searchPlaceholder="Select timezone"
            value={value}
            { ...props }
        />
    )
}