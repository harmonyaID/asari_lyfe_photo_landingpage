'use client'

import { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { RatingInputProps } from "./props"
import { Star } from "@/components/icons"

export const RatingInput : FC<RatingInputProps> = ({
    className = '',
    wrapperClassName = '',
    name,
    label = '',
    value = 0,
    onChange,
    required,
    error,
}) => {
    const size = '4rem'
    const centerRef = useRef<SVGSVGElement>(null)
    let unhoverTimeout = useRef<ReturnType<typeof setTimeout>|null>(null)

    const [hoveredValue, setHoveredValue] = useState(0)

    const handleClick = useCallback((number: number) => {
        if (typeof onChange == 'function') {
            onChange({ name: name, value: number })
        }
    }, [onChange, name])

    const handleEnter = (number: number) => {
        if (unhoverTimeout.current) {
            clearTimeout(unhoverTimeout.current)
        }

        setHoveredValue(number)
    }

    const handleLeave = () => {
        unhoverTimeout.current = setTimeout(() => {
            setHoveredValue(0)
        }, 100)
    }

    useEffect(() => {
        if (!error || !centerRef.current) {
            return
        }

        const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(centerRef.current, {
            title: error,
            placement: 'bottom',
            trigger: 'manual',
            customClass: 'error-tooltip',
        })

        tooltip.show()

        return () => {
            tooltip.dispose()
        }
    }, [error])

    return (
        <div
            className={wrapperClassName}
        >
            { label ? (
                <label
                    className={`${
                        "form-label"
                    }`}
                >
                    { label }
                    { required ? <span className="text-danger">*</span> : <></> }
                </label>
            ) : (<></>) }
            <div 
                title={`Rating: ${value} / 5`}
                className={`${
                    "d-flex"
                } ${
                    className
                }`}
            >
                <Star
                    className={`${
                        "flex-grow-0 flex-shrink-0 cursor-pointer"
                    } ${
                        hoveredValue < 1 && value < 1 ? 'text-grey-700' : 'text-primary'
                    }`}
                    width={size}
                    height={size}
                    variant={ 
                        hoveredValue < 1 && value < 1 ? 'empty' :
                        'full'
                    }
                    onClick={() => handleClick(1)}
                    onMouseEnter={() => handleEnter(1)}
                    onMouseLeave={handleLeave}
                />
                <Star
                    className={`${
                        "flex-grow-0 flex-shrink-0 cursor-pointer"
                    } ${
                        hoveredValue < 2 && value < 2 ? 'text-grey-700' : 'text-primary'
                    }`}
                    width={size}
                    height={size}
                    variant={ 
                        hoveredValue < 2 && value < 2 ? 'empty' :
                        'full'
                    }
                    onClick={() => handleClick(2)}
                    onMouseEnter={() => handleEnter(2)}
                    onMouseLeave={handleLeave}
                />
                <Star
                    ref={centerRef}
                    className={`${
                        "flex-grow-0 flex-shrink-0 cursor-pointer"
                    } ${
                        hoveredValue < 3 && value < 3 ? 'text-grey-700' : 'text-primary'
                    }`}
                    width={size}
                    height={size}
                    variant={ 
                        hoveredValue < 3 && value < 3 ? 'empty' :
                        'full'
                    }
                    onClick={() => handleClick(3)}
                    onMouseEnter={() => handleEnter(3)}
                    onMouseLeave={handleLeave}
                />
                <Star
                    className={`${
                        "flex-grow-0 flex-shrink-0 cursor-pointer"
                    } ${
                        hoveredValue < 4 && value < 4 ? 'text-grey-700' : 'text-primary'
                    }`}
                    width={size}
                    height={size}
                    variant={ 
                        hoveredValue < 4 && value < 4 ? 'empty' : 
                        'full'
                    }
                    onClick={() => handleClick(4)}
                    onMouseEnter={() => handleEnter(4)}
                    onMouseLeave={handleLeave}
                />
                <Star
                    className={`${
                        "flex-grow-0 flex-shrink-0 cursor-pointer"
                    } ${
                        hoveredValue < 5 && value < 5 ? 'text-grey-700' : 'text-primary'
                    }`}
                    width={size}
                    height={size}
                    variant={ 
                        hoveredValue < 5 && value < 5 ? 'empty' :
                        'full'
                    }
                    onClick={() => handleClick(5)}
                    onMouseEnter={() => handleEnter(5)}
                    onMouseLeave={handleLeave}
                />
            </div>
        </div>
    )
}