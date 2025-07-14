'use client';

import { ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { SearchableSelectProps } from "./props";
import { X } from "react-feather";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { BaseModel } from "@/types/models";

export const SearchableSelect : FC<SearchableSelectProps> = ({
    id,
    name,
    label,
    itemLabelKey,
    onSearch,
    onChange,
    multiple            = false,
    required            = false,
    returnsObject       = false,
    loading             = false,
    disabled            = false,
    wrapperClassName    = '',
    data,
    value,
    search = '',
    render,
    error,
    notFoundMessage     = 'Unable to find any data',
    emptyMessage        = 'No more data to select',
    searchPlaceholder   = 'Search by name or code',
    hideSelected        = false,
    hint,
}) => {
    const triggerEffectRef  = useRef(false)
    const searchRef         = useRef<HTMLInputElement>(null)
    const resizerRef        = useRef<HTMLDivElement>(null)
    const changeTimeoutRef  = useRef<ReturnType<typeof setTimeout>>()
    const searchTimeoutRef  = useRef<ReturnType<typeof setTimeout>>()
    const blurTimeoutRef    = useRef<ReturnType<typeof setTimeout>>()
    
    const [focused, setFocused]     = useState(false)
    const [searchVal, setSearchVal] = useState(search)
    const [selectedItems, setSelectedItems] = useState<BaseModel[]>([])

    const filtered = useMemo<BaseModel[]>(() => {
        if (!data.length) {
            return []
        }

        if (!multiple) {
            return data
        }

        return data.filter((item) => selectedItems.findIndex((selected) => item.id == selected.id) == -1)
    }, [data, selectedItems, multiple])

    const handleSearch = (value : string) => {
        if (disabled) {
            return
        }

        setSearchVal(value)

        if (typeof onSearch != 'function') {
            return
        }

        clearTimeout(searchTimeoutRef.current)
        searchTimeoutRef.current = setTimeout(() => {
            onSearch(value)
        }, 300)
    }

    const handleChangeSearch : ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value
        handleSearch(value)
    }

    const handleResetSearch = () => {
        handleSearch('')
    }

    const handleFocusSearch : FocusEventHandler = (event) => {
        if (disabled) {
            return
        }

        clearTimeout(blurTimeoutRef.current)
        setFocused(true)
    }

    const handleBlurSearch : FocusEventHandler = (event) => {
        if (disabled) {
            return
        }

        clearTimeout(blurTimeoutRef.current)
        blurTimeoutRef.current = setTimeout(() => {
            setFocused(false)
            handleResetSearch()
        }, 300)
    }

    const handleBackspaceSearch : KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (disabled) {
            return
        }

        if (!multiple) {
            return
        }

        if ((event.target as HTMLInputElement).value != '') {
            return
        }

        if (!selectedItems.length) {
            return
        }

        triggerEffectRef.current = true
        setSelectedItems((prevState) => {
            const modifiedSelection = [...prevState]
            modifiedSelection.pop()
    
            return modifiedSelection
        })
    }

    const handleKeydownSearch : KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Backspace') {
            handleBackspaceSearch(event)
        }
    }

    const handleClickContainer = () => {
        if (disabled) {
            return
        }

        searchRef.current?.focus()
    }

    const handleSelectOption = (model: BaseModel) : MouseEventHandler<HTMLDivElement> => {
        return (event) => {
            if (disabled) {
                return
            }

            if (!multiple) {
                event.stopPropagation()
            }

            triggerEffectRef.current = true
            if (multiple) {
                setSelectedItems((prevState) => {
                    return [...prevState, model]
                })
            } else {
                setSelectedItems([model])
            }
        }
    }

    const handleRemoveSelection = (model : BaseModel) : MouseEventHandler<HTMLSpanElement> => {
        return (event) => {
            if (disabled) {
                return
            }

            if (!multiple) {
                return
            }

            triggerEffectRef.current = true
            setSelectedItems((prevState) => {
                const modifiedSelection = [...prevState]
                const index = modifiedSelection.findIndex((item) => item.id == model.id)
                if (index != -1) {
                    modifiedSelection.splice(index, 1)
                }
    
    
                return modifiedSelection
            })
        }
    }

    const handleClear = () => {
        triggerEffectRef.current = true
        setSelectedItems([])
        handleResetSearch()
    }

    useLayoutEffect(() => {
        if (!multiple) {
            return
        }

        if (!resizerRef.current || !searchRef.current) {
            return
        }

        resizerRef.current.textContent = search || ''
        let width = `${Math.max(resizerRef.current.offsetWidth, 8)}px`
        if (!selectedItems.length) {
            width = ''   
        }
        searchRef.current.style.width = width

    }, [search, selectedItems, multiple])

    useEffect(() => {
        if (!value && !selectedItems.length) {
            return
        }

        if (!value) {
            triggerEffectRef.current = false
            setSelectedItems([])
            return
        }

        if (value == selectedItems) {
            return
        }

        if (Array.isArray(value)) {
            if (!value.length) {
                triggerEffectRef.current = false
                setSelectedItems([])
                
                return
            }

            if (typeof value[0] == 'number') {
                if (!data.length) {
                    return
                }

                const items = data.filter((item) => (value as number[]).includes(item.id))
                setSelectedItems(items)
                triggerEffectRef.current = false

                return
            }

            setSelectedItems(value as BaseModel[])

            return
        }

        if (typeof value == 'number') {
            if (!data.length) {
                return
            }

            const item = data.find((item) => item.id == value)
            setSelectedItems(item ? [item] : [])
            triggerEffectRef.current = false

            return
        }

        if (typeof value == 'string') {
            const parsed = parseInt(value)
            if (Number.isNaN(parsed)) {
                return
            }

            if (!data.length) {
                return
            }

            const item = data?.find((item) => item.id == value)
            setSelectedItems(item ? [item] : [])
            triggerEffectRef.current = false

            return
        }

        if (value.id) {
            setSelectedItems([value])
            triggerEffectRef.current = false
        }
    }, [value, data])

    useEffect(() => {
        if (typeof onChange != 'function' || !triggerEffectRef.current) {
            return
        }

        changeTimeoutRef.current = setTimeout(() => {
            let value;
            if (multiple) {
                if (returnsObject) {
                    value = selectedItems
                } else {
                    value = selectedItems.map(item => item.id)
                }
            } else {
                if (returnsObject) {
                    value = selectedItems[0] || ''
                } else {
                    value = selectedItems[0]?.id || ''
                }
            }
    
            onChange({name, value})
        }, 300)

        return () => { clearTimeout(changeTimeoutRef.current) }
    }, [selectedItems])

    useEffect(() => {
        if (!error || !searchRef.current) {
            return
        }

        searchRef.current.focus()

        const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(searchRef.current, {
            title: error,
            placement: 'top',
            trigger: 'manual',
            customClass: 'error-tooltip',
        })

        tooltip.show()

        return () => {
            tooltip.dispose()
        }
    }, [error])

    useEffect(() => {
        return () => {
            clearTimeout(changeTimeoutRef.current)
            clearTimeout(blurTimeoutRef.current)
            clearTimeout(searchTimeoutRef.current)
        }
    }, [])

    return (
        <div className={wrapperClassName}>
            { label ? (
                <label
                    htmlFor={`search-${id}`}
                    className="form-label"
                >
                    { label }
                    {' '}
                    { required ? <span className="text-danger">*</span> : <></> }
                </label>
            ) : (<></>)}
            <div 
                className={`${
                    "custom-select searchable-select"
                } ${ 
                    focused ? 'focus' : ''
                } ${
                    disabled ? 'disabled' : ''
                }`}
                onClick={handleClickContainer}
            >
                <div className="select-container gap-1">
                    { !hideSelected ? selectedItems.map((location) => (
                        <div 
                            key={`selected-${location.id}`}
                            className={`selected-value ${
                                multiple ? (
                                    'multiple'
                                ) : (
                                    'single' + (searchVal.length ? ' searching' : '')
                                )
                            }`}
                        >
                            <span>
                                { location[itemLabelKey] }
                            </span>
                            { multiple ? (
                                <span 
                                    className="cursor-pointer"
                                    onClick={handleRemoveSelection(location)}
                                >
                                    <X size="1em"/>
                                </span>
                            ) : (<></>) }
                        </div>
                    )) : (<></>) }
                    <input 
                        ref={searchRef}
                        onChange={handleChangeSearch}
                        value={searchVal}
                        id={`search-${id}`}
                        onFocus={handleFocusSearch}
                        onBlur={handleBlurSearch}
                        placeholder={searchPlaceholder}
                        className={`${selectedItems.length && !hideSelected ? 'has-value' : ''}`}
                        onKeyDown={handleKeydownSearch}
                        disabled={disabled}
                        required={required && !selectedItems.length}
                    />
                </div>
                <div className="select-control">
                    { selectedItems.length && !disabled ? (
                        <div className="control-item" onClick={handleClear}>
                            <X size="1.2rem"/>
                        </div>
                    ) : (<></>) }
                    <div className="control-item">
                        { focused ? (
                            <ArrowUp2 size="1.2rem"/>
                        ) : (
                            <ArrowDown2 size="1.2rem"/>
                        ) }
                    </div>
                </div>
                <div className="select-dropdown py-2 rounded bg-white shadow-sm">
                    { loading ? (
                        <div className="select-item text-grey-700">
                            Loading ...
                        </div>
                    ) : !data?.length ? (
                        <div className="select-item text-danger">
                            { notFoundMessage }
                        </div>
                    ) : !filtered.length ? (
                        <div className="select-item text-grey-700">
                            { emptyMessage }
                        </div>
                    ) : filtered.map((item) => (
                        <div 
                            key={item.id}
                            className="select-item gap-2"
                            onClick={handleSelectOption(item)}
                        >
                            { typeof render == 'function' ? (
                                render(item)
                            ) : (
                                <div className="flex-grow-1">
                                    <p className="fw-semibold mb-1">
                                        { item[itemLabelKey] }
                                    </p>
                                </div>
                            ) }
                        </div>
                    )) }
                </div>
                <div className="input-resizer" ref={resizerRef}/>
            </div>
            { hint ? (
                <div className="form-text text-grey-700">
                    { hint }
                </div>
            ) : <></> }
        </div>
    )
}