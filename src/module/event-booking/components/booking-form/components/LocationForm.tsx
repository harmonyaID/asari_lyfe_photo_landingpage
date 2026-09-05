'use client'

import { FC, FormEventHandler, useContext, useState } from "react";
import { LocationSelect } from "@/location/components/location-select";
import { DatePicker, Input, Timepicker } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { BookingFormContext, BookingFormContextType } from "../contexts/BookingFormContext";
import { Check, ChevronLeft } from "react-feather";
import { Card } from "@/components/cards/card";
import { formatCurrency } from "@/helpers/formatter/functions";
import { TimezoneSelect } from "@/module/misc/components/timezone-select";

export const LocationForm : FC = () => {
    const { 
        formData, handleChange, 
        errors, setErrors, 
        eventPackage,
        setPhase,
        reset,
    } = useContext(BookingFormContext) as BookingFormContextType


    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const newErrors = { ...errors }

        if (!formData.location) {
            newErrors.location = 'Please input location'
        } else if ('locationId' in newErrors) {
            delete newErrors.locationId
        }

        if (!formData.date) {
            newErrors.date = 'Please choose session date'
        } else if ('date' in newErrors) {
            delete newErrors.date
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length) {
            return
        }
        
        setPhase('personal data')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen-60"
        >
            <div className="d-grid grid-cols-2 gap-3">
                <Card
                    className="grid-span-2"
                    imgUrl={eventPackage?.thumbnail}
                    leftImg
                >
                    <h5 className="card-title">
                        { eventPackage?.name }
                    </h5>
                    <h6>
                        { formatCurrency(eventPackage?.price || 0, eventPackage?.currency.symbol || eventPackage?.currency.name) }
                    </h6>
                    { eventPackage?.complimentaries?.map((complimentary) => (
                        <div 
                            key={`complimentary-${eventPackage.id}-${complimentary.id}`}
                            className="d-flex gap-1 align-items-center"
                        >
                            <div className="flex-grow-0 flex-shrink-0">
                                <Check
                                    className="text-primary"
                                />
                            </div>
                            <div className="flex-grow-1">
                                { complimentary.name }
                            </div>
                        </div>
                    )) }
                </Card>
                <div>
                    <DatePicker
                        name="date"
                        error={ errors.date || '' }
                        value={formData.date || ''}
                        onChange={handleChange}
                        label="Choose Session Date"
                        placeholder="e.g. 30 September 2024"
                        required
                    />
                </div>
                <div>
                    <Timepicker
                        name="time"
                        label="Start From"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid-span-2">
                    <TimezoneSelect
                        name="timezone"
                        label="Timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid-span-2">
                    <Input
                        name="location"
                        label="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid-span-2 text-danger fst-italic">
                    *required field
                </div>
                <div className="grid-span-2">
                    <div className="d-grid">
                        <Button
                            type="submit"
                            pill
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}