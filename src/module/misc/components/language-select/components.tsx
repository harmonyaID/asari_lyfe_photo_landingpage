'use client'

import { FC, useState } from "react"
import { LanguageSelectProps } from "./props"
import { useGetLanguage } from "../../hooks/useGetLanguage"
import { SearchableSelect } from "@/components/inputs/searchable-select"

export const LanguageSelect : FC<LanguageSelectProps> = ({
    id,
    name = '',
    label = 'Language',
    onChange,
    multiple = false,
    ...props
}) => {
    const inputName = name ? name : multiple ? 'languageIds' : 'languageId'
    const inputId   = id || `input-${inputName}`

    const [filter, setFilter] = useState<Record<string, any>>({
        search  : '',
        isActive: '1',
    })

    const { data, isLoading } = useGetLanguage(filter)
    
    const handleSearch = (search: string) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            search: search
        }))
    }

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
