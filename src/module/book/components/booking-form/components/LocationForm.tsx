'use client'

import { FC, FormEventHandler, useContext, useState } from "react";
import { LocationSelect } from "@/location/components/location-select";
import { DatePicker, Input } from "@/components/inputs";
import { useFindScheduleSetting } from "@/setting/hooks";
import { DAY_OFFS } from "@/setting/constants";
import { ScheduleSelect } from "../../schedule-select";
import { Button } from "@/components/buttons";
import { BookingFormContext, BookingFormContextType } from "../contexts/BookingFormContext";
import { ChevronLeft } from "react-feather";

export const LocationForm : FC = () => {
    const { 
        formData, handleChange, 
        errors, setErrors, 
        location,
        setPhase,
        reset,
    } = useContext(BookingFormContext) as BookingFormContextType

    const { data: scheduleSetting } = useFindScheduleSetting(DAY_OFFS, formData.locationId || 0)


    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const newErrors = { ...errors }

        if (!formData.locationId && !location) {
            newErrors.locationId = 'Please choose location'
        } else if ('locationId' in newErrors) {
            delete newErrors.locationId
        }

        if (!formData.date) {
            newErrors.date = 'Please choose session date'
        } else if ('date' in newErrors) {
            delete newErrors.date
        }

        if (!formData.scheduleId) {
            newErrors.scheduleId = 'Please choose session time'
        } else if ('scheduleId' in newErrors) {
            delete newErrors.scheduleId
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length) {
            return
        }
        
        setPhase('personal data')
    }

    const handleBack = () => {
        setPhase('status')
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen-60"
        >
            <div className="d-grid grid-cols-2 gap-3">
                <div className="grid-span-2 pb-1">
                    <Button
                        type="button"
                        outline
                        className="d-inline-flex gap-1 align-items-center justify-content-center"
                        onClick={handleBack}
                    >
                        <ChevronLeft/>
                        <span>Back</span>
                    </Button>
                </div>
                <div className="grid-span-2">
                    { !location ? (
                        <LocationSelect
                            required
                            value={formData.locationId || 0}
                            onChange={handleChange}
                        />
                    ) : (
                        <Input
                            name="location"
                            label="Location"
                            readOnly
                            value={location?.name || ''}
                            className="border-white"
                        />
                    ) }
                </div>
                <div>
                    <Input
                        name="roomNumber"
                        error={ errors.roomNumber || '' }
                        value={formData.roomNumber || ''}
                        onChange={handleChange}
                        label="Room"
                        placeholder="e.g HI-203"
                    />
                </div>
                <div>
                    <Input
                        name="paxQty"
                        error={ errors.paxQty || '' }
                        value={formData.paxQty || ''}
                        onChange={handleChange}
                        label="PAX"
                        placeholder="e.g 1"
                        type="number"
                    />
                </div>
                <div className="grid-span-2 grid-span-md-1">
                    <DatePicker
                        name="date"
                        error={ errors.date || '' }
                        value={formData.date || ''}
                        onChange={handleChange}
                        label="Choose Session Date"
                        placeholder="e.g. 30 September 2024"
                        required
                        datesDisabled={scheduleSetting?.result?.value || []}
                    />
                </div>
                <div className="grid-span-2 grid-span-md-1">
                    <DatePicker
                        name="checkoutDate"
                        error={ errors.checkoutDate || '' }
                        value={formData.checkoutDate || ''}
                        onChange={handleChange}
                        label="Checkout Date"
                        placeholder="e.g. 2 October 2024"
                    />
                </div>
                <div className="grid-span-2">
                    <ScheduleSelect
                        error={ errors.scheduleId || '' }
                        required
                        value={formData.scheduleId}
                        onChange={handleChange}
                        date={formData.date}
                        locationId={formData.locationId}
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