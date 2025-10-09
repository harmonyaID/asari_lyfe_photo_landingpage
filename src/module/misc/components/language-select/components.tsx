'use client'

import { FC, useEffect, useState } from "react"
import { LanguageSelectProps } from "./props"
import { useGetLanguage } from "../../hooks/useGetLanguage"
import { SearchableSelect } from "@/components/inputs/searchable-select"

export const LanguageSelect : FC<LanguageSelectProps> = ({
    id,
    name = '',
    label = 'Language',
    onChange,
    multiple = false,
    value,
    ...props
}) => {
    const inputName = name ? name : multiple ? 'languageIds' : 'languageId'
    const inputId   = id || `input-${inputName}`

    const [filter, setFilter] = useState<Record<string, any>>({
        search  : '',
        isActive: '1',
        selectedId  : !Array.isArray(value) && typeof value == 'number' ?  value : undefined,
        selectedIds : Array.isArray(value) && value.length && typeof value[0] == 'number' ? value.join(',') : undefined
    })

    const { data, isLoading } = useGetLanguage(filter)
    
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
            name={inputName}
            id={inputId}
            data={data?.result || []}
            label={label}
            itemLabelKey="name"
            onSearch={handleSearch}
            onChange={onChange}
            loading={isLoading}
            multiple={multiple}
            notFoundMessage="Unable to find language"
            emptyMessage="No more language to select"
            searchPlaceholder="Select language"
            {...props}
        />
    )
}
